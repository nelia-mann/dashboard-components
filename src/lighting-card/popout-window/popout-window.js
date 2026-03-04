import { html } from 'lit';
import { getName } from '../../shared-resources/util/state-util.js';
import { closeCircleOutline } from '../../shared-resources/util/mdi-util.js';
import { HaSubComponent } from '../../shared-resources/base-classes/ha-subcomponent.js';
import styles from './popout.styles.js';
import sharedStyles from '../../shared-resources/styles/shared-styles.js';
import '../../shared-resources/light-components/light-group-control/light-group-control.js';

export class PopoutWindow extends HaSubComponent {

    static properties = {
        ...super.properties,
        opened: { type: Boolean, reflect: true }
    }

    constructor() {
        super();
        this.lightId = '';
        this.themeId = '';
    }

    /******************************* lifecycle **********************************/

    getTriggers() {
        return ["opened"];
    }

    updated(changedProps) {
        if (changedProps.has('opened')) {
            const dialog = this.shadowRoot.querySelector('dialog');
            (this.isOpen()) ? (dialog.showModal()) : (dialog.close());
        }
    }

    /************************ getter and setter logic *************************/

    getState(entityId) {
        return this.getStates()[entityId];
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
                    <div class="large-heading">${name} NEW6 </div>
                    <div class="icon" @click="${this.closeModal}">
                        <ha-svg-icon .path=${closeCircleOutline}"></ha-svg-icon>
                    </div>
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