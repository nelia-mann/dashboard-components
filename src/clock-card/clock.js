import { html, LitElement } from 'lit';
import styles from './clock.styles';

export class ClockComponent extends LitElement {

    static get properties() {
        return {
            _timezone: { state: true },
            _timeDisplay: { state: true }
        }
    }

    constructor() {
        super();
        this._timezone = "home";
        this.doGetTime();
    }

    static styles = styles;

    render() {
        this.doUpdateClock();
        return html`
            <div class="clock">
                <div class="clock-display"> ${this._timeDisplay}</div>
                <div class="button-column">
                    <button
                        class="button ${this.isHome()}"
                        id="home"
                        @click=${this.onClick}
                    >
                        Home
                    </button>
                    <button
                        class="button ${this.isBoulder()}"
                        id="boulder"
                        @click=${this.onClick}
                    >
                        Boulder
                    </button>
                    <button
                        class="button ${this.isArizona()}"
                        id="arizona"
                        @click=${this.onClick}
                    >
                        Arizona
                    </button>
                </div>
            </div>
        `
    }

    onClick(e) {
        switch (e.target.id) {
            case "home":
                this._timezone = "home";
                break;
            case "boulder":
                this._timezone = "boulder";
                break;
            case "arizona":
                this._timezone = "arizona";
                break;
        }
        this.doGetTime();
    }

    isHome() {
        return this._timezone === "home";
    }
    isBoulder() {
        return this._timezone === "boulder";
    }
    isArizona() {
        return this._timezone === "arizona";
    }

    doUpdateClock() {
        setInterval(() => this.doGetTime(), 1000);
    }

    doGetTime() {
        const current = new Date();
        let output;
        switch (this._timezone) {
            case "home":
                output = current.toLocaleString('en-US', { timeZone: 'America/New_York' });
                break;
            case "boulder":
                output = current.toLocaleString('en-US', { timeZone: 'America/Denver' });
                break;
            case "arizona":
                output = current.toLocaleString('en-US', { timeZone: 'America/Phoenix' });
                break;
        }
        output = output.split(',')[1];
        this._timeDisplay = output;
    }

}

customElements.define( "clock-component", ClockComponent )