import { html, LitElement } from 'lit';
import { keyed } from 'lit/directives/keyed.js';
import { repeat } from 'lit-html/directives/repeat.js';
import {
    getState,
    getLightIds,
    getThemeIds,
    addFloorStructure,
    addAreaStructure,
    addLightStructure,
    isSoloLight,
    hasThemeChanges,
    hasLightChanges
} from '../../shared-resources/util/hass-util.js';
import styles from './main.styles.js';
import sharedStyles from '../../shared-resources/styles/shared-styles.js';
import "../floor-panel/floor-panel.js";
import "../../shared-resources/light-components/light-button/light-button.js";

export class LightingCard extends LitElement {

    _hass;
    structure = {};
    entityIds = [];
    changedEntityIds = new Set();

    static get properties() {
        return {
            states: { state: true },
            _floorId: { state: true },
            _isInitialized: { state: true },
        };
    }

    constructor() {
        super();
        this.states = {};
        this._isInitialized = false;
    }

    setConfig() {
    }

    /*************************** lifecycle **************************************/

    set hass(hass) {
        if (!this.isInitialized()) {
            this.setHass(hass);
            this.setStructures();
            this.initializeFloor();
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
            || changedProps.has("_floorId"));
    }

    hasChanges(oldHass, newHass, entityId) {
        return hasThemeChanges(oldHass, newHass, entityId) || hasLightChanges(oldHass, newHass, entityId);
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

/************************************* Setting Structures ****************************/

    initialize() {
        this._initialized = true;
    }

    setHass(hass) {
        this._hass = hass;
    }

    setFloorId(floorId) {
        this._floorId = floorId;
    }

    setStructures() {
        this.setEntityIds();
        this.setStates();
        this.setFloorStructure();
        this.setAreaStructure();
        this.setLightStructure();
        this.cleanStructure();
    }

    setEntityIds() {
        const lightIds = getLightIds(this.getHass());
        const themeIds = getThemeIds(this.getHass());
        this.entityIds = [...lightIds, ...themeIds];
    }

    setStates() {
        let states = {};
        this.getEntityIds().forEach((entityId) => {
            states[entityId] = getState(this.getHass(), entityId);
        })
        this.states = states;
    }

    setFloorStructure() {
        addFloorStructure(this.getHass(), this.getStructure())
    }

    setAreaStructure() {
        Object.entries(this.structure).forEach(([floorId, floorDictionary]) => {
            let floorStructure = floorDictionary.structure;
            addAreaStructure(this.getHass(), floorStructure, floorId)
        })
    }

    setLightStructure() {
        Object.values(this.structure).forEach((floorDict) => {
            let floorStructure = floorDict.structure;
            let floorEntityIds = [];
            Object.entries(floorStructure).forEach(([areaId, areaDict]) => {
                addLightStructure(this.getHass(), areaDict, areaId);
                floorEntityIds = [...floorEntityIds, ...areaDict.entityIds];
            })
            floorDict.entityIds = new Set(floorEntityIds);
            const soloLightIds = floorEntityIds.filter((entityId) => isSoloLight(this.getHass(), entityId));
            floorDict.soloLightIds = new Set(soloLightIds);
        })
    }

    cleanStructure() {
        Object.entries(this.structure).forEach(([floorId, floorDictionary]) => {
            let floorStructure = floorDictionary.structure;
            Object.entries(floorStructure).forEach(([areaId, areaDictionary]) => {
                const areaStructure = areaDictionary.structure;
                const areaKeys = Object.keys(areaStructure);
                if (areaKeys.length === 0) {
                    delete floorStructure[areaId];
                }
            })
            const floorKeys = Object.keys(floorStructure);
            if (floorKeys.length === 0) {
                delete this.structure[floorId]
            }
        })
    }

    initializeFloor() {
        const structure = this.getStructure();
        const floorIds = Object.keys(structure);
        this.setFloorId(floorIds[0]);
    }

    /************************* Floor Selection Structure ***********************************************/

    isInitialized() {
        return this._initialized;
    }

    getHass() {
        return this._hass;
    }

    getCEIs() {
        return this.changedEntityIds;
    }

    getStructure() {
        return this.structure;
    }

    getEntityIds() {
        return this.entityIds;
    }

    getStates() {
        return this.states;
    }

    getFloorStructure(floorId) {
        return this.getStructure()[floorId].structure;
    }

    getFloorName(floorId) {
        return this.getStructure()[floorId].name;
    }

    getSoloLightIds(floorId) {
        return this.getStructure()[floorId].soloLightIds;
    }

    getFloorId() {
        return this._floorId
    }

    isFloor(floorId) {
        return this.getFloorId() === floorId;
    }

    getThisFloorStructure() {
        return this.getFloorStructure(this.getFloorId());
    }

    getThisFloorEntityIds() {
        return this.structure[this.getFloorId()].entityIds;
    }

    /********************************* interactive logic **********************************/

    onClick(floorId) {
        this.setFloorId(floorId);
    }

    /************************* style and html ***********************************/

    floorButton(floorId) {
        return html`
            <lighting-button
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .isSelected = ${this.isFloor(floorId)}
                .lightIds = ${this.getSoloLightIds(floorId)}
                .title = ${this.getFloorName(floorId)}
                @select = ${() => this.onClick(floorId)}
            ></lighting-button>
        `
    }

    // generates the list of floor buttons.
    floorButtons() {
        const floorIds = Object.keys(this.getStructure());
        return repeat(floorIds, (floorId) => floorId, floorId => this.floorButton(floorId));
    }

    // generates panel content, based on currently selected floor.
    content() {
        return keyed(this.getFloorId(), html`
            <floor-panel
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .structure = ${this.getThisFloorStructure()}
                .entityIds = ${this.getThisFloorEntityIds()}
                .callService=${this._hass.callService}
            ></floor-panel>
        `);
    }

    // pull styles
    static styles = [sharedStyles, styles];

    // return html
    render() {
        if (this.isInitialized()) {
            return html`
                <ha-card>
                    ${this.content()}
                    <div class="button-row">
                        ${this.floorButtons()}
                    </div>
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
            rows: 8,
            columns: 24,
            min_rows: 8,
            max_rows: 8
        }
    }

}