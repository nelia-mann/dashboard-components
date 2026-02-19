import { html, LitElement } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { mdiLightbulb, mdiLightbulbOff, mdiLightbulbGroup, mdiLightbulbGroupOff } from '@mdi/js';
import styles from './icon.styles.js';
import { getColor, isOn }  from '../util/light-util.js';

export class LightIcon extends LitElement {


    static get properties() {
        return {
            _state: { state: true },
            _changedEntityIds: { state: true },
            _initialized: { state: true}
        }
    }

    constructor() {
        super();
        this._initialized = false;
    }

    /*********************************** lifecycle **********************************/


    update(changedProps) {
        super.update(changedProps)
    }

    shouldUpdate(changedProps) {
        return (!this.isInitialized() || this.hasRelevantChanges() || changedProps.has("_initialized"))
    }

    firstUpdated() {
        this.initialize();
    }

    hasRelevantChanges() {
        return this.getCEIs().has(this.getEntityId());
    }

    /****************************** getter and setter logic *************************/

    isInitialized() {
        return this._initialized;
    }

    initialize() {
        this._initialized = true;
    }

    getState() {
        return this._state;
    }

    getEntityId() {
        return this.getState().entity_id;
    }

    isGroup() {
        return !!(this.getState().attributes.entity_id)
    }

    getCEIs() {
        return this._changedEntityIds;
    }

    /**************************** style/html logic ***************************/

    lightbulb() {
        let lightbulb;
        if (this.isGroup()) {
            (isOn(this.getState())) ? (lightbulb = mdiLightbulbGroup) : (lightbulb = mdiLightbulbGroupOff);
        } else {
            (isOn(this.getState())) ? (lightbulb = mdiLightbulb) : (lightbulb = mdiLightbulbOff);
        }
        return lightbulb;
    }

    getColor() {
        return getColor(this.getState())
    }

    getStyles() {
        let styles = {
            "color": this.getColor()
        }
        return styles;
    }

    static styles = styles;

    render() {
        if (this.isInitialized()) {
            return html`
                <ha-svg-icon .path=${this.lightbulb()} style="${styleMap(this.getStyles())}"></ha-svg-icon>
            `
        }
    }

}

customElements.define("light-icon", LightIcon);