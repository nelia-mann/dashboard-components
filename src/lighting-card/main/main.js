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
} from '../../shared-resources/util/hass-util.js';

export class LightingCard extends LitElement {

    _hass;
    structure = {};
    entityIds = [];
    _ready = false;
    _structuresBuilt = false;
    _changedEntities = false;
    _needsRender = false;
    changedEntityIds = new Set();

    static get properties() {
        return {
            _floorId: { state: true },
            states: { state: true }
        };
    }

    setConfig() {
    }

    set hass(hass) {
        const oldHass = this._hass;
        this._hass = hass;
        if (!oldHass) {
            this._changedEntities = true;
            this._needsRender = true;
            this.requestUpdate();
            return;
        }

        this._changedEntities = this.detectStateChanges(oldHass, hass);
        if (this._changedEntities) {
            this._needsRender = true;
            this.requestUpdate();
        }
    }

    update(changedProps) {
        if (!this._structuresBuilt && this._hass) {
            this.setStructures();
            this._structuresBuilt = true;
            this._needsRender = true;
        }

        if (this._changedEntities) {
            this.updateStates();
            this._changedEntities = false;
        }
        this._ready = this._structuresBuilt && !!this.entityIds.length > 0 && this.entityIds.every(id => this.states[id]);
        super.update(changedProps);
        this.changedEntityIds = new Set();
        this._needsRender = false;
    }

    shouldUpdate(changedProps) {
        return (this._needsRender
            || !this._structuresBuilt
            || changedProps.has("_floorId") > 0);
    }

    detectStateChanges(oldHass, newHass) {
        this.changedEntityIds = new Set();

        for (const id of this.entityIds ?? []) {
            const oldState = oldHass.states[id];
            const newState = newHass.states[id];

            if (!oldState || !newState) continue;

            if (
                oldState.state !== newState.state ||
                oldState.attributes.brightness !== newState.attributes.brightness ||
                oldState.attributes.rgb_color !== newState.attributes.rgb_color
            ) {
                this.changedEntityIds.add(id);
            }

        }
        return this.changedEntityIds.size > 0;
    }

    updateStates() {
        const changedIds = this.changedEntityIds;
        changedIds.forEach((entityId) => {
            this.states[entityId] = this._hass.states[entityId]
        })
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
        if (this._ready) {
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