import { html } from 'lit';
import { HaClimateComponent } from '../../base-classes/ha-climate-component.js';
import styles from './heatpump.styles.js';
import sharedStyles from '../../styles/shared-styles.js';
import '../mode-controls/mode-controls.js';
import '../../general-components/double-circle-slider/double-circular-slider.js';
import '../../general-components/adjust-buttons/adjust-buttons.js';
import '../thermostat-panel/thermostat-panel.js';

export class HeatpumpPanel extends HaClimateComponent {

    static styles = [sharedStyles, styles];

    getControlEIs() {
        let entityIds = new Set();
        entityIds.add(this.getEntityId('hp'));
        if (this.getRankId()) {
            entityIds.add(this.getRankId());
        }
        return entityIds;
    }

    getThermostatEIs() {
        let entityIds = new Set();
        entityIds.add(this.getSensorId());
        entityIds.add(this.getModeId());
        entityIds.add(this.getHPId());
        entityIds.add(this.getEntityId('hp'));
        if (['heat', 'heat-cool'].includes(this.getMode())) {
            entityIds.add(this.getMinId());
        }
        if (['cool', 'heat-cool'].includes(this.getMode())) {
            entityIds.add(this.getMaxId());
        }
        return entityIds;
    }

    render() {
        if (this.isInitialized()) {
            return html`
                <div class="heading"> ${this.getName()} </div>
                <thermostat-panel
                    class="outlined"
                    .changedEntityIds = ${this.getCEIs()}
                    .states = ${this.getStates()}
                    .entityIds = ${this.getThermostatEIs()}
                    .structure= ${this.getStructure()}
                    .fixed= ${false}
                    .callService = ${this.callService}
                ></thermostat-panel>
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

customElements.define("heatpump-panel", HeatpumpPanel);