import { html } from 'lit';
import { repeat } from 'lit-html/directives/repeat.js';
import { HaSubComponent } from '../../shared-resources/base-classes/ha-subcomponent.js';
import styles from './floor.styles.js';
import sharedStyles from '../../shared-resources/styles/shared-styles.js';
import '../area-panel/area-panel.js';

export class FloorPanel extends HaSubComponent {

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
            <area-panel
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .name = ${this.getAreaName(areaId)}
                .structure = ${this.getSubStructure(areaId)}
                .entityIds = ${this.getSubEIs(areaId)}
                .callService = ${this.callService}
            ></area-panel>
        `
    }

    getAreaDisplays() {
        const areaIds = Object.keys(this.getStructure());
        return html`${repeat(areaIds, (areaId) => areaId, (areaId) => this.getAreaDisplay(areaId))}`
    }

    static styles = [sharedStyles, styles];

    render() {
        if (this.isInitialized()) {
            return html`${this.getAreaDisplays()}`
        }
    }

}

customElements.define("floor-panel", FloorPanel);