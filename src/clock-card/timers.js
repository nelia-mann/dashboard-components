import { html, LitElement } from 'lit';
import styles from './timers.styles';
import "./timer.js";
import { parseTime } from './utilities.js';

export class TimersComponent extends LitElement {

    static get properties() {
        return {
            _timers: { state: true },
            _timerIndex: { state: true },
            _timerDisplays: { state: true }
        }
    }

    constructor() {
        super();
        this.setTimerIndex(0);
    }

    getIndices() {
        return Object.keys(this._timers).map((key) => Number(key));
    }

    getTimerIndex() {
        return this._timerIndex;
    }

    getTimer() {
        return this._timers[this.getTimerIndex()];
    }

    isIndex(index) {
        return this.getTimerIndex() === index;
    }

    setTimerIndex(index) {
        this._timerIndex = index;
    }

    getState(index) {
        return this._timers[index].state;
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

    getTimerDisplay(index) {
        return this._timerDisplays[index];
    }

    setTimerDisplays(newDisplays) {
        this._timerDisplays = newDisplays;
    }

    getSmallTime(index) {
        const state = this.getState(index);
        let result;
        switch (state) {
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
                result = "";
        }
        return result;
    }

    doTimerDisplays() {
        const newTimes = this.getIndices().map((index) => this.getSmallTime(index));
        this.setTimerDisplays(newTimes);
    }

    doUpdateClocks() {
        this.doTimerDisplays();
        const states = this.getIndices().map((index) => this.getState(index));
        if (states.includes("active")) {
            setInterval(() => this.doTimerDisplays(), 1000);
        }
    }

    onClick(e) {
        this.setTimerIndex(Number(e.currentTarget.id));
    }

    timerButton(index) {
        return html`
            <button class="timer-button ${this.isIndex(index)}" id="${index}" @click="${this.onClick}">
                <h1> Timer ${index + 1} </h1>
                <p class="time"> ${this.getTimerDisplay(index)} </p>
            </button>
        `
    }

    timerButtons() {
        return this.getIndices().map((i) => this.timerButton(i))
    }

    static styles = styles;

    render() {
        this.doUpdateClocks();
        return html`
            <div class="timers">
                <timer-component
                    .callService=${this.callService}
                    ._timer = ${this.getTimer()}
                ></timer-component>
                <div class="timer-column"> ${this.timerButtons()} </div>
            </div>
        `
    }

}

customElements.define("timers-component", TimersComponent);