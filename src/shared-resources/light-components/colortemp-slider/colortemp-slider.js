import { html } from 'lit';
import { tempGradient, getMinTemp, getMaxTemp, getColorTemp } from '../util/light-util.js';
import { getEntityId } from '../../util/state-util.js';
import { HaSubComponent } from '../../base-classes/ha-subcomponent.js';
import styles from './colortemp-slider.styles.js';
import sharedStyles from '../../styles/shared-styles.js';
import '../../general-components/slider/slider.js';

export class ColorTempSlider extends HaSubComponent {

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