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
        return entityIds;
    }

    getTemp() {
        const entityId = this.getStructure().temp;
        const state = this.getStates()[entityId];
        return Number(state.state);
    }

    getMinTemp() {
        const entityId = this.getStructure().min;
        const state = this.getStates()[entityId];
        return Number(state.state);
    }

    getMaxTemp() {
        const entityId = this.getStructure().max;
        const state = this.getStates()[entityId];
        return Number(state.state);
    }

    getMinExtreme() {
        const entityId = this.getStructure().min;
        const state = this.getStates()[entityId];
        const min = state.attributes.min;
        return min;
    }

    getMaxExtreme() {
        const entityId = this.getStructure().max;
        const state = this.getStates()[entityId];
        const max = state.attributes.max;
        return max;
    }

    getSliderStructure() {
        let structure = {};
        structure.value = this.getTemp();
        structure.minExtreme = this.getMinExtreme();
        structure.maxExtreme = this.getMaxExtreme();
        structure.minValue = this.getMinTemp();
        structure.maxValue = this.getMaxTemp();
        structure.minColor = HOT;
        structure.maxColor = COOL;
        return structure;
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