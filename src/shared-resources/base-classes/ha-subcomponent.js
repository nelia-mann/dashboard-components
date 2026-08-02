import { LitElement } from 'lit';

export class HaSubComponent extends LitElement {

    _changeFlag;

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
        this._changeFlag = false;
    }

/********************************************** lifecycle *************************************************************/

    update(changedProps) {
        (!this.getChangeFlag()) && (this.setInitialValues());
        super.update(changedProps);
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
        this.setInitialValues();
        this.initialize();
    }

    hasRelevantChanges() {
        return !(this.getChangeFlag()) && this.isIntersection(this.getCEIs(), this.getEntityIds());
    }

    isIntersection(set1, set2) {
        (set1.size > set2.size) && ([set1, set2] = [set2, set1]);
        for (const member of set1) {
            if (set2.has(member)) return true
        }
        return false;
    }

    waitForEntity(entityId, condition, timeout = 5000) {
        const interval = 100;
        let elapsed = 0;
        return new Promise((resolve, reject) => {
            const check = () => {
                if (condition.call(this, entityId)) {
                    resolve()
                    return;
                }
                elapsed += interval; 
                if (elapsed >= timeout) {
                    reject(new Error(`Timed out waiting for ${entityId}`));
                    return;
                };
                setTimeout(check, interval);
            };
            check();      
        });
    }

/********************************************** getter & setter logic *************************************************/

    isInitialized() {
        return this._initialized;
    }

    initialize() {
        this._initialized = true;
    }

    getChangeFlag() {
        return this._changeFlag;
    }

    raiseChangeFlag() {
        this._changeFlag = true;
    }

    lowerChangeFlag() {
        this._changeFlag = false;
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

    getState(entityId) {
        return this.getStates()[entityId];
    }

    getStateEI(state) {
        return state.entity_id;
    }

    getStateState(entityId) {
        const state = this.getState(entityId);
        if (state) {
            return state.state;
        }
    }

    getAttributes(entityId) {
        const state = this.getState(entityId);
        if (state) {
            return state.attributes;
        }
    }

    getAttribute(entityId, attribute) {
        const attributes = this.getAttributes(entityId);
        if (attributes) {
            return attributes[attribute];
        }
    }

    getName(entityId) {
        const attributes = this.getAttributes(entityId);
        if (attributes) return attributes.friendly_name;
    }

    makePretty(id) {
        const prettyArray = id.split('_');
        let pretty = '';
        prettyArray.forEach((piece) => {
            pretty = pretty + piece.charAt(0).toUpperCase() + piece.slice(1) + ' ';
        })
        return pretty.slice(0, -1);
    }

    /********************************* lifecycle hooks for subclasses *************************************************/

    onFirstUpdate() {}

    getTriggers() {
        return [];
    }

    setInitialValues() {};

}
