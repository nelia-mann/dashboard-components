import { html } from 'lit';
import { repeat } from 'lit-html/directives/repeat.js';
import { HaSubComponent } from '../../shared-resources/base-classes/ha-subcomponent.js';
import styles from './floor.styles.js';
import sharedStyles from '../../shared-resources/styles/shared-styles.js';
import '../../shared-resources/light-components/light-group-control/light-group-control.js';
import '../../shared-resources/light-components/area-list-panel/area-list-panel.js';


export class FloorPanel extends HaSubComponent {

    getBasicLighting() {
        return this.getStructure().basic_lighting;
    }

    getBasicLightingStructure() {
        return this.getBasicLighting().structure;
    }

    getBasicLightingEIs() {
        return this.getBasicLighting().entityIds;
    }

    getSpecialLights() {
        return this.getStructure().special_lights.structure;
    }

    getSpecialTheme(specialId) {
        return this.getSpecialLights()[specialId].theme;
    }

    getAreaListDisplay() {
        return html`
            <area-list-panel
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .structure = ${this.getBasicLightingStructure()}
                .entityIds = ${this.getBasicLightingEIs()}
                .callService=${this.callService}
            ></area-list-panel>
        `;
    }

    getSpecialDisplay(specialId) {
        return html`
            <light-group-control
                class="outlined"
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .structure = ${this.getSpecialLights()[specialId].structure}
                .entityIds = ${this.getSpecialLights()[specialId].entityIds}
                .callService = ${this.callService}
            ></light-group-control>
        `
    }

    getSpecialDisplays() {
        const specialIds = Object.keys(this.getSpecialLights());
        return html`${repeat(specialIds, (specialId) => specialId, (specialId) => this.getSpecialDisplay(specialId))}`
    }

    static styles = [sharedStyles, styles];

    render() {
        if (this.isInitialized()) {
            return html`
                ${this.getAreaListDisplay()}
                ${this.getSpecialDisplays()}
                `
        }
    }

}

customElements.define("floor-panel", FloorPanel);