import { html } from 'lit';
import { HaSubComponent } from '../../base-classes/ha-subcomponent.js';
import { COOL, HOT } from './../../util/color-util.js';
import styles from './climate.styles.js';
import sharedStyles from '../../styles/shared-styles.js';
import './../mode-controls/mode-controls.js';
import '../../general-components/double-circle-slider/double-circle-slider.js';

export class ClimatePanel extends HaSubComponent {

    static styles = [sharedStyles, styles];

    getControlEIs() {
        let entityIds = new Set();
        entityIds.add(this.getStructure().mode);
        if (this.getStructure().rank) {
            entityIds.add(this.getStructure().rank);
        }
        return entityIds;
    }

    getSliderEIs() {
        let entityIds = new Set();
        entityIds.add(this.getStructure().min);
        entityIds.add(this.getStructure().temp);
        entityIds.add(this.getStructure().max);
        entityIds.add(this.getStructure().mode);
        return entityIds;
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

    getSliderStructure() {
        let structure = {};
        structure.value = Number(this.getState("temp"));
        structure.minExtreme = Number(this.getAttribute("min", "min"));
        structure.maxExtreme = Number(this.getAttribute("max", "max"));
        structure.minColor = HOT;
        structure.maxColor = COOL;
        if (['heat', 'heat-cool'].includes(this.getState("mode"))) {
            structure.minValue = Number(this.getState("min"));
        }
        if (['cool', 'heat-cool'].includes(this.getState("mode"))) {
            structure.maxValue = Number(this.getState("max"));
        }
        return structure;
    }

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
                    ></double-circular-slider>
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