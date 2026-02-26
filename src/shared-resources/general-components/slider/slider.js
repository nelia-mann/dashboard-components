import { html, LitElement } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { rgba } from '../../util/color-util.js';
import { getEntityId } from '../../util/state-util.js';
import { HaSubComponent } from '../../base-classes/ha-subcomponent.js';
import styles from './slider.styles.js';
import sharedStyles from '../../styles/shared-styles.js';

export class SliderBar extends HaSubComponent {

    static properties = {
        ...super.properties,
        state: { state: true },
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

    updateTrigger(changedProps) {
        return changedProps.has("_value");
    }

    onFirstUpdate() {
        this.setInitialValue();
    }

    updated() {
        (!this.isDown()) && (this.lowerChangeFlag());
    }

    hasRelevantChanges() {
        const isStateChanged = this.getCEIs().has(getEntityId(this.getState()));
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
        let newValue = String(Math.round(value));
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

    /****************************** interactive logic *******************************/

    // depends on type
    handleOnChange(e) {
        this.setIsDown(false);
        let value = e.target.value;
        this.dispatchEvent(new CustomEvent('change', { detail: value }));
    }


    handleOnInput(e) {
        this.raiseChangeFlag();
        this.setIsDown(true);
        const value = e.target.value;
        this.setValue(value);
    }

    /**************************** style/html logic ***************************/

    getHeight() {
        const heightScale = (this.getValue() - this.getMin()) / (this.getMax() - this.getMin());
        return Math.round(100 * heightScale);
    }

    getStyleLevel() {
        let styles = {};
        styles['bottom'] = `${this.getHeight()}%`;
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
            stem = stem + dark + height + ', ' + pale + height + ')';
            styles['background'] = stem;
        }
        return styles;
    }

    static styles = [sharedStyles, styles];

    render() {
        if (this.isInitialized()) {
            return html`
                <div class="values">
                    <div class="inner-values">
                        <div class="top-value"> ${this.addUnits(this.getMax())} </div>
                        <div class="bottom-value"> ${this.addUnits(this.getMin())} </div>
                    </div>
                </div>
                <div class="slider outlined">
                    <div class="inner-slider">
                        <div
                            class="shown-slider"
                            style="${styleMap(this.getStyleBG())}"
                        >
                            <div class="shown-level" style="${styleMap(this.getStyleLevel())}"></div>
                        </div>
                        <input
                            class="actual-slider"
                            type="range"
                            max=${this.getMax()}
                            min=${this.getMin()}
                            value="${this.getValue()}"
                            @input="${this.handleOnInput}"
                            @change="${this.handleOnChange}"
                        ></input>
                    </div>
                </div>
                <div class="values">
                    <div class="inner-values">
                        <div class="current-value" style="${styleMap(this.getStyleLevel())}">
                            ${this.addUnits(this.getValue())}
                        </div>
                    </div>
                </div>
            `
        }
    }

}

customElements.define("slider-bar", SliderBar);