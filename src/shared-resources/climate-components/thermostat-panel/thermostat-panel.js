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
        if (['heat','safe'].includes(this.getMode())) {
            structure.minValue = this.getMin();
        }
        if (['cool'].includes(this.getMode())) {
            structure.maxValue = this.getMax();
        }
        if  (['auto'].includes(this.getMode())) {
            structure.targetValue = this.getTarget();
        }
        (this.getMode() === 'safe_min') && (structure.minValue = this.getSafeMin());
        return structure;
    }

    isFixed() {
        return this.fixed;
    }

    /******************************** interactive logic ************************************/

    handleCallService(e) {
        const details = e.detail;
        const key = details[0];
        const entityId = this.getEntityId(key);
        const value = details[1];
        if (this.getEntityId('hp')) {
            const data = {
                entity_id: this.getEntityId('hp'),
                temperature: value 
            }
            this.callService('climate', 'set_temperature', data);
        } else {
            const data = {
                entity_id: entityId,
                value: value
            }
            this.callService('input_number', 'set_value', data);
        }
    }

    canChange(target, change) {
        let minExtreme = this.getMinExtreme();
        let maxExtreme = this.getMaxExtreme();;
        const current = this.getNumberState(target);
        const step = this.getSeparation();
        if (change === 'increment') {
            return (current + step <= maxExtreme);
        } else {
            return (current - step >= minExtreme);
        }
    }

    change(e, target) {
        const change = e.detail;
        const entityId = this.getEntityId(target);
        let data;
        if (this.getEntityId('hp')) {
            let value = this.getTarget();
            if (change === 'increment') {
                value = value + this.getSeparation();
            } else {
                value = value - this.getSeparation();
            }
            if ((this.getMinExtreme() < value) && (value < this.getMaxExtreme())) {
                data = {
                    entity_id: this.getEntityId('hp'),
                    temperature: value
                }
                this.callService('climate', 'set_temperature', data);
            }
        } else if (this.canChange(target, change)) {
            data = { entity_id: entityId };
            this.callService('input_number', change, data);
        }
    }

    /*********************************** html/css logic *********************************************/

    getButtonStyles() {
        let styles = { 'justify-content': 'center' };
        if (this.getMode() === "heat-cool") {
            styles['justify-content'] = 'space-between';
        }
        return styles;
    }

    adjustMin() {
        let result = html``;
        if (['heat'].includes(this.getMode())) {
            result = html`<adjust-buttons @change=${(e) => this.change(e, 'min')}></adjust-buttons>`
        }
        return result;
    }

    adjustMax() {
        let result = html``;
        if (['cool'].includes(this.getMode())) {
            result = html`<adjust-buttons @change=${(e) => this.change(e, 'max')}></adjust-buttons>`
        }
        return result;
    }

    adjustTarget() {
        let result = html``;
        if (['auto'].includes(this.getMode())) {
            result = html`<adjust-buttons @change=${(e) => this.change(e, 'target')}></adjust-buttons>`            
        }
        return result;
    }

    adjustButtons() {
        if (this.isFixed()) return null;
        return html`
            <div class="button-row" style=${styleMap(this.getButtonStyles())}>
                ${this.adjustMin()}
                ${this.adjustMax()}
                ${this.adjustTarget()}
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