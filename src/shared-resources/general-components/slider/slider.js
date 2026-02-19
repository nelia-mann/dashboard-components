import { html, LitElement } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import styles from './slider.styles.js';
import sharedStyles from '../../styles/shared-styles.js';
import { rgba } from '../../util/color-util.js';

export class SliderBar extends LitElement {

    _max;
    _min;
    _startValue;
    _units = '';
    _background = '';
    _colorCode = [0, 0, 0];
    _isDown = false;

    static get properties() {
        return {
            _state: { state: true },
            _value: { state: true },
            _changedEntityIds: { state: true },
            _initialized: { state: true }
        }
    }

    // when first constructed
    constructor() {
        super();
        this._state = {};
        this._changedEntityIds = new Set();
        this._initialized = false;
    }

    /************* lifecycle ***********************************************/

    // each time an update occurs resulting in rerendering
    update(changedProps) {
        super.update(changedProps);
    }

    // determines if an update should occur
    shouldUpdate(changedProps) {
        return (!this.isInitialized()
            || this.hasRelevantChanges()
            || changedProps.has("_value")
            || changedProps.has("_initialized"))
    }

    // runs after the first update
    firstUpdated() {
        this.setInitialValue();
        this.initialize();
    }

    // runs after every update
    updated() {
        (this.hasRelevantChanges()) && (this.setInitialValue());
    }

    // helper to determine if should update
    hasRelevantChanges() {
        const isStateChanged = this.getCEIs().has(this.getEntityId());
        const isUp = !this.isDown();
        const isNew = (this.getValue() != this.getStateValue());
        return (isStateChanged && isUp && isNew);
    }

    // syncs the value to an external change
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
        return this._min;
    }

    getMax() {
        return this._max;
    }

    getStateValue() {
        return this._startValue;
    }

    isInitialized() {
        return this._initialized;
    }

    initialize() {
        this._initialized = true;
    }

    getEntityId() {
        return this._state.entity_id;
    }

    getCEIs() {
        return this._changedEntityIds;
    }

    addUnits(value) {
        let newValue = String(Math.round(value));
        newValue = newValue + this._units;
        return newValue;
    }

    isDown() {
        return this._isDown;
    }

    setIsDown(boolean) {
        this._isDown = boolean;
    }

    getBackground() {
        return this._background;
    }

    getColorCode() {
        return this._colorCode;
    }

    /****************************** interactive logic *******************************/

    // depends on type
    handleOnChange(e) {
        this.setIsDown(false);
        let value = e.target.value;
        this.dispatchEvent(new CustomEvent('change', { detail: value }));
    }


    handleOnInput(e) {
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