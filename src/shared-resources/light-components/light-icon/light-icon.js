import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { lightbulb, lightbulbOff, lightbulbGroup, lightbulbGroupOff } from '../../util/mdi-util.js';
import { HaLightingComponent } from '../../base-classes/ha-lighting-component.js';
import styles from './icon.styles.js';

export class LightIcon extends HaLightingComponent {


    /****************************** getter and setter logic *************************/

    getEntityIds() {
        return new Set([this.getMainId()])
    }

    /**************************** style/html logic ***************************/

    lightbulb() {
        let lightbulbPath;
        if (this.isGroup()) {
            (this.isOn()) ? (lightbulbPath = lightbulbGroup) : (lightbulbPath = lightbulbGroupOff);
        } else {
            (this.isOn()) ? (lightbulbPath = lightbulb) : (lightbulbPath = lightbulbOff);
        }
        return lightbulbPath;
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