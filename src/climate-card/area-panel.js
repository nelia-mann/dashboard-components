import { html, css } from 'lit';
import { HaSubComponent } from '../shared-resources/base-classes/ha-subcomponent.js';
import sharedStyles from '../shared-resources/styles/shared-styles.js';
import '../shared-resources/climate-components/heatpump-panel.js';
import '../shared-resources/climate-components/aux-thermostat-panel.js';
import '../shared-resources/climate-components/aux-basement-panel.js';

export class AreaClimatePanel extends HaSubComponent {

/********************************************** getter & setter logic *************************************************/

    getRegionName() {
        return this.regionName;
    }

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
                />`
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
                    .regionName = ${this.getRegionName()}
                    .callService = ${this.callService}
                />`
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
                    .regionName = ${this.getRegionName()}
                    .callService = ${this.callService}
                />`
        }
    }

    render() {
        if (this.isInitialized()) {
            return html`
                ${this.primaryPanel()}
                ${this.secondaryPanel()}
                ${this.auxPanel()}
            `
        }
    }

/********************************************** style logic ***********************************************************/

    static styles = [sharedStyles, css`

        :host {
            width: var(--area-panel-width, 100%);
            height: var(--area-panel-height, 400px);
            display: flex;
            flex-flow: var(--area-panel-flex-flow, column wrap);
            justify-content: var(--area-panel-justify-content, flex-start);
            align-items: var(--area-panel-align-items, flex-start);
        }        

    `];

}

customElements.define("area-climate-panel", AreaClimatePanel);