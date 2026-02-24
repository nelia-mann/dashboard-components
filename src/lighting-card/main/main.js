import { html, LitElement } from 'lit';
import { keyed } from 'lit/directives/keyed.js';
import { repeat } from 'lit-html/directives/repeat.js';
import styles from './main.styles.js';
import sharedStyles from '../../shared-resources/styles/shared-styles.js';
import "../floor-panel/floor-panel.js";
import "../../shared-resources/light-components/light-button/light-button.js";
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

    set hass(hass) {
        if (!this.isInitialized()) {
            this.setHass(hass);
            this.setStructures();
            (this.shouldInitialize()) && (this.initialize());
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

    addRelevantChanges(oldHass, newHass) {
        this.changedEntityIds = new Set();
        const entityIds = this.entityIds;
        entityIds.forEach((entityId) => {
            const oldState = oldHass.states[entityId];
            const newState = newHass.states[entityId];
            if (
                (oldState.state !== newState.state)
                || (oldState.attributes.brightness !== newState.attributes.brightness)
                || (oldState.attributes.hs_color !== newState.attributes.hs_color)
            ) {
                this.changedEntityIds.add(entityId)
            };
        })
    }

    hasRelevantChanges() {
        return this.changedEntityIds.size > 0;
    }

    updateStates() {
        const changedIds = this.changedEntityIds;
        changedIds.forEach((entityId) => {
            this.states[entityId] = this._hass.states[entityId]
        })
    }

    setHass(hass) {
        this._hass = hass;
    }

    isInitialized() {
        return this._initialized;
    }

    initialize() {
        this._initialized = true;
    }

    shouldInitialize() {
        let should = true;
        (this.entityIds.length === 0) && (should = false)
        const stateKeys = Object.keys(this.states);
        this.entityIds.forEach((entityId) => {
            if (!stateKeys.includes(entityId)) {
                should = false;
            }
        })
        return should;
    }

/************************************* Getting and Setting Structure **********************/

    setStructures() {
        this.setEntityIds();
        this.setStates();
        this.setFloorStructure();
        this.setAreaStructure();
        this.setLightIdStructure();
        this.cleanStructure();
        this.initializeFloor();
    }

    getStructure() {
        return this.structure;
    }

    /************* states and entityIds ***************/

    getHass() {
        return this._hass;
    }

    setEntityIds() {
        const lightIds = getLightIds(this.getHass());
        const themeIds = getThemeIds(this.getHass());
        this.entityIds = [...lightIds, ...themeIds];
    }

    setStates() {
        let states = {};
        this.entityIds.forEach((entityId) => {
            states[entityId] = getState(this.getHass(), entityId);
        })
        this.states = states;
    }

    /********************************* Floor Structure ******************************/

    setFloorStructure() {
        addFloorStructure(this.getHass(), this.getStructure())
    }

    getFloorStructure(floorId) {
        return this.structure[floorId].structure;
    }

    getFloorName(floorId) {
        return this.structure[floorId].name;
    }

    /********************************* Area Structure **************************************/

    setAreaStructure() {
        Object.entries(this.structure).forEach(([floorId, floorDictionary]) => {
            let floorStructure = floorDictionary.structure;
            addAreaStructure(this.getHass(), floorStructure, floorId)
        })
    }

    /******************************* Light Structure ****************************************/

    setLightIdStructure() {
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

    /************************* Floor Selection Structure ***********************************************/

    getFloorId() {
        return this._floorId
    }

    setFloorId(floorId) {
        this._floorId = floorId;
    }

    // determines if the given floor id corresponds to the currently selected floor.
    isFloor(floorId) {
        return this.getFloorId() === floorId;
    }

    // sets the current floor to be the first of the listed floors.
    initializeFloor() {
        const structure = this.structure;
        const floorIds = Object.keys(structure);
        this.setFloorId(floorIds[0]);
    }

    getFloorStructure() {
        return this.structure[this.getFloorId()].structure;
    }

    getFloorEntityIds() {
        return this.structure[this.getFloorId()].entityIds;
    }

    // deals with click to select floor.
    onClick(floorId) {
        this.setFloorId(floorId);
    }

    /************************* style and html ***********************************/

    floorButton(floorId) {
        return html`
            <lighting-button
                .changedEntityIds = ${this.changedEntityIds}
                .states = ${this.states}
                .isSelected = ${this.isFloor(floorId)}
                .lightIds = ${[...this.structure[floorId].soloLightIds]}
                .title = ${this.structure[floorId].name}
                @select = ${() => this.onClick(floorId)}
            ></lighting-button>
        `
    }

    // generates the list of floor buttons.
    floorButtons() {
        const floorIds = Object.keys(this.structure);
        return repeat(floorIds, (floorId) => floorId, floorId => this.floorButton(floorId));
    }

    // generates panel content, based on currently selected floor.
    content() {
        return keyed(this.getFloorId(), html`
            <floor-panel
                .changedEntityIds = ${this.changedEntityIds}
                .states = ${this.states}
                .structure = ${this.getFloorStructure()}
                .entityIds = ${[... this.getFloorEntityIds()]}
                .callService=${this._hass.callService}
            ></floor-panel>
        `);
    }

    // pull styles
    static styles = [sharedStyles, styles];

    // return html
    render() {
        console.log("attempt")
        if (this.isInitialized()) {
            console.log("ping");
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