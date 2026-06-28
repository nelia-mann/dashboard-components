import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { HaClimateComponent } from '../../base-classes/ha-climate-component.js';
import { COOL, HOT } from '../../util/color-util.js';
import { thermometer } from '../../util/mdi-util.js';
import styles from './thermostat.styles.js';
import sharedStyles from '../../styles/shared-styles.js';
import '../../general-components/double-circle-slider/double-circular-slider.js';
import '../../general-components/adjust-buttons/adjust-buttons.js';

export class ThermostatPanel extends HaClimateComponent {

    static properties = {
        ...super.properties,
        fixed: { state: true }
    }

    constructor() {
        super();
        this.fixed = false;
    }

    getTriggers() {
        return ['fixed'];
    }

    static styles = [sharedStyles, styles];

    getColorMode() {
        let colorMode;
        (this.getAction() === 'Heating') && (colorMode = 'min');
        (this.getAction() === 'Cooling') && (colorMode = 'max');
        return colorMode;
    }

    getSliderStructure() {
        let structure = {};
        structure.value = this.getSensor();
        structure.minExtreme = this.getMinExtreme();
        structure.maxExtreme = this.getMaxExtreme();
        structure.units = this.getSensorUnits();
        structure.upper = this.getAction();
        structure.icon = thermometer;
        structure.minColor = HOT;
        structure.maxColor = COOL;
        structure.colorMode = this.getColorMode();
        structure.separation = this.getSeparation();
        if (this.getMode() === 'heat') {
            structure.minValue = this.getTarget();
        }
        if (this.getMode() === 'cool') {
            structure.maxValue = this.getTarget();
        }
        if  ((this.getMode() === 'heat_cool') || (this.getMode() === 'auto')) {
            structure.targetValue = this.getTarget();
        }
        return structure;
    }

    isFixed() {
        return this.fixed;
    }

    /******************************** interactive logic ************************************/

    handleCallService(e) {
        const details = e.detail;
        const key = details[0];
        let entityId;
        (this.getEntityId('hp')) && (entityId = this.getEntityId('hp'));
        (this.getEntityId('thermostat')) && (entityId = this.getEntityId('thermostat'));
        const value = details[1];
        const data = {
            entity_id: entityId,
            temperature: value 
        }
        this.callService('climate', 'set_temperature', data);
    }

    change(e) {
        const change = e.detail;
        let entityId;
        (this.getEntityId('hp')) && (entityId = this.getEntityId('hp'));
        (this.getEntityId('thermostat')) && (entityId = this.getEntityId('thermostat'));
        let value = this.getTarget();
        value = value + change * this.getSeparation();
        if ((this.getMinExtreme() < value) && (value < this.getMaxExtreme())) {
            const data = {
                    entity_id: entityId,
                    temperature: value
            }
            this.callService('climate', 'set_temperature', data);
        } 
    }

    /*********************************** html/css logic *********************************************/

    adjustButtons() {
        if (this.isFixed()) return null;
        if (!['heat', 'cool', 'auto'].includes(this.getMode())) return null;
        return html`
            <div class="button-row">
                <adjust-buttons @change=${(e) => this.change(e)}></adjust-buttons>
            </div>
        `
    }

    render() {
        if (this.isInitialized()) {
            return html`
                <double-circular-slider
                    .changedEntityIds = ${this.getCEIs()}
                    .states = ${this.getStates()}
                    .entityIds = ${this.getEntityIds()}
                    .structure=${this.getSliderStructure()}
                    .fixed=${this.isFixed()}
                    @change=${this.handleCallService}
                >
                </double-circular-slider>
                ${this.adjustButtons()}
            `
        }
    }
}

customElements.define("thermostat-panel", ThermostatPanel);