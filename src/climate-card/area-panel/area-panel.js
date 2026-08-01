import { html } from 'lit';
import { HaSubComponent } from '../../shared-resources/base-classes/ha-subcomponent.js';
import styles from './area.styles.js';
import sharedStyles from '../../shared-resources/styles/shared-styles.js';
import '../../shared-resources/climate-components/heatpump-panel.js';
import '../../shared-resources/climate-components/aux-thermostat-panel.js';
import '../../shared-resources/climate-components/aux-basement-panel.js';

export class AreaClimatePanel extends HaSubComponent {

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
                    .regionName = ${this.getRegionName()}
                    .callService = ${this.callService}
                ></aux-thermostat-panel>
            `
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
                ></aux-basement-panel>
            `
        }
    }

    static styles = [sharedStyles, styles];

    render() {
        if (this.isInitialized()) {
            return html`
                ${this.primaryPanel()}
                ${this.secondaryPanel()}
                ${this.auxPanel()}
            `
        }
    }

}

customElements.define("area-climate-panel", AreaClimatePanel);