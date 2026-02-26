import { LitElement } from 'lit';

export class HaSubcomponent extends LitElement {

    static properties = {
        changedEntityIds: { state: true },
        states: { state: true },
        _initialized: { state: true }
    }

    constructor() {
        super();
        this.changedEntityIds = new Set();
        this.states = {};
        this._initialized = false;
        this.structure = {};
        this.entityIds = new Set();
    }

    shouldUpdate(changedProps) {
        return (!this.isInitialized()
            || this.hasRelevantChanges()
            || changedProps.has("_initialized")
            || this.updateTrigger(changedProps))
    }

    firstUpdated() {
        this.onFirstUpdate();
        this.initialize();
    }

    hasRelevantChanges() {
        return this.isIntersection(this.getCEIs(), this.getEntityIds());
    }

    isIntersection(set1, set2) {
        (set1.size > set2.size) && ([set1, set2] = [set2, set1]);
        for (const member of set1) {
            if (set2.has(member)) return true
        }
        return false;
}

    /********************************* basic getters and setters *****************************/

    isInitialized() {
        return this._initialized;
    }

    initialize() {
        this._initialize = true;
    }

    getCEIs() {
        return this.changedEntityIds;
    }

    getStates() {
        return this.states;
    }

    getEntityIds() {
        return this.entityIds;
    }

    getStructure() {
        return this.structure;
    }

    /********************************* hooks for subclasses **********************************/

    updateTrigger(changedProps) {
        return false;
    }

    onFirstUpdate() {}

}