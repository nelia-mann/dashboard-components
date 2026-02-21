import { html, LitElement } from 'lit';
import { mdiCloseCircleOutline } from '@mdi/js';
import styles from './popout.styles.js';
import sharedStyles from '../../shared-resources/styles/shared-styles.js';
import '../../shared-resources/light-components/light-control/light-control.js';
import '../../shared-resources/light-components/light-group-control/light-group-control.js';
import { getName } from '../../shared-resources/util/state-util.js';

export class PopoutWindow extends LitElement {

    lightId;
    themeId;
    structure = {};
    entityIds = [];

    static get properties() {
        return {
            opened: { type: Boolean, reflect: true },
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

    /******************************* lifecycle **********************************/

    update(changedProps) {
        super.update(changedProps);
    }

    shouldUpdate(changedProps) {
        return (!this.isInitialized()
            || this.hasRelevantChanges()
            || changedProps.has("opened")
            || changedProps.has("_initialized"))
    }

    firstUpdated() {
        this.initialize();
    }

    // Lifecycle method to open/close the native dialog
    updated(changedProperties) {
        if (changedProperties.has('opened')) {
        const dialog = this.shadowRoot.querySelector('dialog');
        if (this.isOpen()) {
            dialog.showModal(); // Opens the dialog modally, disabling content behind it
        } else {
            dialog.close();
        }
        }
    }

    hasRelevantChanges() {
        return this.getEntityIds().some((entityId) => (this.getCEIs().has(entityId)))
    }

    /************************ getter and setter logic *************************/

    isInitialized() {
        return this._initialized;
    }

    initialize() {
        this._initialized = true;
    }

    getStates() {
        return this.states;
    }

    getState(entityId) {
        return this.getStates()[entityId];
    }

    getStructure() {
        return this.structure;
    }

    getCEIs() {
        return this.changedEntityIds;
    }

    getMainId() {
        return this.lightId;
    }

    getThemeId() {
        return this.themeId;
    }

    isOpen() {
        return this.opened;
    }

    closeOpen() {
        this.opened = false;
    }

    getEntityIds() {
        return this.entityIds;
    }


    /************************ interactive logic *******************************/

    closeModal() {
        this.closeOpen();
        this.dispatchEvent(new CustomEvent('modal-closed'));
    }

    handleClose() {
        if (this.isOpen()) {
            this.closeModal();
        }
    }

    /**************************** style/html logic ******************************/

    contents() {
        if (this.isOpen()) {
            const name = getName(this.getState(this.getMainId()));
            return html`
                <div class="modal-header">
                    <div></div>
                    <div class="large-heading">${name}</div>
                    <button class="close-button" @click="${this.closeModal}" aria-label="Close modal">
                        <ha-svg-icon .path=${mdiCloseCircleOutline}"></ha-svg-icon>
                    </button>
                </div>
                <light-group-control
                    .changedEntityIds = ${this.getCEIs()}
                    .states = ${this.getStates()}
                    .lightId = ${this.getMainId()}
                    .themeId = ${this.getThemeId()}
                    .structure = ${this.getStructure()}
                    .entityIds = ${this.getEntityIds()}
                    .callService=${this.callService}
                ></light-group-control>
            `
        }
    }

    static styles = [sharedStyles, styles];

    render() {
        if (this.isInitialized()) {
            return html`
                <dialog class="outlined" @close="${this.handleClose}">
                    ${this.contents()}
                </dialog>
                `;
        }
    }





}

customElements.define("popout-window", PopoutWindow);