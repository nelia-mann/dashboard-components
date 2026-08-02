import { html, css } from 'lit';
import { HaClimateComponent } from '../shared-resources/base-classes/ha-climate-component.js';
import sharedStyles from '../shared-resources/styles/shared-styles.js';
import '../shared-resources/climate-components/heatpump-panel.js';
import '../shared-resources/climate-components/aux-thermostat-panel.js';

export class ClimateBasementPanel extends HaClimateComponent {

/********************************************** getter & setter logic *************************************************/

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

/********************************************** html logic ************************************************************/

    primaryPanel() {
        if (this.getPrimary()) {
            return html`
                <heatpump-panel class="outlined"
                    .changedEntityIds = ${this.getCEIs()}
                    .states = ${this.getStates()}
                    .entityIds = ${this.getPrimaryEIs()}
                    .structure = ${this.getPrimaryStructure()}
                    .callService = ${this.callService}
                />`;
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
                />`;
        }
    }

    render() {
        if (this.isInitialized()) {
            return html`
                ${this.primaryPanel()}
                ${this.auxPanel()}
            `
        }
    }

/********************************************** style logic ***********************************************************/

    static styles = [sharedStyles, css`
        
        :host {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: center;
            height: var(--climate-height, 485px);
            width: var(--climate-width, 900px);
        }
        
    `];

}

customElements.define("climate-basement-panel", ClimateBasementPanel);