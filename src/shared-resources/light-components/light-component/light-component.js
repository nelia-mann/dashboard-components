import { html } from 'lit';
import { getBrightness, getColorModes } from '../util/light-util.js';
import { HaSubComponent } from '../../base-classes/ha-subcomponent.js';
import styles from './light.styles.js';
import sharedStyles from '../../styles/shared-styles.js';
import '../simple-light/simple-light.js';
import '../../../lighting-card/popout-window/popout-window.js';

export class LightComponent extends HaSubComponent {

    _HOLD_DURATION = 500;

    static properties = {
        ...super.properties,
        isModalOpen: { state: true },
    }

    constructor() {
        super();
        this.isModalOpen = false;
        this.lightId = '';
        this.themeId = '';
        this._holding = false;
    }

    getTriggers() {
        return ["isModalOpen"];
    }

    /********************** getter and setter logic ********************************************/

    isHolding() {
        return this._holding;
    }

    raiseHold() {
        this._holding = false;
    }

    lowerHold() {
        this._holding = true;
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

    getLightIds() {
        return Object.keys(this.getStructure());
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

    /********************************* interactive logic **********************************/

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