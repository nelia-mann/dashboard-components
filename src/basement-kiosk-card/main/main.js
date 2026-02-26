import { html, LitElement } from 'lit';
import { repeat } from 'lit-html/directives/repeat.js';
import {
    getState,
    hasLightChanges,
    hasThemeChanges,
    getEntityIdsWithLabel,
    filterEntityIdsForLabel,
    addAreaStructure,
    isSoloLight,
    addLightStructure
} from '../../shared-resources/util/hass-util.js';
import styles from './main.styles.js';
import sharedStyles from '../../shared-resources/styles/shared-styles.js';
import '../lighting/lighting.js';


export class BasementKioskCard extends LitElement {

    _LABEL = "basement_kiosk";
    _LIGHTLABELS = {
        basic_lighting: "basic lighting",
        leds: "LED Lighting"
    };
    _OPTIONLABELS = { lighting: "lighting" };

    _hass = {};
    entityIds = [];
    structure = {};
    changedEntityIds = new Set();

    // internal reactive states
    static get properties() {
        return {
            states: { state: true },
            _option: { state: true },
            _isInitialized: { state: true}
        };
    }

    constructor() {
        super();
        this.states = {};
        this._option = "lighting";
        this._isInitialized = false;
    }

    // establish config information for card
    setConfig() {
    }

    /******************************* lifecycle *****************************/

    set hass(hass) {
        if (!this.isInitialized()) {
            this.setHass(hass);
            this.setStructures();
            this.initialize();
        } else {
            const oldHass = this.getHass(hass);
            this.setHass(hass);
            this.addRelevantChanges(oldHass, this.getHass());
            this.requestUpdate();
        }
    }

    update(changedProps) {
        (this.hasRelevantChanges()) && (this.updateStates())
        super.update(changedProps);
    }

    shouldUpdate(changedProps) {
        return (!this.isInitialized()
            || this.hasRelevantChanges()
            || changedProps.has("_isInitialized")
            || changedProps.has("_option"));
    }

    hasChanges(oldHass, newHass, entityId) {
        return (hasThemeChanges(oldHass, newHass, entityId)
            || hasLightChanges(oldHass, newHass, entityId));
    }

    addRelevantChanges(oldHass, newHass) {
        this.changedEntityIds = new Set();
        const entityIds = this.getEntityIds();
        entityIds.forEach((entityId) => {
            if (this.hasChanges(oldHass, newHass, entityId)) {
                this.changedEntityIds.add(entityId)
            };
        })
    }

    hasRelevantChanges() {
        return this.getCEIs().size > 0;
    }

    updateStates() {
        const changedIds = this.getCEIs();
        changedIds.forEach((entityId) => {
            this.states[entityId] = this.getHass().states[entityId]
        })
    }

    /******************************* Setting Structures ***********************/

    initialize() {
        this._initialized = true;
    }

    setHass(hass) {
        this._hass = hass;
    }

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
        addAreaStructure(this.getHass(), this.getBasicLightingDict())
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

    isInitialized() {
        return this._initialized;
    }

    getHass() {
        return this._hass;
    }

    getOptions() {
        return Object.keys(this._OPTIONLABELS);
    }

    getOption() {
        return this._option;
    }

    getStructure() {
        return this.structure;
    }

    getEntityIds() {
        return this.entityIds;
    }

    isOption(option) {
        return this.getOption() === option;
    }

    getCEIs() {
        return this.changedEntityIds;
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

    getStates() {
        return this.states;
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

    static styles = [styles, sharedStyles];

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
        return 8;
    }

    getGridOptions() {
        return {
            rows: 9,
            columns: 24,
            min_rows: 9,
            max_rows: 9
        }
    }

}