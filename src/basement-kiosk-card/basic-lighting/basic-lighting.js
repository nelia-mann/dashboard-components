import { html } from 'lit';
import { repeat } from 'lit-html/directives/repeat.js';
import { HaSubComponent } from '../../shared-resources/base-classes/ha-subcomponent.js';
import styles from './basic.styles.js';
import sharedStyles from '../../shared-resources/styles/shared-styles.js';
import '../area-panel/area-panel.js';

export class BasicLightingPanel extends HaSubComponent {

    getAreaName(areaId) {
        return this.getStructure()[areaId].name;
    }

    getSubStructure(areaId) {
        return this.getStructure()[areaId].structure;
    }

    getSubEIs(areaId) {
        return this.getStructure()[areaId].entityIds;
    }

    getAreaDisplay(areaId) {
        return html`
            <area-panel2
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .name = ${this.getAreaName(areaId)}
                .structure = ${this.getSubStructure(areaId)}
                .entityIds = ${this.getSubEIs(areaId)}
                .callService = ${this.callService}
            ></area-panel2>
        `
    }

    getAreaDisplays() {
        const areaIds = Object.keys(this.getStructure());
        return html`
            <div class="large-heading"> Basic Lighting </div>
            ${repeat(areaIds, (areaId) => areaId, (areaId) => this.getAreaDisplay(areaId))}`
    }

    static styles = [sharedStyles, styles];

    render() {
        if (this.isInitialized()) {
            return html`${this.getAreaDisplays()}`
        }
    }

}

customElements.define("basic-lighting-panel", BasicLightingPanel);