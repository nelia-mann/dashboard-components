import { html } from 'lit';
import { HaLightingComponent } from '../../base-classes/ha-lighting-component.js';
import styles from './colortemp-slider.styles.js';
import sharedStyles from '../../styles/shared-styles.js';
import '../../general-components/slider/slider.js';

export class ColorTempSlider extends HaLightingComponent {

    /************************ interactive logic *******************************/

    handleCallService(e) {
        const value = e.detail;
        const entityId = this.getMainId();
        let data = { entity_id: entityId, color_temp_kelvin: value }
        this.callService('light', 'turn_on', data)
    }

    /**************************** style/html logic ******************************/

    ctBar() {
        const maxTemp = this.getMaxTemp();
        const minTemp = this.getMinTemp();
        const tempGrad = this.tempGradientGeneral(minTemp, maxTemp, 'to right', 1);
        return html`
            <slider-bar
                .changedEntityIds = ${this.getCEIs()}
                .state=${this.getLightState()}
                .max=${maxTemp}
                .min=${minTemp}
                .startValue=${this.getColorTemp()}
                .units=${'K'}
                .background=${tempGrad}
                .mode=${'horizontal'}
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