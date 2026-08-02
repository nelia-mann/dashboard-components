import { html, css } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { HaClimateComponent } from '../base-classes/ha-climate-component.js';
import { COOL, HOT } from '../util/color-util.js';
import { thermometer } from '../util/mdi-util.js';
import sharedStyles from '../styles/shared-styles.js';
import '../general-components/double-circular-slider.js';
import '../general-components/adjust-buttons.js';

export class ThermostatPanel extends HaClimateComponent {

    static properties = {
        ...super.properties,
        fixed: { state: true }
    }

    constructor() {
        super();
        this.fixed = false;
    }

/********************************************** lifecycle *************************************************************/

    getTriggers() {
        return ['fixed'];
    }

/********************************************** getter & setter logic *************************************************/

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

/********************************************** interactive logic *****************************************************/

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

/********************************************** html logic ************************************************************/

    adjustButtons() {
        if (this.isFixed()) return null;
        if (!['heat', 'cool', 'auto'].includes(this.getMode())) return null;
        return html`
            <div class="button-row">
                <adjust-buttons @change=${(e) => this.change(e)}/>
            </div>
        `;
    }

    slider() {
        return html`<double-circular-slider
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
        >`;
    }

    render() {
        if (this.isInitialized()) {
            return html`
                ${this.slider()}
                ${this.adjustButtons()}
            `
        }
    }
/********************************************** style logic ***********************************************************/

    static styles = [sharedStyles, css`

        :host {
            width: var(--thermostat-width, 80%);
            height: var(--thermostat-height, 350px);
            padding-bottom: var(--thermostat-bottom-padding, 0px);
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: center;
            position: relative;
            margin-top: var(--thermostat-margin-top, 0px);
            margin-bottom: var(--thermostat-margin-bottom, 0px);
        }

        .button-row {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            justify-content: center;
            width: var(--adjust-button-row-width, 85%);
        }

    `];

}

customElements.define("thermostat-panel", ThermostatPanel);
