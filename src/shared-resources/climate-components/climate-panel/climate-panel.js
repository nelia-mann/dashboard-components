import { html } from 'lit';
import { HaClimateComponent } from '../../base-classes/ha-climate-component.js';
import styles from './climate.styles.js';
import sharedStyles from '../../styles/shared-styles.js';
import './../mode-controls/mode-controls.js';
import '../../general-components/double-circle-slider/double-circular-slider.js';
import '../../general-components/adjust-buttons/adjust-buttons.js';
import '../thermostat-panel/thermostat-panel.js';

export class ClimatePanel extends HaClimateComponent {

    static styles = [sharedStyles, styles];

    getControlEIs() {
        let entityIds = new Set();
        entityIds.add(this.getModeId());
        entityIds.add(this.getHPId());
        if (this.getRankId()) {
            entityIds.add(this.getRankId());
        }
        return entityIds;
    }

    getThermostatEIs() {
        let entityIds = new Set();
        entityIds.add(this.getTempId());
        entityIds.add(this.getModeId());
        entityIds.add(this.getHPId());
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
                <div class="heading"> ${'Heat Pump'} </div>
                <thermostat-panel
                    class="outlined"
                    .changedEntityIds = ${this.getCEIs()}
                    .states = ${this.getStates()}
                    .entityIds = ${this.getThermostatEIs()}
                    .structure=${this.getStructure()}
                    .fixed=${false}
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

customElements.define("climate-panel", ClimatePanel);