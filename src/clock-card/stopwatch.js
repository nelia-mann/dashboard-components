import { html, LitElement } from 'lit';
import styles from './stopwatch.styles';
import { parseTime } from './utilities.js'

export class StopwatchComponent extends LitElement {

    // internal reactive states
    static get properties() {
        return {
            _stopwatch: { state: true },
            _timeDisplay: { state: true },
            _lapDisplay: { state: true },
            _pressed: { state: true },
        };
    }

    // initialize button pressing here
    constructor() {
        super();
        this.releaseButtons();
    }

    releaseButtons() {
        const newPressed = {
            startStop: "off",
            lap: "off",
            reset: "off"
        };
        this._pressed = newPressed;
    }

    // get state of stopwatch ("active", "paused", "idle")
    getState() {
        return this._stopwatch.state;
    }

    getStartTime() {
        return this._stopwatch.attributes.start_time;
    }

    getLoggedTime() {
        return this._stopwatch.attributes.logged_time;
    }

    getLaps() {
        return this._stopwatch.attributes.laps;
    }

    press(str) {
        this._pressed[str] = "on";
    }

    pressed(str) {
        return this._pressed[str];
    }

    getTimeDisplay() {
        return this._timeDisplay;
    }

    getLapDisplay() {
        return this._lapDisplay;
    }

    setTimeDisplay(display) {
        this._timeDisplay = display;
    }

    setLapDisplay(display) {
        this._lapDisplay = display;
    }

    // get css
    static styles = styles;

    // return html
    render() {
        this.doUpdateClock();
        this.doLapDisplay();
        return html`
            <div class="stopwatch">
                <div class="stopwatch-display"> ${this.getTimeDisplay()} </div>
                <div class="lap-column">
                    ${this.getLapDisplay()}
                </div>
                <div class="button-column">
                    <button
                        class="button ${this.pressed("startStop")}"
                        id="start-stop"
                        @click="${this.onClick}"
                    >
                        ${this.getStartStop()}
                    </button>
                    <button
                        class="button ${this.canLap()} ${this.pressed("lap")}"
                        id="lap"
                        @click="${this.onClick}"
                    >
                        Lap
                    </button>
                    <button
                        class="button ${this.canReset()} ${this.pressed("reset")}"
                        id="reset"
                        @click="${this.onClick}"
                    >
                        Reset
                    </button>
                </div>
            </div>
        `
    }



    // makes text for start/stop button
    getStartStop() {
        let startStop = "Start";
        if (this.getState() === "active") {
            startStop = "Stop";
        }
        return startStop;
    }

    // update running clock every second (when stopwatch is active)
    doUpdateClock() {
        this.doTimeDisplay();
        if (this.getState() === "active") {
            setInterval(() => this.doTimeDisplay(), 1000)
        }
    }

    // gets the stopwatch time (in milliseconds)
    getTime() {
        let result;
        switch (this.getState()) {
            case "active":
                const start_time = this.getStartTime();
                const instant = new Date().valueOf();
                const previous = this.getLoggedTime();
                result = instant - start_time + previous;
                break;
            case "paused":
                const logged_time = this.getLoggedTime();
                result = logged_time;
                break;
            default:
                result = 0;
        }
        return result;
    }

    // converts the stopwatch time to the right format, and sets _timeDisplay
    doTimeDisplay() {
        const result = this.getTime();
        this.setTimeDisplay(parseTime(result));
    }

    // uses dictionary of lap times to build display column
    doLapDisplay() {
        let laps = this.getLaps();
        laps = Object.keys(laps).map((key) => (laps[key]))
        const newDisplay = laps.map((value, index) => {
            return html`
                <div class="lap">
                    <h1> Lap ${index + 1}: </h1>
                    <p class="time"> ${parseTime(value)} </p>
                </div>
            `
        })
        this.setLapDisplay(newDisplay);
    }

    // handles the clicking of the buttons
    onClick(e) {
        switch (e.target.id) {
            case "start-stop":
                this.doStartStop();
                break;
            case "lap":
                if (this.canLap()) {
                    this.doLap();
                }
                break;
            case "reset":
                if (this.canReset()) {
                    this.doReset();
                }
        }
        this.doReleaseButtons();
    }

    // sends reset information to hass and presses button
    doReset() {
        const data = {
            state: "idle",
            start_time: null,
            logged_time: 0.0,
            laps: {},
        };
        this.sendCommand(data);
        this.press("reset");
    }

    // sends pause information to hass
    doStop() {
        const data = {
            state: "paused",
            start_time: null,
            logged_time: this.getTime(),
        }
        this.sendCommand(data);
    }

    // sends start information to hass
    doStart() {
        console.log("ping");
        const data = {
            state: "active",
            start_time: new Date().valueOf(),
        }
        this.sendCommand(data);
    }

    // selects start/stop information to send, presses button
    doStartStop() {
        if (this.getState() === "active") {
            this.doStop()
        } else if ((this.getState() === "paused") || (this.getState() === "idle")) {
            this.doStart()
        }
        this.press("startStop");
    }

    // waits half a second then releases all buttons
    doReleaseButtons() {
        setTimeout(() => this.releaseButtons(), 100)
    }

    // sends lap information to hass and presses button
    doLap() {
        let newLaps = this._stopwatch.attributes.laps;
        let count = Object.keys(newLaps).length;
        newLaps[count + 1] = this.getTime();
        const data = {
            laps: newLaps
        }
        this.sendCommand(data);
        this.press("lap");
    }

    // determines if it makes sense to press lap
    canLap() {
        const laps = this._stopwatch.attributes.laps;
        const count = Object.keys(laps).length;
        return (count < 4) && (this.getState() === "active")
    }

    // determines if it makes sense to press reset
    canReset() {
        const state = this.getState();
        return ((state === "active") || (state === "paused"))
    }

    // general function to send information to hass
    sendCommand(data) {
        const fullData = data;
        fullData.entity_id = this._stopwatch.entity_id;
        this.callService("python_script", "set_state", fullData)
    }

}

customElements.define( "stopwatch-component", StopwatchComponent )