import { html } from 'lit';
import { ONLIGHT } from '../../util/color-util.js';
import { HaLightingComponent } from '../../base-classes/ha-lighting-component.js';
import styles from './brightness-slider.styles.js';
import sharedStyles from '../../styles/shared-styles.js';
import '../../general-components/slider/slider.js';

export class BrightnessSlider extends HaLightingComponent {

    /************************ interactive logic *******************************/

    handleCallService(e) {
        const value = e.detail;
        const entityId = this.getMainId();
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
                .startValue=${this.getBrightnessPct()}
                .colorCode=${ONLIGHT}
                .mode=${'horizontal'}
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