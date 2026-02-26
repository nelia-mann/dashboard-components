import { html, LitElement } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { repeat } from 'lit-html/directives/repeat.js';
import { rgba } from './../shared-resources/util/color-util.js';
import {
    getState,
    hasLightChanges,
    hasThemeChanges,
    getEntityIdsWithLabel,
    filterEntityIdsForLabel,
    addAreaStructure,
    isSoloLight,
    addLightStructure
} from './../shared-resources/util/hass-util.js';
import styles from './main.styles.js';
import sharedStyles from '../shared-resources/styles/shared-styles.js';


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

    getBasicLightingDict() {
        return this.getLightingStructure().basic_lighting;
    }

    getLEDDict() {
        return this.getLightingStructure().leds;
    }

    /************************** interactive logic ***************************/

    onClick(option) {
        this.setOption(option);
    }

    /******************************* html/style logic ************************/

    getButtonStyle(option) {
        const rgb = [100, 100, 100]; // placeholder for fancy coloring choice
        let styles = {
            'background-color': rgba(rgb, .5)
        }
        if (this.isOption(option)) {
            styles['outline'] = `solid ${rgba(rgb, 1)}`;
            styles['outline-offset'] = '-4px';
        }
        return styles;
    }

    button(option) {
        return html`<div
            class="button outlined"
            @click=${() => this.onClick(option)}
            style=${styleMap(this.getButtonStyle(option))}
        >
            <div class="small-heading"> ${this.getOptionName(option)} </div>
            <div class="sub-info"> sub-info </div>
        </div>`
    }

    buttonRow() {
        return html`
            <div class="button-row">
                ${repeat(this.getOptions(), (option) => option, option => this.button(option))}
            </div>
        `
    }

    content() {
        let panel = html``;
        switch (this._option) {
            case "lighting":
                panel = html`<div> Lighting Placeholder </div>`;
                break;
            case "climate":
                panel = html`<div> Climate Placeholder </div>`;
                break;
        }
        return panel;
    }

    static styles = [styles, sharedStyles];

    // return html
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

    // set card size parameters for ha
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