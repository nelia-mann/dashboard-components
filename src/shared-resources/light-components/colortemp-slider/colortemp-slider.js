import { html } from 'lit';
import { HaLightingComponent } from '../../base-classes/ha-lighting-component.js';
import styles from './colortemp-slider.styles.js';
import sharedStyles from '../../styles/shared-styles.js';
import '../../general-components/slider/slider.js';

export class ColorTempSlider extends HaLightingComponent {

    isFixed() {
        if (this.getLightState().state === 'off') {
            return true;
        } return false;
    }

    /************************ interactive logic *******************************/

    handleCallService(e) {
        const value = e.detail;
        const entityId = this.getMainId();
        let data = { entity_id: entityId, color_temp_kelvin: value }
        this.callService('light', 'turn_on', data)
    }

    waitCondition(entityId, value) {
        const state = this.getState(entityId);
        const target = state.attributes.color_temp_kelvin;
        return (target - .5 < value) && (value < target + .5);
    }

    /**************************** style/html logic ******************************/

    ctBar() {
        const maxTemp = this.getMaxTemp();
        const minTemp = this.getMinTemp();
        const tempGrad = this.tempGradientGeneral(minTemp, maxTemp, 'to right', 1);
        return html`
            <slider-bar
                .fixed = ${this.isFixed()}
                .changedEntityIds = ${this.getCEIs()}
                .state=${this.getLightState()}
                .max=${maxTemp}
                .min=${minTemp}
                .startValue=${this.getColorTemp()}
                .units=${'K'}
                .background=${tempGrad}
                .mode=${'horizontal'}
                @change=${this.handleCallService}
                .wait = ${this.waitCondition}
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