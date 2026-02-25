import { html, LitElement } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { lightbulb, lightbulbOff, lightbulbGroup, lightbulbGroupOff } from '../../util/mdi-util.js';
import { getColor } from '../util/light-util.js';
import { isOn, isGroup, getEntityId } from '../../util/state-util.js';
import styles from './icon.styles.js';

export class LightIcon extends LitElement {


    static get properties() {
        return {
            changedEntityIds: { state: true },
            lightState: { state: true },
            _initialized: { state: true}
        }
    }

    constructor() {
        super();
        this.changedEntityIds = new Set();
        this.themeState = {};
        this._initialized = false;
    }

    /*********************************** lifecycle **********************************/

    shouldUpdate(changedProps) {
        return (!this.isInitialized()
            || this.hasRelevantChanges()
            || changedProps.has("_initialized")
            || changedProps.has("lightState"))
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
        return this.lightState;
    }

    getCEIs() {
        return this.changedEntityIds;
    }

    /**************************** style/html logic ***************************/

    lightbulb() {
        let lightbulbPath;
        if (isGroup(this.getLightState())) {
            (isOn(this.getLightState())) ? (lightbulbPath = lightbulbGroup) : (lightbulbPath = lightbulbGroupOff);
        } else {
            (isOn(this.getLightState())) ? (lightbulbPath = lightbulb) : (lightbulbPath = lightbulbOff);
        }
        return lightbulbPath;
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