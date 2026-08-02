import { html, css } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { rgba } from '../util/color-util.js';
import { HaSubComponent } from '../base-classes/ha-subcomponent.js';
import sharedStyles from '../styles/shared-styles.js';

export class SliderBar extends HaSubComponent {

    static properties = {
        ...super.properties,
        state: { state: true },
        colorCode: { state: true},
        _value: { state: true }
    }

    constructor() {
        super();
        this.state = {};
        this.max = 0;
        this.min = 0;
        this.startValue = 0;
        this.units = '';
        this.background = '';
        this.colorCode = [0, 0, 0];
    }

/********************************************** lifecycle *************************************************************/

    getTriggers() {
        return ["_value", "colorCode"];
    }

    setInitialValues() {
        (this.getStateValue()) ? (this.setValue(this.getStateValue())) : (this.setValue(this.getMin()));
    }

/********************************************** getter & setter logic *************************************************/

    getValue() {
        return this._value;
    }

    setValue(value) {
        this._value = value;
    }

    getMin() {
        return this.min;
    }

    getMax() {
        return this.max;
    }

    getStateValue() {
        return this.startValue;
    }

    getState() {
        return this.state;
    }

    addUnits(value) {
        let newValue = Number(value).toFixed(this.getRound());
        newValue = newValue + this.units;
        return newValue;
    }

    getBackground() {
        return this.background;
    }

    getColorCode() {
        return this.colorCode;
    }

    getRound() {
        if (this.step) {
            return -1 * Math.log10(this.step)
        } else return 0
    }

    getStep() {
        if (this.step) return this.step;
        return 1;
    }

    showScale() {
        return !this.skipScale
    }

    isFixed() {
        if (this.fixed) return this.fixed;
        return false;
    }

    getMode() {
        return this.mode;
    }

    getHeight() {
        const heightScale = (this.getValue() - this.getMin()) / (this.getMax() - this.getMin());
        return Math.round(100 * heightScale);
    }

/********************************************** interactive logic *****************************************************/

    async handleOnChange(e) {
        if (!this.isFixed()) {
            const value = e.target.value;
            this.dispatchEvent(new CustomEvent('change', { detail: value }));
            if (this.wait) {
                await this.waitForEntity(this.state.entity_id, (entityId) => this.wait(entityId, value));
            }
            this.lowerChangeFlag();
        }
    }


    handleOnInput(e) {
        if (!this.isFixed()) {
            this.raiseChangeFlag();
            const value = e.target.value;
            this.setValue(value);
            this.dispatchEvent(new CustomEvent('slide', { detail: value }));
        }
    }

/********************************************** html logic ************************************************************/

    scales() {
        if (this.showScale()) {
            return html`
                <div class="values ${this.getMode()}">
                    <div class="top value ${this.getMode()}"> ${this.addUnits(this.getMax())} </div>
                    <div class="bottom value ${this.getMode()}"> ${this.addUnits(this.getMin())} </div>
                </div>
            `
        }
    }

    value() {
        if (this.showScale()) {
            return html`
                <div class="values ${this.getMode()}">
                    <div class="current value ${this.getMode()}" style="${styleMap(this.getStyleLevel())}">
                        ${this.addUnits(this.getValue())}
                    </div>
                </div>
            `
        }
    }

    shownLevel() {
        return html`<div class="shown-level ${this.getMode()}" style="${styleMap(this.getStyleLevel())}"/>`;
    }

    shownInnerSlider() {
        return html`<div
                class="inner-slider shown ${this.getMode()}"
                style="${styleMap(this.getStyleBG())}"
            >
                ${this.shownLevel()}
            </div>`;
    }

    actualSlider() {
        return html`
            <input
                class="inner-slider actual ${this.getMode()}"
                type="range"
                max=${this.getMax()}
                min=${this.getMin()}
                value="${this.getValue()}"
                @input="${this.handleOnInput}"
                @change="${this.handleOnChange}"
                step="${this.getStep()}"
            />`;
    }

    render() {
        if (this.isInitialized()) {
            return html`
                ${(this.getMode() === 'horizontal') ? this.value() : this.scales()}
                <div class="slider outlined ${this.getMode()}">
                    ${this.shownInnerSlider()}
                    ${this.actualSlider()}
                </div>
                ${(this.getMode() === 'horizontal') ? this.scales() : this.value()}
            `
        }
    }

/********************************************** style logic ***********************************************************/    

