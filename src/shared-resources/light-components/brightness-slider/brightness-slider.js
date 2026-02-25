import { html, LitElement } from 'lit';
import { getBrightnessPct } from '../util/light-util.js';
import { ONLIGHT } from '../../util/color-util.js';
import { getEntityId } from '../../util/state-util.js';
import styles from './brightness-slider.styles.js';
import sharedStyles from '../../styles/shared-styles.js';
import '../../general-components/slider/slider.js';

export class BrightnessSlider extends LitElement {


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
        let data = { entity_id: entityId, brightness_pct: value }
        this.callService('light', 'turn_on', data)
    }

    /**************************** style/html logic ******************************/

    brightnessBar() {
        return html`
            <slider-bar
                .changedEntityIds = ${this.getCEIs()}
                .state=${this.getLightState()}
                .max=${100}
                .min=${0}
                .units=${'%'}
                .startValue=${getBrightnessPct(this.getLightState())}
                .colorCode=${ONLIGHT}
                @change=${this.handleCallService}
            ></slider-bar>`
    }

    static styles = [sharedStyles, styles];

    render() {
        if (this.isInitialized()) {
            return html`
                ${this.brightnessBar()}
            `
        }
    }

}

customElements.define("brightness-slider", BrightnessSlider);