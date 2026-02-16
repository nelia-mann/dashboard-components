import { html, LitElement } from 'lit';
import styles from './timer.styles';
import { parseTime, reverseParse, parseTimeButton } from './utilities.js';

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
            _timer: { state: true },
            _timerDisplay: { state: true },
            _timeSet: { state: true },
            _pressed: { state: true }
        }
    }

    // We initialize the timerIndex to be the first timer, and the timeSet to be zero.
    constructor() {
        super();
        this.setTimeSet(0);
        this.releaseButtons();
    }



    getTimeSet() {
        return this._timeSet;
    }

    setTimeSet(time) {
        this._timeSet = time;
    }

    getTimerDisplay() {
        return this._timerDisplay;
    }

    setTimerDisplay(newTimerDisplay) {
        this._timerDisplay = newTimerDisplay;
    }

    // getters that refer to the timer's internal information
    getState() {
        return this._timer.state;
    }

    getId() {
        return this._timer.entity_id;
    }

    getAttributes() {
        return this._timer.attributes;
    }

    getFinishesAt() {
        return this.getAttributes().finishes_at;
    }

    getRemaining() {
        return this.getAttributes().remaining;
    }

    // pull the css from a separate file
    static styles = styles;

    // render function for generating display (note that doUpdateClocks() triggers
    // at regular intervals so the clocks tick forward)
    render() {
        this.doUpdateClock();
        return html`
            <div class="timer">
                <div class="main-column">
                    <div class="button-row"> ${this.addButtons()} </div>
                    <div class="timer-display"> ${this.getTimerDisplay()} </div>
                    <div class="button-row"> ${this.subButtons()} </div>
                </div>
                <div class="control-column">
                    <button class="control-button ${this.canPress()} ${this.pressed("startStop")}"
                        id="start/stop"
                        @click="${this.onStartStop}"
                    >
                        ${this.startStopDisplay()}
                    </button>
                    <button class="control-button ${this.canPress()} ${this.pressed("reset")}"
                        id="reset"
                        @click="${this.onReset}"
                    >
                        reset
                    </button>
                </div>
            </div>
        `;
    }

    // elements for display
    startStopDisplay() {
        const state = this.getState();
        let display = "start";
        if (state === "active") {
            display = "stop";
        }
        return display;
    }

    changeButton(str) {
        return html`
            <button class="time-button ${this.pressed(str)}" id=${str} @click="${this.onChange}">
                ${str}
            </button>`
    }

    addButtons() {
        return this._addTimes.map((str) => this.changeButton(str));
    }

    subButtons() {
        return this._subTimes.map((str) => this.changeButton(str));
    }

    canPress() {
        const state = this.getState();
        return ((state === "active") || (state === "paused") || (this.getTimeSet() != 0));
    }

    releaseButtons() {
        let nonePressed = {
            startStop: "off",
            reset: "off"
        };
        this._addTimes.forEach((str) => { nonePressed[str] = "off" })
        this._subTimes.forEach((str) => { nonePressed[str] = "off" })
        this._pressed = nonePressed;
    }

    pressed(str) {
        return this._pressed[str];
    }

    press(str) {
        this._pressed[str] = "on";
    }

    doReleaseButtons() {
        setTimeout(() => this.releaseButtons(), 100);
    }

    // sets up times for display (based on timer states)
    doTimeDisplay() {
        let result;
        switch (this.getState()) {
            case "active":
                const end = this.getFinishesAt();
                const end_ms = new Date(end).valueOf();
                const instant_ms = new Date().valueOf();
                result = parseTime(end_ms - instant_ms);
                break;
            case "paused":
                result = this.getRemaining();
                const array = result.split(":");
                if (array[0].length === 1) {
                    result = "0" + result;
                }
                break;
            default:
                result = parseTime(this.getTimeSet() * 1000);
        };
        this.setTimerDisplay(result);
    }

    doUpdateClock() {
        this.doTimeDisplay();
        if (this.getState() === "active") {
            setInterval(() => this.doTimeDisplay(), 1000)
        }
    }

    // adding and subtracting time
    onChange(e) {
        const str = e.target.id;
        const time = parseTimeButton(str);
        const state = this.getState();
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
        this.press(str);
        this.doReleaseButtons();
    }

    addTimeIdle(time) {
        let newTime = this.getTimeSet() + time;
        (newTime < 0) && (newTime = 0);
        this.setTimeSet(newTime);
    }

    addTimeActive(time) {
        const end = this.getFinishesAt();
        const end_ms = new Date(end).valueOf();
        const instant_ms = new Date().valueOf();
        let duration = Math.floor((end_ms - instant_ms) / 1000) + time;
        this.modifyTimer(duration);
    }

    addTimePaused(time) {
        const remaining = this.getRemaining();
        const duration = reverseParse(remaining) + time;
        this.modifyTimer(duration);
        this.sendCommand("pause", {});
    }

    modifyTimer(duration) {
        if (duration <= 0) {
            this.sendCommand("cancel", {})
        } else {
            this.sendCommand("start", { duration: duration })
        }
    }

    // control buttons
    onReset() {
        if (this.canPress()) {
            this.sendCommand("cancel", {});
            this.setTimeSet(0);
        }
        this.press("reset");
        this.doReleaseButtons();
    }

    onStartStop() {
        if (this.canPress()) {
            switch (this.getState()) {
                case "paused":
                    this.sendCommand("start", {});
                    break;
                case "active":
                    this.sendCommand("pause", {});
                    break;
                default:
                    this.sendCommand("start", { duration: this.getTimeSet() });
                    this.setTimeSet(0);
            }
            this.press("startStop");
            this.doReleaseButtons();
        }
    }

    sendCommand(type, data) {
        const entityId = this.getId();
        let fullData = data;
        fullData.entity_id = entityId;
        this.callService("timer", type, fullData);
    }
}

customElements.define( "timer-component", TimerComponent )