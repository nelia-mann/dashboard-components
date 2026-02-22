import { html, LitElement } from 'lit';
import { keyed } from 'lit/directives/keyed.js';
import { repeat } from 'lit-html/directives/repeat.js';
import styles from './main.styles.js';
import sharedStyles from '../../shared-resources/styles/shared-styles.js';
import "../floor-panel/floor-panel.js";
import "../../shared-resources/light-components/light-button/light-button.js";
import { isGroup } from '../../shared-resources/util/state-util.js';

export class LightingCard extends LitElement {

    _hass;
    _structure = {};
    _entityIds = [];
    _ready = false;
    _structuresBuilt = false;
    _changedEntities = false;
    _needsRender = false;
    _changedEntityIds = new Set();

    static get properties() {
        return {
            _floorId: { state: true },
            _states: { state: true }
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
        this._ready = this._structuresBuilt && !!this._entityIds.length > 0 && this._entityIds.every(id => this._states[id]);
        super.update(changedProps);
        this._changedEntityIds = new Set();
        this._needsRender = false;
    }

    shouldUpdate(changedProps) {
        return (this._needsRender
            || !this._structuresBuilt
            || changedProps.has("_floorId") > 0);
    }

    detectStateChanges(oldHass, newHass) {
        this._changedEntityIds = new Set();

        for (const id of this._entityIds ?? []) {
            const oldState = oldHass.states[id];
            const newState = newHass.states[id];

            if (!oldState || !newState) continue;

            if (
                oldState.state !== newState.state ||
                oldState.attributes.brightness !== newState.attributes.brightness ||
                oldState.attributes.rgb_color !== newState.attributes.rgb_color
            ) {
                this._changedEntityIds.add(id);
            }

        }
        return this._changedEntityIds.size > 0;
    }

    /********************************* Floor Structure ******************************/

    // returns a dictionary of dictionaries.  The outer dictionary's keys are the floor_ids.
    // the inner dictionary has floor_id and name keys.
    getHassFloors() {
        return this._hass.floors;
    }

    // adds the outer dictionary structure (with floor_ids as keys) to this._lightBundles
    setFloorStructure() {
        this._structure = {};
        const floors = this.getHassFloors();
        Object.entries(floors).forEach(([floorId, floor]) => {
            const floorName = floor.name
            this._structure[floorId] = { name: floorName, structure: {} };
        })
    }

    getFloorStructure(floorId) {
        return this._structure[floorId].structure;
    }

    getFloorName(floorId) {
        return this._structure[floorId].name;
    }

    /********************************* Area Structure **************************************/

    getHassAreas() {
        return this._hass.areas;
    }

    // determines whether a given area_id corresponds to an area on a floor with a given floor id.
    isOnFloor(floorId, areaId) {
        const areas = this.getHassAreas();
        const area = areas[areaId];
        return (area.floor_id === floorId);
    }

    // adds the second dictionary structure (with area_ids as keys) to this._lightBundles
    setAreaStructure() {
        const areas = this.getHassAreas();
        Object.entries(this._structure).forEach(([floorId, floorDictionary]) => {
            let floorStructure = floorDictionary.structure;
            Object.entries(areas).forEach(([areaId, area]) => {
                const name = area.name;
                (this.isOnFloor(floorId, areaId)) && (floorStructure[areaId] = { name: name, structure: {}});
            })
        })
    }

    /******************************* Light Structure ****************************************/

    getHassEntities() {
        return this._hass.entities;
    }

    getHassStates() {
        return this._hass.states;
    }

    getEntity(entityId) {
        const entities = this.getHassEntities();
        return entities[entityId];
    }

    getState(entityId) {
        const states = this.getHassStates();
        return states[entityId];
    }

    // returns true if the entity_id corresponds to a light object and no label conradicts this.
    isLight(entityId) {
        const entity = this.getEntity(entityId);
        const notLight = entity.labels.includes('not_light');
        return (entityId.substring(0, 6) === "light.") && (!notLight);
    }

    getLightIds() {
        const entities = this.getHassEntities();
        const lightIds = Object.keys(entities).filter((entityId) => this.isLight(entityId));
        return lightIds;
    }

    // returns true if the entity_id corresponds to a theme select object
    isTheme(entityId) {
        return ((entityId.substring(0, 7) === "select.") && (entityId.includes("theme")))
    }

    getThemeIds() {
        const entities = this.getHassEntities();
        const themeIds = Object.keys(entities).filter((entityId) => this.isTheme(entityId));
        return themeIds;
    }

    getEntityArea(entityId) {
        const entity = this.getEntity(entityId);
        return entity.area_id;
    }

    // returns true if the provided entity_id has the given area_id, false otherwise.
    isInArea(entityId, areaId) {
        return (this.getEntityArea(entityId) === areaId);
    }

    // if the provided light entity_id corresponds to valid theme entity_id, returns the theme id.  Otherwise,
    // returns null,
    getThemeId(lightId) {
        const lightIdStub = lightId.substring(6);
        const themeIds = this.getThemeIds();
        let foundId = null;
        themeIds.forEach((themeId) => {
            (themeId.includes(lightIdStub)) && (foundId = themeId);
        })
        return foundId;
    }

    hasTheme(lightId) {
        return (this.getThemeId(lightId) != null);
    }

    setThemeStructure(lightId, lightDictionary) {
        const themeId = this.getThemeId(lightId);
        lightDictionary.theme = themeId;
        lightDictionary.entityIds.push(themeId);
    }

    getGroupIds() {
        const lightIds = this.getLightIds();
        const groupIds = lightIds.filter((lightId) => {
            const entity = this.getEntity(lightId);
            return (entity.platform === "group")
        })
        return groupIds
    }

    getMemberIds(groupId) {
        const state = this.getState(groupId);
        return state.attributes.entity_id;
    }

    getAllMemberIds() {
        let memberIds = [];
        const groupIds = this.getGroupIds();
        groupIds.forEach((groupId) => {
            memberIds = [...memberIds, ...this.getMemberIds(groupId)]
        });
        return memberIds;
    }

    isInAGroup(lightId) {
        const memberIds = this.getAllMemberIds();
        return memberIds.includes(lightId);
    }

    isAGroup(lightId) {
        const groupIds = this.getGroupIds();
        return groupIds.includes(lightId);
    }

    setGroupStructure(lightId, lightDictionary) {
        const memberIds = this.getMemberIds(lightId);
        let members = {};
        let entityIds = [];
        memberIds.forEach((memberId) => {
            let memberDictionary = { entityIds: [memberId] };
            (this.hasTheme(memberId)) && (this.setThemeStructure(memberId, memberDictionary));
            members[memberId] = memberDictionary;
            entityIds = [...entityIds, ... memberDictionary.entityIds]
        })
        lightDictionary.structure = members;
        lightDictionary.entityIds = [...lightDictionary.entityIds, ...entityIds];
    }

    isSoloLight(entityId) {
        return this.isLight(entityId) && !this.isAGroup(entityId);
    }

    setLightIdStructure() {
        const lightIds = this.getLightIds();
        Object.values(this._structure).forEach((floorDict) => {
            let floorStructure = floorDict.structure;
            let floorEntityIds = [];
            Object.entries(floorStructure).forEach(([areaId, areaDict]) => {
                let areaStructure = areaDict.structure;
                let areaEntityIds = [];
                lightIds.forEach((lightId) => {
                    if ((this.isInArea(lightId, areaId)) && (!this.isInAGroup(lightId))) {
                        let lightDictionary = { structure: {}, entityIds: [lightId] };
                        (this.hasTheme(lightId)) && (this.setThemeStructure(lightId, lightDictionary));
                        (this.isAGroup(lightId)) && (this.setGroupStructure(lightId, lightDictionary));
                        areaStructure[lightId] = lightDictionary;
                        areaEntityIds = [...areaEntityIds, ...lightDictionary.entityIds]
                    }
                })
                areaDict.entityIds = areaEntityIds;
                floorEntityIds = [...floorEntityIds, ...areaEntityIds];
            })
            floorDict.entityIds = floorEntityIds;
            const soloLightIds = floorEntityIds.filter((entityId) => this.isSoloLight(entityId));
            floorDict.soloLightIds = soloLightIds;
        })
    }

    cleanStructure() {
        Object.entries(this._structure).forEach(([floorId, floorDictionary]) => {
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
                delete this._structure[floorId]
            }
        })
    }

