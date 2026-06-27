import { html } from 'lit';
import { HaClimateComponent } from '../../shared-resources/base-classes/ha-climate-component.js';
import styles from './climate.styles.js';
import sharedStyles from '../../shared-resources/styles/shared-styles.js';
import '../../shared-resources/climate-components/heatpump-panel/heatpump-panel.js';
import '../../shared-resources/climate-components/aux-thermostat-panel/aux-thermostat-panel.js';

export class ClimateBasementPanel extends HaClimateComponent {



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

    getAux() {
        return this.getStructure().aux;
    }

    getAuxStructure() {
        return this.getAux().structure;
    }

    getAuxEIs() {
        return this.getAux().entityIds;
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

    auxPanel() {
        if (this.getAux()) {
            return html`
                <aux-basement-panel class="outlined"
                    .changedEntityIds = ${this.getCEIs()}
                    .states = ${this.getStates()}
                    .entityIds = ${this.getAuxEIs()}
                    .structure = ${this.getAuxStructure()}
                    .regionName = ${"Office"}
                    .callService = ${this.callService}
                ></aux-basement-panel>
            `
        }
    }

    static styles = [sharedStyles, styles];

    render() {
        if (this.isInitialized()) {
            return html`
                ${this.primaryPanel()}
                ${this.auxPanel()}
            `
        }
    }

}

customElements.define("climate-basement-panel", ClimateBasementPanel);