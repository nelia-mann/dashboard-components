import { html, LitElement } from 'lit';
import { repeat } from 'lit-html/directives/repeat.js';
import { isIntersection } from '../../shared-resources/util/logic-util.js';
import styles from './area.styles.js';
import sharedStyles from '../../shared-resources/styles/shared-styles.js';
import '../light-component/light-component.js';

export class AreaPanel extends LitElement {

    name;
    structure = {};
    entityIds = new Set();

    static get properties() {
        return {
            changedEntityIds: { state: true },
            states: { state: true },
            _initialized: { state: true}
        }
    }

    constructor() {
        super();
        this.changedEntityIds = new Set();
        this.states = {};
        this._initialized = false;
    }

    /*************************************** lifecycle **************************************/

    shouldUpdate(changedProps) {
        return (!this.isInitialized())
            || this.hasRelevantChanges()
            || changedProps.has("_initialized")
    }

    firstUpdated() {
        this.initialize();
    }

    hasRelevantChanges() {
        return isIntersection(this.getCEIs(), this.getEntityIds());
    }

    /******************************* getter and setter logic *******************************/

    isInitialized() {
        return this._initialized;
    }

    initialize() {
        this._initialized = true;
    }

    getAreaName() {
        return this.name;
    }

    getCEIs() {
        return this.changedEntityIds;
    }

    getEntityIds() {
        return this.entityIds;
    }

    getStructure() {
        return this.structure;
    }

    getStates() {
        return this.states;
    }

    getSubStructure(lightId) {
        return this.getStructure()[lightId].structure;
    }

    getSubEIs(lightId) {
        return this.getStructure()[lightId].entityIds;
    }

    getThemeId(lightId) {
        return this.getStructure()[lightId].theme;
    }

    /************************************* interactive logic *******************************/

    /************************************* html/style logic ********************************/

    getLightDisplay(lightId) {
        return html`
            <light-component
                class="outlined"
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .lightId = ${lightId}
                .themeId = ${this.getThemeId(lightId)}
                .structure = ${this.getSubStructure(lightId)}
                .entityIds = ${this.getSubEIs(lightId)}
                .callService=${this.callService}
            ></light-component>
        `
    }

    static styles = [sharedStyles, styles];

    render() {
        if (this.isInitialized()) {
            const lightIds = Object.keys(this.getStructure());
            return html`
                <div class="small-heading">${this.getAreaName()}</div>
                ${repeat(lightIds, (lightId) => lightId, lightId => this.getLightDisplay(lightId))}
            `
        }
    }
}

customElements.define("area-panel", AreaPanel);