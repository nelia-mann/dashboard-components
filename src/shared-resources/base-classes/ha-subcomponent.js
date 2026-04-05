import { LitElement } from 'lit';

export class HaSubComponent extends LitElement {

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

    updateTrigger(changedProps) {
        const triggers = this.getTriggers();
        for (const trigger of triggers) {
            if (changedProps.has(trigger)) {
                return true;
            }
        }
        return false;
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
        this._initialized = true;
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

    makePretty(region) {
        const prettyArray = region.split('_');
        let pretty = '';
        prettyArray.forEach((piece) => {
            pretty = pretty + piece.charAt(0).toUpperCase() + piece.slice(1) + ' ';
        })
        return pretty.slice(0, -1);
    }

    /********************************* hooks for subclasses **********************************/

    onFirstUpdate() { }

    getTriggers() {
        return [];
    }

}
