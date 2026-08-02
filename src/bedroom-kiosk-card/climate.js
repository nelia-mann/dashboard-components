import { html, css } from 'lit';
import { HaClimateComponent } from '../shared-resources/base-classes/ha-climate-component.js';
import sharedStyles from '../shared-resources/styles/shared-styles.js';
import '../shared-resources/climate-components/heatpump-panel.js';
import '../shared-resources/climate-components/aux-thermostat-panel.js';

export class ClimateBedroomPanel extends HaClimateComponent {

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

    getSecondary() {
        return this.getStructure().secondary;
    }

    getSecondaryEIs() {
        return this.getSecondary().entityIds;
    }

    getSecondaryStructure() {
        return this.getSecondary().structure;
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
                />`;
        }
    }

    render() {
        if (this.isInitialized()) {
            return html`
                ${this.primaryPanel()}
                ${this.secondaryPanel()}
            `
        }
    }

/********************************************** style logic ***********************************************************/

    static styles = [sharedStyles, css`   

        :host {
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-around;
            align-items: center;
            height: var(--climate-height, 485px);
            width: var(--climate-width, 900px);
        }`

    ];

}

customElements.define("climate-bedroom-panel", ClimateBedroomPanel);