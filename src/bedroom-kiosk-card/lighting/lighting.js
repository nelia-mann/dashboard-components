import { html } from 'lit';
import { repeat } from 'lit-html/directives/repeat.js';
import { HaSubComponent } from '../../shared-resources/base-classes/ha-subcomponent.js';
import styles from './lighting.styles.js';
import sharedStyles from '../../shared-resources/styles/shared-styles.js';
import '../../shared-resources/light-components/area-panel.js'
import '../../shared-resources/light-components/light-group-control.js';

export class LightingBedroomPanel extends HaSubComponent {



    /****************************** getter and setter logic **************************/

    getBasicStructure() {
        return this.getStructure()['basic_lighting']['structure'];
    }

    getAreaEIs(areaId) {
        return this.getBasicStructure()[areaId].entityIds;
    }

    getAreaStructure(areaId) {
        return this.getBasicStructure()[areaId].structure;
    }

    getAreaName(areaId) {
        return this.getBasicStructure()[areaId].name
    }

    getSpecialStructure() {
        return this.getStructure()['special_lights']['structure'];
    }

    /****************************** html/style logic *********************************/

    static styles = [sharedStyles, styles];

    getAreaDisplay(areaId) {
        return html`
            <area-panel
                class="outlined"
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .name = ${this.getAreaName(areaId)}
                .structure = ${this.getAreaStructure(areaId)}
                .entityIds = ${this.getAreaEIs(areaId)}
                .callService = ${this.callService}
            ></area-panel>
        `
    }

    getSpecialDisplay(specialId) {
        return html`
            <light-group-control
                class="outlined"
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .structure = ${this.getSpecialStructure()[specialId].structure}
                .entityIds = ${this.getSpecialStructure()[specialId].entityIds}
                .callService = ${this.callService}
            ></light-group-control>
        `
    }

    basicLighting() {
        const areaIds = Object.keys(this.getBasicStructure()).sort();
        return html`${repeat(areaIds, (areaId) => areaId, (areaId) => this.getAreaDisplay(areaId))}`
    }

    specialLighting() {
        const specialIds = Object.keys(this.getSpecialStructure());
        return html`${repeat(specialIds, (specialId) => specialId, (specialId) => this.getSpecialDisplay(specialId))}`
    }

    render() {
        if (this.isInitialized()) {
            return html`
                ${this.basicLighting()}
                ${this.specialLighting()}
            `
        }
    }

}

customElements.define("lighting-bedroom-panel", LightingBedroomPanel);