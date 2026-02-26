import { html } from 'lit';
import { getBrightnessPct } from '../util/light-util.js';
import { ONLIGHT } from '../../util/color-util.js';
import { getEntityId } from '../../util/state-util.js';
import { HaSubComponent } from '../../base-classes/ha-subcomponent.js';
import styles from './brightness-slider.styles.js';
import sharedStyles from '../../styles/shared-styles.js';
import '../../general-components/slider/slider.js';

export class BrightnessSlider extends HaSubComponent {

    static properties = {
        ...super.properties,
        lightState: { state: true }
    }

    constructor() {
        super();
        this.lightState = {};
    }

    /************************ getter and setter logic *************************/

    getLightState() {
        return this.lightState;
    }

    getEntityIds() {
        return new Set([getEntityId(this.getLightState())])
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