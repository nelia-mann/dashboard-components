import { html, css } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { interpolateRGB, OFF, ONLIGHT, rgba } from './../util/color-util.js';
import { HaLightingComponent } from '../base-classes/ha-lighting-component.js';
import sharedStyles from '../styles/shared-styles.js';

export class LightingButton extends HaLightingComponent {

    static properties = {
        ...super.properties,
        isSelected: { state: true },
    }

    constructor() {
        super();
        this.isSelected = false;
        this.title = '';
        this._total = 0;
    }

/********************************************** lifecycle *************************************************************/

    getTriggers() {
        return ["isSelected"];
    }

    onFirstUpdate() {
        this.setTotal();
    }

/********************************************** getter & setter logic *************************************************/

    selected() {
        return this.isSelected;
    }

    isLightOn(lightId) {
        return this.isOn(lightId);
    }

    getTitle() {
        return this.title;
    }

    setTotal() {
        this._total = this.getEntityIds().size;
    }

    getTotal() {
        return this._total;
    }

    getLightData() {
        let on = 0;
        this.getEntityIds().forEach((lightId) => {
            (this.isLightOn(lightId)) && (on = on + 1);
        })
        return [on, this.getTotal()];
    }

    // determines the shade of color associated with a particular floor id, based on
    // the fraction of the lights that are on.
    getRGB(opacity) {
        const onTot = this.getLightData();
        const rgb = interpolateRGB(OFF, ONLIGHT, onTot[0] / onTot[1])
        return rgba(rgb, opacity);
    }

/********************************************** interactive logic *****************************************************/

    onClick() {
        this.dispatchEvent(new CustomEvent('select'))
    }

/********************************************** html logic ************************************************************/

    render() {
        if (this.isInitialized()) {
            const onTot = this.getLightData();
            return html`
                <div
                    class="button outlined"
                    @click=${this.onClick}
                    style=${styleMap(this.getStyles())}
                >
                    <div class="small-heading"> ${this.getTitle()} </div>
                    <div class="sub-info"> ${onTot[0]}/${onTot[1]} lights on </div>
                </div>`
        }
    }

/********************************************** style logic ***********************************************************/

    getStyles() {
        let styles = {
            'background-color': this.getRGB(0.5)
        }
        if (this.selected()) {
            styles['outline'] = `solid ${this.getRGB(1)}`;
        }
        return styles;
    }

    static styles = [sharedStyles, css`

        :host {
            height: 100%;
            width: var(--lb-width, 160px);
            padding: var(--lb-padding, 5px);
            border: none;
        }

        .button {
            height: 100%;
            width: 100%;
            display: flex;
            border: none;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: center;
            outline-offset: var(--lb-outline-offset, -3px);
            outline: none;
        }

        .small-heading {
            margin-top: var(--lbh-margin-top, 7px);
            margin-bottom: var(--lbh-margin-bottom, -7px);
            font-weight: var(--lbh-font-weight, 700);
            font-size: var(--lbh-font-size, 100%);
        }

        .sub-info {
            margin-bottom: var(--lbsi-margin-bottom, 10px);
            margin-top: var(--lbsi-margin-top, 1px);
            font-weight: var(--lbsi-font-weight, 700);
            font-size: var(--lbsi-font-size, 100%);
        }

    `];

}

customElements.define("lighting-button", LightingButton);
