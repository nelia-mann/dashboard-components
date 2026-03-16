import { html } from 'lit';
import { repeat } from 'lit-html/directives/repeat.js';
import { HaMainComponent } from '../../shared-resources/base-classes/ha-main-component.js';
import {
    getState,
    hasLightChanges,
    getEntityIdsWithLabel,
    filterEntityIdsForLabel,
    addAreaStructure,
    isSoloLight,
    addLightStructure
} from '../../shared-resources/util/hass-util.js';
import styles from './main.styles.js';
import layoutStyles from './layout-styles.js';
import sharedStyles from '../../shared-resources/styles/shared-styles.js';
import '../lighting/lighting.js';


export class BasementKioskCard extends HaMainComponent {

    _LABEL = "basement_kiosk";
    _LIGHTLABELS = {
        basic_lighting: "basic lighting",
        leds: "LED Lighting"
    };
    _OPTIONLABELS = { lighting: "lighting" };

    static properties = {
        ...super.properties,
        _option: { state: true },
    }

    constructor() {
        super();
        this._option = "lighting";
    }

    /******************************* lifecycle *****************************/

    hasChanges(oldHass, newHass, entityId) {
        return hasLightChanges(oldHass, newHass, entityId);
    }

    getTriggers() {
        return ["_option"]
    }

    /******************************* Setting Structures ***********************/

    setOption(option) {
        this._option = option;
    }

    setStructures() {
        this.setEntityIds();
        this.setStates();
        this.setOptionStructure();
        this.setLightingStructure();
    }

    setEntityIds() {
        const entityIds = getEntityIdsWithLabel(this.getHass(), this.getLabel());
        this.entityIds = entityIds;
    }

    setStates() {
        let states = {};
        this.getEntityIds().forEach((entityId) => {
            states[entityId] = getState(this.getHass(), entityId);
        })
        this.states = states;
    }

    setOptionStructure() {
        const entityIds = this.getEntityIds()
        this.getOptions().forEach((option) => {
            const filteredIds = filterEntityIdsForLabel(this.getHass(), entityIds, option)
            this.structure[option] = {name: this.getOptionName(option), structure: {}, entityIds: filteredIds};
        })
        const lightingIds = [...this.getLightingIds()];
        const soloLightIds = lightingIds.filter((entityId) => isSoloLight(this.getHass(), entityId));
        this.structure.lighting.soloLightIds = new Set(soloLightIds);
    }

    setLightingStructure() {
        this.setLightingOuterStructure();
        this.setBasicLightingAreaStructure();
        this.setBasicLightingLightStructure();
        this.setLEDLightStructure();
    }

    setLightingOuterStructure() {
        let structure = {};
        const entityIds = this.getLightingIds();
        Object.entries(this.getLightLabels()).forEach(([labelId, label]) => {
            const subIds = filterEntityIdsForLabel(this.getHass(), entityIds, labelId);
            structure[labelId] = {
                name: label,
                structure: {},
                entityIds: subIds,
            };
        })
        this.structure["lighting"].structure = structure;
    }

    setBasicLightingAreaStructure() {
        const basicLightingStructure = this.getBasicLightingDict().structure;
        const basicLightingIds = this.getBasicLightingDict().entityIds;
        addAreaStructure(this.getHass(), basicLightingStructure, basicLightingIds);
    }

    setBasicLightingLightStructure() {
        const basicLightingStructure = this.getBasicLightingDict().structure;
        Object.values(basicLightingStructure).forEach((areaDict) => {
            addLightStructure(this.getHass(), areaDict);
        })
    }

    setLEDLightStructure() {
        addLightStructure(this.getHass(), this.getLEDDict());
    }

    /***************************** getter logic ***************************/

    getOptions() {
        return Object.keys(this._OPTIONLABELS);
    }

    getOption() {
        return this._option;
    }

    isOption(option) {
        return this.getOption() === option;
    }

    getLabel() {
        return this._LABEL;
    }

    getLightLabels() {
        return this._LIGHTLABELS;
    }

    getOptionName(option) {
        return this._OPTIONLABELS[option];
    }

    getLightingDict() {
        return this.getStructure().lighting;
    }

    getLightingIds() {
        return this.getLightingDict().entityIds;
    }

    getLightingStructure() {
        return this.getLightingDict().structure;
    }

    getLightingEntityIds() {
        return this.getLightingDict().entityIds;
    }

    getBasicLightingDict() {
        return this.getLightingStructure().basic_lighting;
    }

    getLEDDict() {
        return this.getLightingStructure().leds;
    }

    getSoloLightIds() {
        return this.getLightingDict().soloLightIds
    }


    /************************** interactive logic ***************************/

    onClick(option) {
        this.setOption(option);
    }

    /******************************* html/style logic ************************/

    button(option) {
        switch (option) {
            case "lighting":
                return this.lightingButton();
        }
    }

    lightingButton() {
        return html`
            <lighting-button
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .isSelected = ${this.isOption("lighting")}
                .entityIds = ${this.getSoloLightIds()}
                .title = ${"lighting"}
                @select = ${() => this.onClick("lighting")}
            ></lighting-button>
        `
    }

    buttonRow() {
        return html`
            <div class="button-row">
                ${repeat(this.getOptions(), (option) => option, option => this.button(option))}
            </div>
        `
    }

    lightingPanel() {
        return html`
            <lighting-panel
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .structure = ${this.getLightingStructure()}
                .entityIds = ${this.getLightingEntityIds()}
                .callService=${this._hass.callService}
            ></lighting-panel>
        `
    }

    content() {
        switch (this._option) {
            case "lighting":
                return this.lightingPanel();
        }
    }

    static styles = [styles, layoutStyles, sharedStyles];

    render() {
        if (this.isInitialized()) {
            return html`
                <ha-card>
                    <div class="content">${this.content()}</div>
                    ${this.buttonRow()}
                </ha-card>
            `;
        }
    }

    getCardSize() {
        return 10;
    }

    getGridOptions() {
        return {
            rows: 10,
            columns: 27,
            min_rows: 10,
            max_rows: 10
        }
    }

}