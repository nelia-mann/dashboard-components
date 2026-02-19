import { html, LitElement } from 'lit';
import { tempGradient, getMinTemp, getMaxTemp, getColorTemp } from '../util/light-util.js';
import styles from './colortemp-slider.styles.js';
import sharedStyles from '../../styles/shared-styles.js';
import '../../general-components/slider/slider.js';
import { getEntityId } from '../../util/state-util.js';

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
        return this.getCEIs().has(getEntityId(this.getLightState()));
    }

    /************************ getter and setter logic *************************/

    isInitialized() {
        return this._initialized;
    }

    initialize() {
        this._initialized = true;
    }

    getLightState() {
        return this._lightState;
    }

    getCEIs() {
        return this._changedEntityIds;
    }

    /************************ interactive logic *******************************/

    handleCallService(e) {
        const value = e.detail;
        const entityId = getEntityId(this.getLightState());
        let data = { entity_id: entityId, color_temp_kelvin: value }
        this.callService('light', 'turn_on', data)
    }

    /**************************** style/html logic ******************************/

    ctBar() {
        const minTemp = getMinTemp(this.getLightState());
        const maxTemp = getMaxTemp(this.getLightState())
        const tempGrad = tempGradient(minTemp, maxTemp);
        return html`
            <slider-bar
                ._changedEntityIds = ${this.getCEIs()}
                ._state=${this.getLightState()}
                @change=${this.handleCallService}
                ._max=${maxTemp}
                ._min=${minTemp}
                ._units=${'K'}
                ._startValue=${getColorTemp(this.getLightState())}
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