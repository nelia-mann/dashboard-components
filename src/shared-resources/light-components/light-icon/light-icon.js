import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { lightbulb, lightbulbOff, lightbulbGroup, lightbulbGroupOff } from '../../util/mdi-util.js';
import { getColor } from '../util/light-util.js';
import { isOn, isGroup, getEntityId } from '../../util/state-util.js';
import { HaSubComponent } from '../../base-classes/ha-subcomponent.js';
import styles from './icon.styles.js';

export class LightIcon extends HaSubComponent {

    static properties = {
        ...super.properties,
        lightState: { state: true }
    }

    constructor() {
        super();
        this.lightState = {};
    }

    /*********************************** lifecycle **********************************/

    updateTrigger(changedProps) {
        return changedProps.has("lightState");
    }

    /****************************** getter and setter logic *************************/

    getLightState() {
        return this.lightState;
    }

    getEntityIds() {
        return new Set([getEntityId(this.getLightState())])
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

    getStyles() {
        let styles = {
            "color": getColor(this.getLightState())
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