import { html } from 'lit';
import { HaSubComponent } from '../../shared-resources/base-classes/ha-subcomponent.js';
import styles from './area.styles.js';
import sharedStyles from '../../shared-resources/styles/shared-styles.js';
import './../../shared-resources/climate-components/climate-panel/climate-panel.js';
import '../main-thermostat-panel/main-thermostat-panel.js';

export class AreaClimatePanel extends HaSubComponent {


    getClimate() {
        return this.getStructure().climate;
    }

    getClimateEIs() {
        return this.getClimate().entityIds;
    }

    getClimateStructure() {
        return this.getClimate().structure;
    }

    getAux() {
        return this.getStructure().aux;
    }

    getAuxEIs() {
        return this.getAux().entityIds;
    }

    getAuxStructure() {
        return this.getAux().structure;
    }


    getMain() {
        return this.getAuxStructure().general;
    }

    getMainEIs() {
        return this.getMain().entityIds;
    }

    getMainStructure() {
        return this.getMain().structure;
    }

    auxPanel() {
        if (this.getMain()) {
            return html`
                <main-thermostat-panel class="outlined"
                    .changedEntityIds = ${this.getCEIs()}
                    .states = ${this.getStates()}
                    .entityIds = ${this.getMainEIs()}
                    .structure = ${this.getMainStructure()}
                    .callService = ${this.callService}
                ></main-thermostat-panel>
            `
        } else {
            return html`
                <div class="aux">
                    Auxiliary Placeholder
                </div>
            `
        }
    }

    static styles = [sharedStyles, styles];

    render() {
        if (this.isInitialized()) {
            return html`
                <climate-panel class="outlined"
                    .changedEntityIds = ${this.getCEIs()}
                    .states = ${this.getStates()}
                    .entityIds = ${this.getClimateEIs()}
                    .structure = ${this.getClimateStructure()}
                    .callService = ${this.callService}
                ></climate-panel>
                ${this.auxPanel()}
            `
        }
    }

}

customElements.define("area-climate-panel", AreaClimatePanel);