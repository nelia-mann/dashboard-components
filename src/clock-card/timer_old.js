import { html, LitElement } from 'lit';
import styles from './timer.styles';

// general functions that don't really "belong" to the class and don't reference
// a particular instance of it
const pad = (value) => {
    let string = String(value);
    if (string.length == 1) {
        string = "0" + string;
    }
    return string;
}

const parseTime = (milliseconds) => {
    let remainder = Math.floor(milliseconds / 1000);
    let hours = Math.floor(remainder / (60 * 60));
    remainder = remainder - hours * (60 * 60);
    const minutes = Math.floor(remainder / 60);
    remainder = remainder - minutes * 60;
    hours = hours % 24;
    const output = pad(hours) + ":" + pad(minutes) + ":" + pad(remainder);
    return output;
}

const reverseParse = (string) => {
    const array = string.split(":");
    const hours = Number(array[0]);
    const minutes = Number(array[1]);
    const seconds = Number(array[2]);
    return (hours * 36000) + (minutes * 60) + (seconds);
}

const parseTimeButton = (str) => {
        const sign = str[0];
        const units = str[str.length - 1];
        let value = Number(str.slice(1, -1));
        if (units === "m") {
            value = value * 60;
        }
        if (sign === "-") {
            value = value * -1
        }
        return value;
    }

export class TimerComponent extends LitElement {

    // the lists of time changes available
    _addTimes = ["+30s", "+1m", "+5m", "+30m"];
    _subTimes = ["-30s", "-1m", "-5m", "-30m"];

    /*
        the reactive properties.
        "_timers" is inherited from the main clock, which obtains it from hass.
        These are the entities being manipulated.
        "_timerIndex" keeps track of which of these timers is currently selected
        "_timerDisplays" keeps track of the numbers showing on the clock displays
        "_timeSet" is the value (in seconds) for a new timer setting.
        "_pressed" is on/off depending on whether a button has just been pressed
    */
    static get properties() {
        return {
            _timers: { state: true },
            _timerIndex: { state: true },
            _timerDisplays: { state: true },
            _timeSet: { state: true },
            _pressed: { state: true }
        }
    }

    // We initialize the timerIndex to be the first timer, and the timeSet to be zero.
    constructor() {
        super();
        this.setIndex(0);
        this.setTimeSet(0);
        this.releaseButtons();
    }

    // pull the css from a separate file
    static styles = styles;

    // the list of indices associated with timers
    indices() {
        return Object.keys(this._timers).map((key) => Number(key));
    }

    // getters and setters for main locally defined properties
    getIndex() {
        return this._timerIndex;
    }

    setIndex(index) {
        this._timerIndex = index;
    }

    isTimer(index) {
        return this.getIndex() === index;
    }

    getTimeSet() {
        return this._timeSet;
    }

    setTimeSet(time) {
        this._timeSet = time;
    }

    getTimerDisplay(index) {
        return this._timerDisplays[index];
    }

    setTimerDisplays(newTimerDisplays) {
        this._timerDisplays = newTimerDisplays;
    }

    // getters that refer to a timer's internal information
    getState(index) {
        return this._timers[index].state;
    }

    getId(index) {
        return this._timers[index].entity_id;
    }

    getAttributes(index) {
        return this._timers[index].attributes;
    }

    getFinishesAt(index) {
        return this.getAttributes(index).finishes_at;
    }

    getRemaining(index) {
        return this.getAttributes(index).remaining;
    }

    // getters that return information about the currently selected timer
    getThisState() {
        return this.getState(this.getIndex());
    }

    getThisId() {
        return this.getId(this.getIndex());
    }

    getThisTimerDisplay() {
        return this.getTimerDisplay(this.getIndex());
    }

    getThisFinishesAt() {
        return this.getFinishesAt(this.getIndex());
    }

    getThisRemaining() {
        return this.getRemaining(this.getIndex());
    }


    // render function for generating display (note that doUpdateClocks() triggers
    // at regular intervals so the clocks tick forward)
    render() {
        this.doUpdateClocks();
        return html`
            <div class="timer">
                <div class="main-column">
                    <div class="button-row"> ${this.addButtons()} </div>
                    <div class="timer-display"> ${this.getThisTimerDisplay()} </div>
                    <div class="button-row"> ${this.subButtons()} </div>
                </div>
                <div class="control-column">
                    <button class="control-button ${this._pressed.startStop}"
                        id="start/stop"
                        @click="${this.onStartStop}"
                    >
                        ${this.startStopDisplay()}
                    </button>
                    <button class="control-button ${this.canReset()} ${this._pressed.reset}"
                        id="reset"
                        @click="${this.onReset}"
                    >
                        reset
                    </button>
                </div>
                <div class="timer-column"> ${this.timerButtons()} </div>
            </div>
        `;
    }

