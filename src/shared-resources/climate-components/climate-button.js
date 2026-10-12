import { html, css } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { HaClimateComponent } from '../base-classes/ha-climate-component.js';
import { getModeStyles } from '../util/climate-util/climate-util.js';
import sharedStyles from '../styles/shared-styles.js';

export class ClimateButton extends HaClimateComponent {

    static properties = {
        ...super.properties,
        isSelected: { state: true },
    }

    constructor() {
        super();
        this.isSelected = false;
        this.title = '';
    }

/********************************************** lifecycle *************************************************************/

    getTriggers() {
        return ["isSelected"];
    }

/********************************************** getter & setter logic *************************************************/

    selected() {
        return this.isSelected;
    }

    getTitle() {
        return this.title;
    }

/********************************************** interactive logic *****************************************************/

    onClick() {
        this.dispatchEvent(new CustomEvent('select'))
    }

/********************************************** html logic ************************************************************/

    render() {
        if (this.isInitialized()) {
            return html`
                <div
                    class="button outlined"
                    @click=${this.onClick}
                    style=${styleMap(this.getStyles())}
                >
                    <div class="small-heading"> ${this.getTitle()} </div>
                    <div class="sub-info"> ${this.getSensorDisplay() + " \u00B7 " + this.getAction()} </div>
                </div>`
        }
    }
    
/********************************************** style logic ***********************************************************/

    getStyles() {
        return getModeStyles(this.getMode(), this.getAction(), this.selected())
    }

    static styles = [sharedStyles, css`

        :host {
            height: 100%;
            width: var(--cb-width, 160px);
            padding: var(--cb-padding, 5px);
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
            outline-offset: var(--cb-outline-offset, -3px);
            outline: none;
        }

        .small-heading {
            margin-top: var(--cbh-margin-top, 7px);
            margin-bottom: var(--cbh-margin-bottom, -7px);
            font-weight: var(--cbh-font-weight, 700);
            font-size: var(--cbh-font-size, 100%);
        }

        .sub-info {
            margin-bottom: var(--cbsi-margin-bottom, 10px);
            margin-top: var(--cbsi-margin-top, 1px);
            font-weight: var(--cbsi-font-weight, 700);
            font-size: var(--cbsi-font-size, 100%);
        }

    `];

}

customElements.define("climate-button", ClimateButton);
