import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { rgba } from '../../util/color-util.js';
import { HaSubComponent } from '../../base-classes/ha-subcomponent.js';
import styles from './slider.styles.js';
import sharedStyles from '../../styles/shared-styles.js';

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
        this._isDown = false;
        this._flag = false;
    }

    /************************** lifecycle *****************************/

    update(changedProps) {
        (!this.getChangeFlag()) && (this.setInitialValue());
        super.update(changedProps);
    }

    getTriggers() {
        return ["_value", "colorCode"];
    }

    onFirstUpdate() {
        this.setInitialValue();
    }

    updated() {
        // (!this.isDown()) && (this.lowerChangeFlag());
    }

    hasRelevantChanges() {
        const isStateChanged = this.getCEIs().has(this.getStateEI(this.getState()));
        const isUp = !this.isDown();
        const isNew = (this.getValue() != this.getStateValue());
        return (isStateChanged && isUp && isNew);
    }

    setInitialValue() {
        (this.getStateValue()) ? (this.setValue(this.getStateValue())) : (this.setValue(this.getMin()));
    }

    /****************************** getter and setter logic *************************/

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

    isDown() {
        return this._isDown;
    }

    setIsDown(boolean) {
        this._isDown = boolean;
    }

    getBackground() {
        return this.background;
    }

    getColorCode() {
        return this.colorCode;
    }

    getChangeFlag() {
        return this._flag;
    }

    raiseChangeFlag() {
        this._flag = true;
    }

    lowerChangeFlag() {
        this._flag = false;
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

    /****************************** interactive logic *******************************/

    // depends on type
    async handleOnChange(e) {
        if (!this.isFixed()) {
            this.setIsDown(false);
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
            this.setIsDown(true);
            const value = e.target.value;
            this.setValue(value);
            this.dispatchEvent(new CustomEvent('slide', { detail: value }));
        }
    }

    /**************************** style/html logic ***************************/

    getHeight() {
        const heightScale = (this.getValue() - this.getMin()) / (this.getMax() - this.getMin());
        return Math.round(100 * heightScale);
    }

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

    static styles = [sharedStyles, styles];

    render() {
        if (this.isInitialized()) {
            return html`
                ${(this.getMode() === 'horizontal') ? this.value() : this.scales()}
                <div class="slider outlined ${this.getMode()}">
                    <div
                        class="inner-slider shown ${this.getMode()}"
                        style="${styleMap(this.getStyleBG())}"
                    >
                        <div class="shown-level ${this.getMode()}" style="${styleMap(this.getStyleLevel())}"></div>
                    </div>
                    <input
                        class="inner-slider actual ${this.getMode()}"
                        type="range"
                        max=${this.getMax()}
                        min=${this.getMin()}
                        value="${this.getValue()}"
                        @input="${this.handleOnInput}"
                        @change="${this.handleOnChange}"
                        step="${this.getStep()}"
                    ></input>
                </div>
                ${(this.getMode() === 'horizontal') ? this.scales() : this.value()}
            `
        }
    }

}

customElements.define("slider-bar", SliderBar);