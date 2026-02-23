import { html, LitElement } from 'lit';
import { repeat } from 'lit-html/directives/repeat.js';
import styles from './floor.styles.js';
import sharedStyles from '../../shared-resources/styles/shared-styles.js';
import '../area-panel/area-panel.js';

export class FloorPanel extends LitElement {

    structure = {};
    entityIds = [];

    static get properties() {
        return {
            changedEntityIds: { state: true },
            states: { state: true },
            _initialized: { state: true }
        }
    }

    constructor() {
        super();
        this.changedEntityIds = new Set();
        this.states = {};
        this._initialized = false;
    }

    /******************************** lifecycle ***********************************/

    update(changedProps) {
        super.update(changedProps);
    }

    shouldUpdate(changedProps) {
        return (!this.isInitialized()
            || this.hasRelevantChanges()
            || changedProps.has("_initialized"))
    }

    firstUpdated() {
        this.initialize();
    }

    hasRelevantChanges() {
        return this.getEntityIds().some((entityId) => (this.getCEIs().has(entityId)))
    }

    /******************************* getter and setter logic ***********************/

    isInitialized() {
        return this._initialized;
    }

    initialize() {
        this._initialized = true;
    }

    getCEIs() {
        return this.changedEntityIds;
    }

    getStates() {
        return this.states;
    }

    getEntityIds() {
        return this.entityIds;
    }

    getStructure() {
        return this.structure;
    }

    getAreaName(areaId) {
        return this.getStructure()[areaId].name;
    }

    getSubStructure(areaId) {
        return this.getStructure()[areaId].structure;
    }

    getSubEIs(areaId) {
        return this.getStructure()[areaId].entityIds;
    }

    /******************************* interactive logic *****************************/

    /******************************* html/style logic ******************************/

    getAreaDisplay(areaId) {
        return html`
            <area-panel
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .name = ${this.getAreaName(areaId)}
                .structure = ${this.getSubStructure(areaId)}
                .entityIds = ${[...this.getSubEIs(areaId)]}
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