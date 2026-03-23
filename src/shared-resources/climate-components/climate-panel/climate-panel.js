import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { HaSubComponent } from '../../base-classes/ha-subcomponent.js';
import { getAction } from '../util/climate-util.js';
import { COOL, HOT, rgba } from './../../util/color-util.js';
import { thermometer } from './../../util/mdi-util.js';
import styles from './climate.styles.js';
import sharedStyles from '../../styles/shared-styles.js';
import './../mode-controls/mode-controls.js';
import '../../general-components/double-circle-slider/double-circular-slider.js';
import '../../general-components/adjust-buttons/adjust-buttons.js';

export class ClimatePanel extends HaSubComponent {

    static styles = [sharedStyles, styles];

    getControlEIs() {
        let entityIds = new Set();
        entityIds.add(this.getStructure().mode);
        entityIds.add(this.getStructure().heatpump);
        if (this.getStructure().rank) {
            entityIds.add(this.getStructure().rank);
        }
        return entityIds;
    }

    getSliderEIs() {
        let entityIds = new Set();
        entityIds.add(this.getStructure().temp);
        entityIds.add(this.getStructure().mode);
        entityIds.add(this.getStructure().heatpump);
        const mode = this.getState("mode");
        if (['heat', 'heat-cool'].includes(mode)) {
            entityIds.add(this.getStructure().min);
        }
        if (['cool', 'heat-cool'].includes(mode)) {
            entityIds.add(this.getStructure().max);
        }
        return entityIds;
    }

    getAction() {
        return getAction(this.getStructure(), this.getStates());
    }

    getState(key) {
        const entityId = this.getStructure()[key];
        const state = this.getStates()[entityId];
        return state.state;
    }

    getAttribute(key, attribute) {
        const entityId = this.getStructure()[key];
        const state = this.getStates()[entityId];
        return state.attributes[attribute]
    }

    getSeparation() {
        const stepMin = Number(this.getAttribute('min', 'step'));
        const stepMax = Number(this.getAttribute('max', 'step'));
        return stepMin + stepMax;
    }


    getSliderStructure() {
        let structure = {};
        structure.value = Number(this.getState("temp"));
        structure.minExtreme = Number(this.getAttribute("min", "min"));
        structure.maxExtreme = Number(this.getAttribute("max", "max"));
        structure.units = this.getAttribute('temp', 'unit_of_measurement');
        structure.upper = this.getAction();
        structure.icon = thermometer;
        structure.minColor = HOT;
        structure.maxColor = COOL;
        structure.background = this.getBackground();
        structure.separation = this.getSeparation();
        if (['heat', 'heat-cool'].includes(this.getState("mode"))) {
            structure.minValue = Number(this.getState("min"));
        }
        if (['cool', 'heat-cool'].includes(this.getState("mode"))) {
            structure.maxValue = Number(this.getState("max"));
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
        const mode = this.getState('mode');
        const step = Number(this.getAttribute(target, 'step'))
        let minExtreme = Number(this.getAttribute("min", "min"));
        let maxExtreme = Number(this.getAttribute("max", "max"));
        if (mode === 'heat-cool') {
            if (target === 'min') {
                maxExtreme = Number(this.getState("max")) - this.getSeparation();
            }
            if (target === 'max') {
                minExtreme = Number(this.getState("min")) + this.getSeparation();
            }
        }
        const current = Number(this.getState(target));
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

    getBackground() {
        const action = this.getAction();
        let background = ``;
        if (['Heating', 'Cooling'].includes(action)) {
            let color = HOT;
            (action === 'Cooling') && (color = COOL);
            background = `radial-gradient(circle at center, ${rgba(color, .2)} 0, ${rgba(color, 0)} 60%)`
        }
        return background;
    }

    getButtonStyles() {
        let styles = { 'justify-content': 'center' };
        const mode = this.getState('mode');
        if (mode === "heat-cool") {
            styles['justify-content'] = 'space-between';
        }
        return styles;
    }

    adjustMin() {
        let result = html``;
        const mode = this.getState("mode");
        if (['heat', 'heat-cool'].includes(mode)) {
            result = html`<adjust-buttons @change=${(e) => this.change(e, 'min')}></adjust-buttons>`
        }
        return result;
    }

    adjustMax() {
        let result = html``;
        const mode = this.getState("mode");
        if (['cool', 'heat-cool'].includes(mode)) {
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
                <div class="thermostat">
                    <double-circular-slider
                        .changedEntityIds = ${this.getCEIs()}
                        .states = ${this.getStates()}
                        .entityIds = ${this.getSliderEIs()}
                        .structure=${this.getSliderStructure()}
                        @change=${this.handleCallService}
                    >
                    </double-circular-slider>
                    ${this.adjustButtons()}
                </div>
                <mode-controls
                    .changedEntityIds = ${this.getCEIs()}
                    .states = ${this.getStates()}
                    .entityIds = ${this.getControlEIs()}
                    .structure = ${this.getStructure()}
                    .callService = ${this.callService}
                ></mode-controls>
            `
        }
    }
}

customElements.define("climate-panel", ClimatePanel);