    setStructures() {
        this.setEntityIds();
        this.setStates();
        this.setFloorStructure();
        this.setAreaStructure();
        this.setLightIdStructure();
        this.cleanStructure();
        this.initializeFloor();
    }

    setEntityIds() {
        const lightIds = this.getLightIds();
        const themeIds = this.getThemeIds();
        this._entityIds = [...lightIds, ...themeIds];
    }

    setStates() {
        let states = {};
        this._entityIds.forEach((entityId) => {
            states[entityId] = this.getState(entityId);
        })
        this._states = states;
    }

    updateStates() {
        const changedIds = this._changedEntityIds;
        changedIds.forEach((entityId) => {
            this._states[entityId] = this._hass.states[entityId]
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
        const structure = this._structure;
        const floorIds = Object.keys(structure);
        this.setFloorId(floorIds[0]);
    }

    getFloorStructure() {
        return this._structure[this.getFloorId()].structure;
    }

    getFloorEntityIds() {
        return this._structure[this.getFloorId()].entityIds;
    }

    getFloorStates() {
        const entityIds = this.getFloorEntityIds();
        let states = {};
        entityIds.forEach((entityId) => {
            states[entityId] = this._states[entityId]
        })
        return states;
    }

    // deals with click to select floor.
    onClick(floorId) {
        this.setFloorId(floorId);
    }

    /************************* style and html ***********************************/

    floorButton(floorId) {
        return html`
            <lighting-button
                .changedEntityIds = ${this._changedEntityIds}
                .states = ${this._states}
                .isSelected = ${this.isFloor(floorId)}
                .lightIds = ${this._structure[floorId].soloLightIds}
                .title = ${this._structure[floorId].name}
                @select = ${() => this.onClick(floorId)}
            ></lighting-button>
        `
    }

    // generates the list of floor buttons.
    floorButtons() {
        const floorIds = Object.keys(this._structure);
        return repeat(floorIds, (floorId) => floorId, floorId => this.floorButton(floorId));
    }

    // generates panel content, based on currently selected floor.
    content() {
        return keyed(this.getFloorId(), html`
            <floor-panel
                .changedEntityIds = ${this._changedEntityIds}
                .states = ${this._states}
                .structure = ${this.getFloorStructure()}
                .entityIds = ${this.getFloorEntityIds()}
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