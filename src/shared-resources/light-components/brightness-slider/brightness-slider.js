import { html } from 'lit';
import { ONLIGHT, OFFLIGHT, OFF, rgba } from '../../util/color-util.js';
import { HaLightingComponent } from '../../base-classes/ha-lighting-component.js';
import styles from './brightness-slider.styles.js';
import sharedStyles from '../../styles/shared-styles.js';
import '../../general-components/slider/slider.js';

export class BrightnessSlider extends HaLightingComponent {


    isFixed() {
        if (this.getLightState().state === 'off') {
            return true;
        } return false;
    }

    /************************ interactive logic *******************************/

    handleCallService(e) {
        const value = e.detail;
        const entityId = this.getMainId();
        let data = { entity_id: entityId, brightness_pct: value }
        const state = this.getLightState().state;
        this.callService('light', 'turn_on', data)
    }

    /**************************** style/html logic ******************************/

    getColor() {
        const state = this.getLightState().state;
        if (state === 'on') return ONLIGHT;
        return OFFLIGHT;
    }

    brightnessBar() {
        return html`
            <slider-bar
                .fixed = ${this.isFixed()}
                .changedEntityIds = ${this.getCEIs()}
                .state=${this.getLightState()}
                .max=${100}
                .min=${0}
                .units=${'%'}
                .startValue=${this.getBrightnessPct()}
                .colorCode=${this.getColor()}
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