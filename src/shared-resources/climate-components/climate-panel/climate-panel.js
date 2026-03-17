import { html } from 'lit';
import { HaSubComponent } from '../../base-classes/ha-subcomponent.js';
import styles from './climate.styles.js';
import sharedStyles from '../../styles/shared-styles.js';
import './../mode-controls/mode-controls.js';

export class ClimatePanel extends HaSubComponent {

    static styles = [sharedStyles, styles];

    getControlEIs() {
        let entityIds = new Set();
        entityIds.add(this.getStructure().mode);
        if (this.getStructure().dominanthp) {
            entityIds.add(this.getStructure().dominanthp);
        }
        return entityIds;
    }

    render() {
        if (this.isInitialized()) {
            return html`
                <div class="thermostat"> Thermostat </div>
                <mode-controls
                    .changedEntityIds = ${this.getCEIs()}
                    .states = ${this.getStates()}
                    .entityIds = ${this.getControlEIs()}
                    .structure = ${this.getStructure()}
                    .callServive = ${this.callService}
                ></mode-controls>
            `
        }
    }
}

customElements.define("climate-panel", ClimatePanel);