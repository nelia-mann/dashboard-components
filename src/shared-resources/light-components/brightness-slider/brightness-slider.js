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
        let data = { entity_id: entityId, brightness_pct: value }
        this.callService('light', 'turn_on', data)
    }

    /**************************** style/html logic ******************************/

    brightnessBar() {
        return html`
            <slider-bar
                ._changedEntityIds = ${this.getCEIs()}
                ._state=${this.getLightState()}
                @change=${this.handleCallService}
                ._max=${100}
                ._min=${0}
                ._units=${'%'}
                ._startValue=${getBrightnessPct(this.getLightState())}
                ._colorCode=${ONLIGHT}
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