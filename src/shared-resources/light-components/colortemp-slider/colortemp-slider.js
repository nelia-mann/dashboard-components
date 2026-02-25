import { html, LitElement } from 'lit';
import { tempGradient, getMinTemp, getMaxTemp, getColorTemp } from '../util/light-util.js';
import { getEntityId } from '../../util/state-util.js';
import styles from './colortemp-slider.styles.js';
import sharedStyles from '../../styles/shared-styles.js';
import '../../general-components/slider/slider.js';

export class ColorTempSlider extends LitElement {

    static get properties() {
        return {
            changedEntityIds: { state: true },
            lightState: { state: true },
            _initialized: { state: true }
        }
    }

    constructor() {
        super();
        this.changedEntityIds = new Set();
        this.lightState = {};
        this._initialized = false;
    }

    /******************************* lifecycle **********************************/

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
        return this.lightState;
    }

    getCEIs() {
        return this.changedEntityIds;
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
                .changedEntityIds = ${this.getCEIs()}
                .state=${this.getLightState()}
                .max=${maxTemp}
                .min=${minTemp}
                .startValue=${getColorTemp(this.getLightState())}
                .units=${'K'}
                .background=${tempGrad}
                @change=${this.handleCallService}
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