    // elements for display
    startStopDisplay() {
        const state = this.getThisState();
        let display = "start";
        if (state === "active") {
            display = "stop";
        }
        return display;
    }

    changeButton(str) {
        return html`
            <button class="time-button" id=${str} @click="${this.onChange}">
                ${str}
            </button>`
    }

    addButtons() {
        return this._addTimes.map((str) => this.changeButton(str));
    }

    subButtons() {
        return this._subTimes.map((str) => this.changeButton(str));
    }

    timerButton(index) {
        return html`
            <button class="timer-button ${this.isTimer(index)}" id="${index}" @click="${this.onClick}">
                <h1> Timer ${index + 1} </h1>
                <p class="time"> ${this.smallTime(index)} </p>
            </button>
        `
    }

    timerButtons() {
        return this.indices().map((i) => this.timerButton(i))
    }

    canReset() {
        const state = this.getThisState();
        return ((state === "active") || (state === "paused") || (this.getTimeSet() != 0));
    }

    releaseButtons() {
        console.log("releasing buttons")
        const nonePressed = {
            startStop: "off",
            reset: "off"
        };
        this._pressed = nonePressed;
    }

    doReleaseButtons() {
        setTimeout(() => this.releaseButtons(), 100);
    }

    // sets up times for display (based on timer states)
    timeDisplay(index) {
        let result;
        switch (this.getState(index)) {
            case "active":
                const end = this.getFinishesAt(index);
                const end_ms = new Date(end).valueOf();
                const instant_ms = new Date().valueOf();
                result = parseTime(end_ms - instant_ms);
                break;
            case "paused":
                result = this.getRemaining(index);
                const array = result.split(":");
                if (array[0].length === 1) {
                    result = "0" + result;
                }
                break;
            default:
                result = parseTime(this.getTimeSet() * 1000);
        }
        return result
    }

    smallTime(index) {
        const state = this.getState(index);
        let result = "";
        if ((state === "active") || (state === "paused")) {
            result = this.getTimerDisplay(index);
        }
        return result;
    }

    doTimeDisplays() {
        const newTimerDisplays = this.indices().map((i) => this.timeDisplay(i));
        this.setTimerDisplays(newTimerDisplays);
    }

    doUpdateClocks() {
        const states = this.indices().map((i) => this.getState(i));
        this.doTimeDisplays();
        if (states.includes("active")) {
            setInterval(() => this.doTimeDisplays(), 1000)
        }
    }

    // selection of timer
    onClick(e) {
        this.setIndex(Number(e.currentTarget.id));
    }

    // adding and subtracting time
    onChange(e) {
        const str = e.target.id;
        const time = parseTimeButton(str);
        const state = this.getThisState();
        switch (state) {
            case "idle":
                this.addTimeIdle(time);
                break;
            case "paused":
                this.addTimePaused(time);
                break;
            case "active":
                this.addTimeActive(time);
                break;
        }
    }

    addTimeIdle(time) {
        let newTime = this.getTimeSet() + time;
        (newTime < 0) && (newTime = 0);
        this.setTimeSet(newTime);
    }

    addTimeActive(time) {
        const end = this.getThisFinishesAt();
        const end_ms = new Date(end).valueOf();
        const instant_ms = new Date().valueOf();
        let duration = Math.floor((end_ms - instant_ms) / 1000) + time;
        this.modifyTimer(duration);
    }

    addTimePaused(time) {
        const remaining = this.getThisRemaining();
        const duration = reverseParse(remaining) + time;
        this.modifyTimer(duration);
        this.callService("timer", "pause", {entity_id: this.getThisId()});
    }

    modifyTimer(duration) {
        const entityId = this.getThisId();
        let data = { entity_id: entityId };
        if (duration <= 0) {
            this.callService("timer", "cancel", data);
        } else {
            data.duration = duration;
            this.callService("timer", "start", data);
        }
    }

    // control buttons
    onReset() {
        if (this.canReset()) {
            const entityId = this.getThisId();
            const data = { entity_id: entityId };
            this.callService("timer", "cancel", data);
            this.setTimeSet(0);
        }
        this._pressed.reset = "on";
        this.doReleaseButtons();
    }

    onStartStop() {
        const state = this.getThisState();
        const entityId = this.getThisId();
        const data = { entity_id: entityId };
        switch (state) {
            case "paused":
                this.callService("timer", "start", data);
                break;
            case "active":
                this.callService("timer", "pause", data);
                break;
            default:
                data.duration = this.getTimeSet();
                this.callService("timer", "start", data);
                this.setTimeSet(0);
        }
        this._pressed.startStop = "on";
        this.doReleaseButtons();
    }
}

customElements.define( "timer-component", TimerComponent )