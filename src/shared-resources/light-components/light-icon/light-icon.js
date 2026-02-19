import { html, LitElement } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { mdiLightbulb, mdiLightbulbOff, mdiLightbulbGroup, mdiLightbulbGroupOff } from '@mdi/js';
import styles from './icon.styles.js';
import { getColor } from '../util/light-util.js';
import { isOn, isGroup, getEntityId } from '../../util/state-util.js';

export class LightIcon extends LitElement {


    static get properties() {
        return {
            _lightState: { state: true },
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
        return this.getCEIs().has(getEntityId(this.getLightState()));
    }

    /****************************** getter and setter logic *************************/

    isInitialized() {
        return this._initialized;
    }

    initialize() {
        this._initialized = true;
    }

    getLightState() {
        return this._lightState;
    }

    getCEIs() {
        return this._changedEntityIds;
    }

    /**************************** style/html logic ***************************/

    lightbulb() {
        let lightbulb;
        if (isGroup(this.getLightState())) {
            (isOn(this.getLightState())) ? (lightbulb = mdiLightbulbGroup) : (lightbulb = mdiLightbulbGroupOff);
        } else {
            (isOn(this.getLightState())) ? (lightbulb = mdiLightbulb) : (lightbulb = mdiLightbulbOff);
        }
        return lightbulb;
    }

    getColor() {
        return getColor(this.getLightState())
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