import { html, LitElement } from 'lit';
import { tempGradient } from '../util/color-util.js';
import styles from './colortemp-slider.styles.js';
import sharedStyles from '../../styles/shared-styles.js';
import '../../general-components/slider/slider.js';

export class ColorTempSlider extends LitElement {

    static get properties() {
        return {
            _lightState: { state: true },
            _changedEntityIds: { state: true },
            _initialized: { state: true }
        }
    }

    constructor() {
        super();
        this._lightState = {};
        this._changedEntityIds = new Set();
        this._initialized = false;
    }

    /******************************* lifecycle **********************************/

    update(changedProps) {
        super.update(changedProps);
    }

    shouldUpdate(changedProps) {
        return (!this.isInitialized()
            || this.hasRelevantChanges()
            || changedProps.has("_initialized"))
    }

    firstUpdated() {
        this.initialize();
    }

    hasRelevantChanges() {
        return this.getCEIs().has(this.getEntityId());
    }

    /************************ getter and setter logic *************************/

    isInitialized() {
        return this._initialized;
    }

    initialize() {
        (this._initialized = true);
    }

    getState() {
        return this._lightState;
    }

    getEntityId() {
        return this.getState().entity_id;
    }

    getColorTempKelvin() {
        return this.getState().attributes.color_temp_kelvin;
    }

    getCEIs() {
        return this._changedEntityIds;
    }

    getMinTemp() {
        return this.getState().attributes.min_color_temp_kelvin;
    }

    getMaxTemp() {
        return this.getState().attributes.max_color_temp_kelvin;
    }

    /************************ interactive logic *******************************/

    handleLightService(e) {
        const value = e.detail;
        const entityId = this.getEntityId();
        let data = { entity_id: entityId, color_temp_kelvin: value }
        this.callService('light', 'turn_on', data)
    }

    /**************************** style/html logic ******************************/

    ctBar() {
        const steps = 10;
        const tempGrad = tempGradient(this.getMinTemp(), this.getMaxTemp(), steps);
        return html`
            <slider-bar
                ._changedEntityIds = ${this.getCEIs()}
                ._state=${this.getState()}
                @change=${this.handleLightService}
                ._max=${this.getMaxTemp()}
                ._min=${this.getMinTemp()}
                ._units=${'K'}
                ._startValue=${this.getColorTempKelvin()}
                ._background=${tempGrad}
            ></slider-bar>`
    }

    static styles = [sharedStyles, styles];

    render() {
        if (this.isInitialized()) {
            return html`
                ${this.ctBar()}
            `
        }
    }

}

customElements.define("colortemp-slider", ColorTempSlider);