    getStyleLevel() {
        let styles = {};
        let limit = 'bottom';
        (this.getMode() === 'horizontal') && (limit = 'left');
        styles[limit] = `${this.getHeight()}%`;

        return styles;
    }

    getStyleBG() {
        let styles = {};
        if (this.getBackground()) {
            styles['background'] = this.getBackground();
        } else {
            let height = ` ${this.getHeight()}%`;
            let dark = rgba(this.getColorCode(), 1);
            let pale = rgba(this.getColorCode(), 0.2);
            let stem = 'linear-gradient(to top, ';
            (this.getMode() === 'horizontal') && (stem = 'linear-gradient(to right, ');
            stem = stem + dark + height + ', ' + pale + height + ')';
            styles['background'] = stem;
        }
        return styles;
    }

    static styles = [sharedStyles, css`

        :host {
            width: 100%;
            height: 100%;
            display: flex;
            flex-flow: var(--slider-orientation, row nowrap);
            justify-content: var(--slider-justify-content, center);
            align-items: center;
        }

        .slider {
            position: relative;
            height: calc(100% - 2*var(--slider-margin, 5%));
            width: var(--slider-width, 40px);
            margin-left: var(--slider-text-padding, 5px);
            margin-right: var(--slider-text-padding, 5px);
            padding-top: var(--slider-margin, 5%);
            padding-bottom: var(--slider-margin, 5%);
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            justify-content: center;
        }

        .slider.horizontal {
            width: calc(100% - 2*var(--slider-margin, 5%));
            height: var(--slider-width, 40px);
            margin-top: var(--slider-text-padding, 5px);
            margin-bottom: var(--slider-text-padding, 5px);
            padding-left: var(--slider-margin, 5%);
            padding-right: var(--slider-margin, 5%);
            flex-flow: row nowrap;
        }

        .inner-slider {
            position: absolute;
            top: var(--slider-margin, 5%);
            left: 0;
            width: 100%;
            height: calc(100% - 2*var(--slider-margin, 10%));
        }

        .inner-slider.horizontal {
            left: var(--slider-margin, 5%);
            top: 0;
            height: 100%;
            width: calc(100% - 2*var(--slider-margin, 5%));
        }

        .inner-slider.actual {
            opacity: 0;
            writing-mode: vertical-lr;
            direction: rtl;
        }

        .inner-slider.actual.horizontal {
            writing-mode: horizontal-tb;
            direction: ltr;
        }

        .inner-slider.shown {
            pointer-events: none;
        }

        .shown-level {
            position: absolute;
            left: calc(-1 * var(--slider-level-offset, 10%));
            width: calc(100% + 2 * var(--slider-level-offset, 10%));
            height: var(--slider-level-height, 2%);
            pointer-events: none;
        }

        .shown-level.horizontal {
            bottom: calc(-1 * var(--slider-level-offset, 10%));
            height: calc(100% + 2 * var(--slider-level-offset, 10%));
            width: var(--slider-level-height, 2%);
            pointer-events: none;
        }

        .values {
            position: relative;
            height: calc(100% - 2 * var(--slider-margin, 5%));
            margin-top: calc(var(--slider-text-offset, 5%) + var(--slider-margin, 5%));
            margin-bottom: calc(-1 * var(--slider-text-offset, 5%) + var(--slider-margin, 5%));
            width: var(--slider-text-width, 50px);
            pointer-events: none;
        }

        .values.horizontal {
            width: calc(100% - 2 * var(--slider-margin, 5%));
            margin-top: 0%;
            margin-bottom: 0%;
            margin-left: calc(-var(--slider-text-offset, -5%));
            margin-right: calc(var(--slider-text-offset, 5%));
            height: var(--slider-text-width, 50px);
        }

        .value {
            position: absolute;
            pointer-events: none;
        }

        .bottom.vertical {
            bottom: 0%;
            right: 0%;
        }

        .bottom.horizontal {
            left: 0%;
            top: 0%;
        }

        .top.vertical {
            bottom: 100%;
            right: 0%;
        }

        .top.horizontal {
            left: 100%;
            top: 0%;
        }

        .current {
            left: 0%;
        }

        .current.horizontal {
            bottom: 0%;
        }

    `];

}

customElements.define("slider-bar", SliderBar);