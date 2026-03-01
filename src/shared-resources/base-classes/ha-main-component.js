import { LitElement } from 'lit';
export class LightingCard extends LitElement {

    _LABEL = "lighting";

    _hass;
    structure = {};
    entityIds = new Set();
    changedEntityIds = new Set();

    static get properties() {
        return {
            states: { state: true },
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
        triggers.forEach((trigger) => {
            if (changedProps.has(trigger)) {
                return true;
            }
        })
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

    setStructure() {
    }


}