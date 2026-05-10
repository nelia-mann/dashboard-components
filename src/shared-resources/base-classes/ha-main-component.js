import { LitElement } from 'lit';
import { getEntityIdsWithLabel, filterEntityIdsForLabel } from '../util/hass-util.js';

export class HaMainComponent extends LitElement {

    _LABEL = '';
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
            this.setEntityIds();
            this.setStates();
            this.setStructure();
            this.initializeChoice();
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

    setEntityIds() {
        this.entityIds = getEntityIdsWithLabel(this.getHass(), this.getMainLabel());
    }

    setStates() {
        let states = {};
        this.getEntityIds().forEach((entityId) => {
            states[entityId] = this.getState(entityId);
        })
        this.states = states;
    }

    /********************************** hooks **************************************/

    hasChanges(oldHass, newHass, entityId) {
        return false;
    }

    getTriggers() {
        return [];
    }

    setStructure() {
    }

    getMainLabel() {
        return this._LABEL;
    }

    initializeChoice() {
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

    filterEntityIdsForLabel(entityIds, label) {
        return filterEntityIdsForLabel(this.getHass(), entityIds, label);
    }

}