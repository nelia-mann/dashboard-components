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

    /************************************** getter logic ***************************************/

    getActionColor() {
        if (this.getAction() === 'Heating') return HOT;
        if (this.getAction() === 'Cooling') return COOL;
    }

    getTargetValue() {
        if (['heat', 'cool', 'heat_cool', 'auto'].includes(this.getMode())) {
            return this.getTarget();
        }        
    }

    isFixed() {
        return this.fixed;
    }

    getHighColor() {
        if (['heat', 'heat_cool', 'auto'].includes(this.getMode())) return HOT;
    }

    getLowColor() {
        if (['cool', 'heat_cool', 'auto'].includes(this.getMode())) return COOL;        
    }

    getThermId() {
        if (this.getEntityId('hp')) return this.getEntityId('hp');
        if (this.getEntityId('thermostat')) return this.getEntityId('thermostat');
    }

    /******************************** interactive logic ************************************/

    wait(entityId, value) {
        return this.getState(entityId).attributes.temperature === Math.round(value);
    }

    handleCallService(e) {
        const value = Math.round(e.detail);
        const data = {
            entity_id: this.getThermId(),
            temperature: value 
        }
        this.callService('climate', 'set_temperature', data);
    }

    change(e) {
        const change = e.detail;
        let value = this.getTarget();
        value = value + change * this.getSeparation();
        if ((this.getMinExtreme() < value) && (value < this.getMaxExtreme())) {
            const data = {
                    entity_id: this.getThermId(),
                    temperature: value
            }
            this.callService('climate', 'set_temperature', data);
        } 
    }

    /*********************************** html/css logic *********************************************/

    static styles = [sharedStyles, styles];

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
                    .entityIds = ${new Set([this.getThermId()])}
                    .min = ${this.getMinExtreme()}
                    .max = ${this.getMaxExtreme()}
                    .sensor = ${this.getSensor()}
                    .units = ${this.getSensorUnits()}
                    .icon = ${thermometer}
                    .highColor = ${this.getHighColor()}
                    .lowColor = ${this.getLowColor()}
                    .targetValue = ${this.getTargetValue()}
                    .action = ${this.getAction()}
                    .actionColor = ${this.getActionColor()}
                    .fixed=${this.isFixed()}
                    .wait=${this.wait}
                    @change=${this.handleCallService}
                >
                </double-circular-slider>
                ${this.adjustButtons()}
            `
        }
    }
}

customElements.define("thermostat-panel", ThermostatPanel);