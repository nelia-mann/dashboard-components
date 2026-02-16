import { html, LitElement } from 'lit';
import styles from './main.styles.js';
import "./clock.js";
import "./timers.js";
import "./stopwatch.js";

export class ClockCard extends LitElement {

    // private properties:
    _hass;
    _stopwatchId;
    _timerIds = {};

    // internal reactive states
    static get properties() {
        return {
            _clocktype: { state: true },
            _stopwatch: { state: true },
            _timers: { state: true}
        };
    }

    // initializes clocktype in constructor
    constructor() {
        super();
        this._clocktype = "clock";
    }

    // establish config information for card
    setConfig() {
        this._stopwatchId = "input_select.stopwatch";
        this._timerIds[0] = "timer.timer_1";
        this._timerIds[1] = "timer.timer_2";
        this._timerIds[2] = "timer.timer_3";
    }

    set hass(hass) {
        this._hass = hass;
        if (this._hass) {
            this._stopwatch = this._hass.states[this._stopwatchId];
            this._timers = Object.keys(this._timerIds).map((key) => {
                const id = this._timerIds[key];
                return this._hass.states[id];
            })
        }
    }

    // pull styles
    static styles = styles;

    // return html
    render() {
        return html`
            <ha-card>
                ${this.content()}
                <div class="button-row">
                    <button
                        class="button clock ${this.isClock()}"
                        id="clock"
                        @click="${this.onClick}"
                    >
                        Clock
                    </button>
                    <button
                        class="button timer ${this.isTimer()}"
                        id="timer"
                        @click="${this.onClick}"
                    >
                        Timer
                    </button>
                    <button
                        class="button stopwatch ${this.isStopwatch()}"
                        id="stopwatch"
                        @click="${this.onClick}"
                    >
                        Stopwatch
                    </button>
                </div>
            </ha-card>
        `;
    }

    // deals with click
    onClick(e) {
        switch (e.target.id) {
            case "clock":
                this._clocktype = "clock";
                break;
            case "timer":
                this._clocktype = "timer";
                break;
            case "stopwatch":
                this.resetStopwatch();
                this._clocktype = "stopwatch";
        }
    }

    resetStopwatch() {
        const state = this._stopwatch;
        if (!state.attributes.laps) {
            const data = {
                entity_id: state.entity_id,
                state: "idle",
                start_time: null,
                logged_time: 0.0,
                laps: {},
            }
            this._hass.callService("python_script", "set_state", data);
        }
    }

    content() {
        let result;
        switch (this._clocktype) {
            case "clock":
                result = html`<clock-component></clock-component>`;
                break;
            case "timer":
                result = html`<timers-component
                    .callService=${this._hass.callService}
                    ._timers = ${this._timers}
                ></timers-component>`
                break;
            case "stopwatch":
                result = html`<stopwatch-component
                    .callService=${this._hass.callService}
                    ._stopwatch=${this._stopwatch}
                ></stopwatch-component>`
                break;
        }
        return result;
    }

    // helpers for using clocktype mode
    isClock() {
        return this._clocktype === "clock";
    }
    isTimer() {
        return this._clocktype === "timer";
    }
    isStopwatch() {
        return this._clocktype === "stopwatch";
    }

    // set card size parameters for ha
    getCardSize() {
        return 4;
    }

    getGridOptions() {
        return {
            rows: 5,
            columns: 15,
            min_rows: 5,
            max_rows: 5
        }
    }

}