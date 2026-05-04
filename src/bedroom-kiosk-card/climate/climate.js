import { html } from 'lit';
import { HaClimateComponent } from '../../shared-resources/base-classes/ha-climate-component.js';
import styles from './climate.styles.js';
import sharedStyles from '../../shared-resources/styles/shared-styles.js';
import '../../shared-resources/climate-components/heatpump-panel/heatpump-panel.js';
import '../../shared-resources/climate-components/aux-thermostat-panel/aux-thermostat-panel.js';

export class ClimatePanel extends HaClimateComponent {



    /****************************** getter and setter logic **************************/

    getPrimary() {
        return this.getStructure().primary;
    }

    getPrimaryEIs() {
        return this.getPrimary().entityIds;
    }

    getPrimaryStructure() {
        return this.getPrimary().structure;
    }

    getSecondary() {
        return this.getStructure().secondary;
    }

    getSecondaryEIs() {
        return this.getSecondary().entityIds;
    }

    getSecondaryStructure() {
        return this.getSecondary().structure;
    }

    /****************************** html/style logic *********************************/

    primaryPanel() {
        if (this.getPrimary()) {
            return html`
                <heatpump-panel class="outlined"
                    .changedEntityIds = ${this.getCEIs()}
                    .states = ${this.getStates()}
                    .entityIds = ${this.getPrimaryEIs()}
                    .structure = ${this.getPrimaryStructure()}
                    .callService = ${this.callService}
                ></heatpump-panel>`
        }
    }

    secondaryPanel() {
        if (this.getSecondary()) {
            return html`
                <aux-thermostat-panel class="outlined"
                    .changedEntityIds = ${this.getCEIs()}
                    .states = ${this.getStates()}
                    .entityIds = ${this.getSecondaryEIs()}
                    .structure = ${this.getSecondaryStructure()}
                    .regionName = ${'bedroom'}
                    .callService = ${this.callService}
                ></aux-thermostat-panel>
            `
        }
    }

    static styles = [sharedStyles, styles];

    render() {
        if (this.isInitialized()) {
            return html`
                ${this.primaryPanel()}
                ${this.secondaryPanel()}
            `
        }
    }

}

customElements.define("climate-bedroom-panel", ClimatePanel);