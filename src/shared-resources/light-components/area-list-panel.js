import { html, css } from 'lit';
import { repeat } from 'lit-html/directives/repeat.js';
import { HaSubComponent } from '../base-classes/ha-subcomponent.js';
import sharedStyles from '../styles/shared-styles.js';
import './area-panel.js';

export class AreaListPanel extends HaSubComponent {

    getAreaName(areaId) {
        return this.getStructure()[areaId].name;
    }

    getSubStructure(areaId) {
        return this.getStructure()[areaId].structure;
    }

    getSubEIs(areaId) {
        return this.getStructure()[areaId].entityIds;
    }

    /********************************************** html logic **********************************************************/

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
        const areaIds = Object.keys(this.getStructure()).sort();
        return html`${repeat(areaIds, (areaId) => areaId, (areaId) => this.getAreaDisplay(areaId))}`
    }

    render() {
        if (this.isInitialized()) {
            return html`${this.getAreaDisplays()}`
        }
    }

    /********************************************** style logic *********************************************************/

    static styles = [sharedStyles, css`

    :host {
        height: var(--floor-panel-height, 400px);
        display: flex;
        flex-flow: var(--floor-panel-flex-flow, column wrap);
        justify-content: var(--floor-panel-justify-content, flex-start);
        align-items: var(--floor-panel-align-items, flex-start);
    }

`];


}

customElements.define("area-list-panel", AreaListPanel);
