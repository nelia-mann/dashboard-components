import { html, css } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { lightbulb, lightbulbOff, lightbulbGroup, lightbulbGroupOff } from '../util/mdi-util.js';
import { HaLightingComponent } from '../base-classes/ha-lighting-component.js';

export class LightIcon extends HaLightingComponent {


    /********************************************** getter & setter logic ***********************************************/

    getEntityIds() {
        return new Set([this.getMainId()])
    }

    /********************************************** html logic **********************************************************/

    lightbulb() {
        let lightbulbPath;
        if (this.isGroup()) {
            (this.isOn()) ? (lightbulbPath = lightbulbGroup) : (lightbulbPath = lightbulbGroupOff);
        } else {
            (this.isOn()) ? (lightbulbPath = lightbulb) : (lightbulbPath = lightbulbOff);
        }
        return lightbulbPath;
    }

    render() {
        if (this.isInitialized()) {
            return html`
                <ha-svg-icon .path=${this.lightbulb()} style="${styleMap(this.getStyles())}"></ha-svg-icon>
            `
        }
    }

    getStyles() {
        let styles = {
            "color": this.getColor()
        }
        return styles;
    }

    /********************************************** style logic *********************************************************/

    static styles = css`

    ha-svg-icon {
        padding: 0%;
        margin: 0%;
        --mdc-icon-size: 100%;
    }

    `;

}

customElements.define("light-icon", LightIcon);
