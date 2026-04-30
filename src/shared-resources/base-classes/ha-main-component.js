import { LitElement } from 'lit';

export class HaMainComponent extends LitElement {

    _LABEL = "lighting";

    _hass;
    structure = {};
    entityIds = new Set();
    changedEntityIds = new Set();

    static properties = {
        states: { state: true },
        _isInitialized: { state: true },
    };


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
            this.initialize();
        } else {
            const oldHass = this.getHass();
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
            || this.updateTrigger(changedProps))
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

    updateTrigger(changedProps) {
        const triggers = this.getTriggers();
        for (const trigger of triggers) {
            if (changedProps.has(trigger)) {
                return true;
            }
        }
        return false;
    }


    initialize() {
        this._initialized = true;
    }

    setHass(hass) {
        this._hass = hass;
    }

    /********************************** hooks **************************************/

    hasChanges(oldHass, newHass, entityId) {
        return false;
    }

    getTriggers() {
        return [];
    }

    setStructures() {
    }

    /****************************** basic getter and setter logic *********************/

    getCEIs() {
        return this.changedEntityIds;
    }

    getEntityIds() {
        return this.entityIds;
    }

    getStructure() {
        return this.structure;
    }

    isInitialized() {
        return this._initialized;
    }

    getStates() {
        return this.states;
    }

    getHass() {
        return this._hass;
    }
    makePretty(region) {
        const prettyArray = region.split('_');
        let pretty = '';
        prettyArray.forEach((piece) => {
            pretty = pretty + piece.charAt(0).toUpperCase() + piece.slice(1) + ' ';
        })
        return pretty.slice(0, -1);
    }

    /************************************ sorting and filtering logic ***************************/

    getHassEntities() {
        return this.getHass().entities;
    }

    getHassStates() {
        return this.getHass().states;
    }

    getEntity(entityId) {
        return this.getHassEntities()[entityId];
    }

    getState(entityId) {
        return this.getHassStates()[entityId];
    }

    getLabels(entityId) {
        return this.getEntity(entityId).labels;
    }

    hasLabel(entityId, label) {
        const labels = this.getLabels(entityId);
        return labels.includes(label);
    }

    getEntityIdsWithLabel(label) {
    const entities = this.getHassEntities();
    const entityIds = Object.keys(entities).filter((entityId) => {
        return this.hasLabel(entityId, label);
    })
    return new Set(entityIds);
    }

    filterEntityIdsForLabel(entityIds, label) {
        const array = [...entityIds];
        const entityIdArray = array.filter((entityId) => {
            return this.hasLabel(entityId, label);
        })
        return new Set(entityIdArray);
    }

    getHassFloors() {
        return this.getHass().floors;
    }

    getHassFloorName(floorId) {
        return this.getHassFloors()[floorId].name;
    }

    getHassAreas() {
        return this.getHass().areas;
    }

    getArea(areaId) {
        return this.getHassAreas()[areaId];
    }

    getHassAreaName(areaId) {
        return this.getArea(areaId).name;
    }

    getAreaFloor(areaId) {
        return this.getArea(areaId).floor_id;
    }

    getEntityAreaId(entityId) {
        return this.getEntity(entityId).area_id;
    }

    getEntityFloorId(entityId) {
        const areaId = this.getEntityAreaId(entityId);
        return this.getAreaFloor(areaId);
    }

    isOnFloor(entityId, floorId) {
        if (this.getArea(entityId)) {
            return this.getEntityFloorId(entityId) === floorId;
        } else return false;
    }

    filterEntityIdsForFloor(entityIds, floorId) {
        const theseIds = [...entityIds];
        const filteredIds = theseIds.filter((entityId) => this.isOnFloor(entityId, floorId));
        return new Set(filteredIds);
    }

    isInArea(entityId, areaId) {
        return this.getEntityAreaId(entityId) === areaId;
    }

    getUniqueAreaIds(entityIds) {
        const areaIds = [...entityIds].map((entityId) => this.getEntityAreaId(entityId));
        return new Set(areaIds);
    }

    filterEntityIdsForArea(entityIds, areaId) {
        const arrayIds = [...entityIds];
        const filteredIds = arrayIds.filter((entityId) => this.isInArea(entityId, areaId));
        return new Set(filteredIds);
    }

}