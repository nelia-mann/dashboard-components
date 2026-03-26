import { html } from 'lit';
import { HaSubComponent } from '../../shared-resources/base-classes/ha-subcomponent.js';
import styles from './thermostat.styles.js';
import sharedStyles from '../../shared-resources/styles/shared-styles.js';
import { COOL, HOT } from './../../shared-resources/util/color-util.js';
import { thermometer } from './../../shared-resources/util/mdi-util.js';
import './../../shared-resources/general-components/double-circle-slider/double-circular-slider.js';
import './../../shared-resources/general-components/adjust-buttons/adjust-buttons.js';

export class MainThermostatPanel extends HaSubComponent {

    getState(key) {
        const entityId = this.getStructure()[key];
        const state = this.getStates()[entityId];
        return state.state;
    }

    getAttribute(key, attribute) {
        const entityId = this.getStructure()[key];
        const state = this.getStates()[entityId];
        return state.attributes[attribute];
    }

    getMode() {
        return this.getState('thermostat');
    }

    getThermostatId() {
        return this.getStructure()['thermostat'];
    }

    getModes() {
        return this.getAttribute('thermostat', 'hvac_modes');
    }

    getMinExtreme() {
        return Number(this.getAttribute('thermostat', 'min_temp'));
    }

    getMaxExtreme() {
        return Number(this.getAttribute('thermostat', 'max_temp'));
    }

    getStep() {
        return 1;
    }

    getTarget() {
        return Number(this.getAttribute('thermostat', 'temperature'));
    }

    getTemp() {
        return Number(this.getAttribute('thermostat', 'current_temperature'));
    }

    getAction() {
        let result = this.getAttribute('thermostat', 'hvac_action');
        return result.charAt(0).toUpperCase() + result.slice(1);
    }

    getUnits() {
        return String.fromCharCode(176) + 'F'
    }

    getColorMode() {
        let colorMode;
        (this.getAction() === 'Heating') && (colorMode = 'min');
        return colorMode;
    }

    getSliderEIs() {
        return new Set([this.getThermostatId()]);
    }

    getSliderStructure() {
        let structure = {};
        structure.value = this.getTemp();
        structure.minExtreme = this.getMinExtreme();
        structure.maxExtreme = this.getMaxExtreme();
        structure.units = this.getUnits();
        structure.upper = this.getAction();
        structure.icon = thermometer;
        structure.minColor = HOT;
        structure.maxColor = COOL;
        structure.colorMode = this.getColorMode();
        structure.separation = 0;
        if (this.getMode() === 'heat') {
            structure.minValue = this.getTarget();
        }
        return structure;
    }

    /*********************************** interactive logic *************************************/

    handleCallService(e) {
        const entityId = this.getThermostatId();
        const data = {
            entity_id: entityId,
            temperature: e.detail[1].toFixed(0)
        }
        console.log(data);
        this.callService('climate', 'set_temperature', data);
    }

    change(e) {
        const change = e.detail;
        let step = this.getStep();
        (change === 'decrement') && (step = -1 * step);
        console.log(this.getTarget());
        const newTemp = (this.getTarget() + step).toFixed(0);
        if (this.getMinExtreme() < newTemp < this.getMaxExtreme()) {
            const entityId = this.getThermostatId();
            const data = {
                entity_id: entityId,
                temperature: newTemp
            }
            this.callService('climate', 'set_temperature', data);
        }
    }

    /********************************* html/css logic ******************************************/

    adjustButtons() {
        let buttons = html``;
        if (this.getMode() == 'heat') {
            buttons = html`<adjust-buttons @change=${this.change}></adjust-buttons>`;
        }
        return html`
            <div class="button-row">
                ${buttons}
            </div>
        `
    }

    static styles = [sharedStyles, styles];

    render() {
        if (this.isInitialized()) {
            console.log(this.getStructure())
            return html`
                <div class="thermostat">
                    Placeholder
                </div>
                `
        }
    }

}

customElements.define("main-thermostat-panel", MainThermostatPanel);