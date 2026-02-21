import { html, LitElement } from 'lit';
import '../../shared-resources/light-components/simple-light/simple-light.js';
import './../popout-window/popout-window.js';
import styles from './light.styles.js';
import sharedStyles from '../../shared-resources/styles/shared-styles.js';
import { getBrightness, getColorModes } from '../../shared-resources/light-components/util/light-util.js';

export class LightComponent extends LitElement {

    _HOLD_DURATION = 500;

    lightId;
    themeId;
    structure = {};
    entityIds = [];
    _holding = false;

    static get properties() {
        return {
            changedEntityIds: { state: true },
            states: { state: true },
            isModalOpen: { type: Boolean },
            _initialized: { state: true }
        }
    }

    constructor() {
        super();
        this.changedEntityIds = new Set();
        this.states = {};
        this.isModalOpen = false;
        this._initialized = false;
    }

    /************************************* lifecycle **********************************/

    update(changedProps) {
        super.update(changedProps);
    }

    shouldUpdate(changedProps) {
        return (!this.isInitialized()
            || this.hasRelevantChanges()
            || changedProps.has("isModalOpen")
            || changedProps.has("_initialized"))
    }

    firstUpdated() {
        this.initialize();
    }

    hasRelevantChanges() {
        return this.getEntityIds().some((entityId) => (this.getCEIs().has(entityId)))
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

    isHolding() {
        return this._holding;
    }

    raiseHold() {
        this._holding = false;
    }

    lowerHold() {
        this._holding = true;
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

    getThemeId() {
        return this.themeId;
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

    openModal() {
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
    }

    getDuration() {
        return this._HOLD_DURATION;
    }

    /********************************** interactive logic ***********************************/

    onDown() {
        this.lowerHold();
        setTimeout(() => { this.onHold() }, this.getDuration());
    }

    onUp() {
        this.raiseHold();
    }

    onHold() {
        if (this.isHolding()) {
            this.openModal();
        }
        else {
            this.onClick();
        }
    }

    handleModalClosed() {
        this.closeModal();
    }

    onClick() {
        const data = { entity_id: this.getMainId() };
        this.callService('light', 'toggle', data)
    }

    /************************************ style/html logic **********************************/

    hasOptions() {
        if (this.getStructure().theme
            || this.getLightIds().length > 0
            || getColorModes(this.getMainState()).includes("hs_color")
            || getColorModes(this.getMainState()).includes("color_temp")
            || getBrightness(this.getMainState()) !== undefined
        ) {
            return true;
        } else {
            return false;
        }
    }

    simpleLight() {
        return html`
            <simple-light
                .changedEntityIds=${this.getCEIs()}
                .states=${this.getStates()}
                .lightId=${this.getMainId()}
                .structure=${this.getStructure()}
                .entityIds=${this.getEntityIds()}
                @pointerup=${this.onUp}
                @pointerdown=${this.onDown}
            >
        `
    }

    popoutWindow() {
        if (this.hasOptions()) {
            return html`
                <popout-window
                    ?opened=${this.isModalOpen}
                    .changedEntityIds = ${this.getCEIs()}
                    .states = ${this.getStates()}
                    .lightId = ${this.getMainId()}
                    .themeId = ${this.getThemeId()}
                    .structure = ${this.getStructure()}
                    .entityIds = ${this.getEntityIds()}
                    .callService=${this.callService}
                    @modal-closed=${this.handleModalClosed}
                ></popout-window>
            `
        }
    }

    static styles = [sharedStyles, styles];

    render() {
        if (this.isInitialized()) {
            return html`
                ${this.simpleLight()}
                ${this.popoutWindow()}
            `
        }
    }

}

customElements.define("light-component", LightComponent);