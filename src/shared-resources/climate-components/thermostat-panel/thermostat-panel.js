import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { HaClimateComponent } from '../../base-classes/ha-climate-component.js';
import { COOL, HOT } from '../../util/color-util.js';
import { thermometer } from '../../util/mdi-util.js';
import styles from './thermostat.styles.js';
import sharedStyles from '../../styles/shared-styles.js';
import '../mode-controls/mode-controls.js';
import '../../general-components/double-circle-slider/double-circular-slider.js';
import '../../general-components/adjust-buttons/adjust-buttons.js';

export class ThermostatPanel extends HaClimateComponent {

    static styles = [sharedStyles, styles];

    getColorMode() {
        let colorMode;
        (this.getAction() === 'Heating') && (colorMode = 'min');
        (this.getAction() === 'Cooling') && (colorMode = 'max');
        return colorMode;
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
        structure.separation = this.getSeparation();
        if (['heat', 'heat-cool'].includes(this.getMode())) {
            structure.minValue = this.getMin();
        }
        if (['cool', 'heat-cool'].includes(this.getMode())) {
            structure.maxValue = this.getMax();
        }
        return structure;
    }

    /******************************** interactive logic ************************************/

    handleCallService(e) {
        const details = e.detail;
        const key = details[0];
        const entityId = this.getStructure()[key];
        const value = details[1];
        const data = {
            entity_id: entityId,
            value: value
        }
        this.callService('input_number', 'set_value', data);
    }

    canChange(target, change) {
        let minExtreme = this.getMinExtreme();
        let maxExtreme = this.getMaxExtreme();;
        if (this.getMode() === 'heat-cool') {
            (target === 'min') && (maxExtreme = this.getMax() - this.getSeparation());
            (target === 'max') && (minExtreme = this.getMin() + this.getSeparation());
        }
        const current = this.getNumberState(target);
        const step = this.getNumberAttribute(target, 'step');
        if (change === 'increment') {
            return (current + step <= maxExtreme);
        } else {
            return (current - step >= minExtreme);
        }
    }

    change(e, target) {
        const change = e.detail;
        const entityId = this.getStructure()[target];
        const data = { entity_id: entityId };
        (this.canChange(target, change)) && (this.callService('input_number', change, data));
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
        if (['heat', 'heat-cool'].includes(this.getMode())) {
            result = html`<adjust-buttons @change=${(e) => this.change(e, 'min')}></adjust-buttons>`
        }
        return result;
    }

    adjustMax() {
        let result = html``;
        if (['cool', 'heat-cool'].includes(this.getMode())) {
            result = html`<adjust-buttons @change=${(e) => this.change(e, 'max')}></adjust-buttons>`
        }
        return result;
    }

    adjustButtons() {
        return html`
            <div class="button-row" style=${styleMap(this.getButtonStyles())}>
                ${this.adjustMin()}
                ${this.adjustMax()}
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
                    @change=${this.handleCallService}
                >
                </double-circular-slider>
                ${this.adjustButtons()}
            `
        }
    }
}

customElements.define("thermostat-panel", ThermostatPanel);