import { html, css } from 'lit';
import { ONLIGHT, OFFLIGHT, OFF, rgba } from '../util/color-util.js';
import { HaLightingComponent } from '../base-classes/ha-lighting-component.js';
import sharedStyles from '../styles/shared-styles.js';
import '../general-components/slider.js';

export class BrightnessSlider extends HaLightingComponent {

/********************************************** getter & setter logic *************************************************/

    isFixed() {
        if (this.getLightState().state === 'off') {
            return true;
        } return false;
    }

    getColor() {
        const state = this.getLightState().state;
        if (state === 'on') return ONLIGHT;
        return OFFLIGHT;
    }

/********************************************** interactive logic *****************************************************/

    waitCondition(entityId, value) {
        const state = this.getState(entityId);
        const target = state.attributes.brightness * 100 / 255;
        return (target - .5 < value) && (value < target + .5);
    }

    handleCallService(e) {
        const value = e.detail;
        const entityId = this.getMainId();
        let data = { entity_id: entityId, brightness_pct: value }
        const state = this.getLightState().state;
        this.callService('light', 'turn_on', data)
    }

/********************************************** html logic ************************************************************/

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
                .wait = ${this.waitCondition}
            />`
    }

    render() {
        if (this.isInitialized()) {
            return html`
                ${this.brightnessBar()}
            `
        }
    }

/********************************************** style logic ***********************************************************/

    static styles = [sharedStyles, css`

        :host {
            width: var(--brightness-slider-width);
            height: var(--brightness-slider-height);
        }

    `];

}

customElements.define("brightness-slider", BrightnessSlider);
