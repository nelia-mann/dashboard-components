import { html, LitElement } from 'lit';
import { repeat } from 'lit-html/directives/repeat.js';
import { getName } from '../../util/state-util.js';
import { isIntersection } from '../../util/logic-util.js';
import styles from './light.styles.js';
import sharedStyles from '../../styles/shared-styles.js';
import '../../light-components/light-icon/light-icon.js';

export class SimpleLight extends LitElement {

    lightId;
    structure = {};
    entityIds = new Set();

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

    /************************************* lifecycle **********************************/

    shouldUpdate(changedProps) {
        return (!this.isInitialized()
            || this.hasRelevantChanges()
            || changedProps.has("_initialized"))
    }

    firstUpdated() {
        this.initialize();
    }

    hasRelevantChanges() {
        return isIntersection(this.getCEIs(), this.getEntityIds());
    }

    /********************************** getter and setter logic *****************************/

    isInitialized() {
        return this._initialized;
    }

    initialize() {
        this._initialized = true;
    }

    getCEIs() {
        return this.changedEntityIds
    }

    getStates() {
        return this.states;
    }

    getLightState(lightId) {
        return this.getStates()[lightId];
    }

    getMainId() {
        return this.lightId;
    }

    getMainState() {
        return this.getLightState(this.getMainId());
    }

    getStructure() {
        return this.structure;
    }

    getLightIds() {
        return Object.keys(this.getStructure());
    }

    getEntityIds() {
        return this.entityIds;
    }

    /********************************** interactive logic ***********************************/

    onClick() {
        if (this.callService) {
            const data = { entity_id: this.getMainId() };
            this.callService('light', 'toggle', data)
        }
    }

    /************************************ style/html logic **********************************/

    icons() {
        let result;
        let lightIds = this.getLightIds();
        (lightIds.length === 0) && (lightIds = [this.getMainId()])
        result = repeat(lightIds, (lightId) => lightId, (lightId) => {
            return html`<light-icon
                    .changedEntityIds=${this.getCEIs()}
                    .lightState=${this.getLightState(lightId)}
                ></light-icon>`
        })
        return result;
    }

    static styles = [sharedStyles, styles];

    render() {
        if (this.isInitialized()) {
            return html`
                <div class="light-element sub-info" @click=${this.onClick}>
                    <div class="icons">
                        ${this.icons()}
                    </div>
                    ${getName(this.getMainState())}
                </div>
            `
        }
    }

}

customElements.define("simple-light", SimpleLight);