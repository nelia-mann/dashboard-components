import { html, css } from 'lit';
import { HaClimateComponent } from '../base-classes/ha-climate-component.js';
import sharedStyles from '../styles/shared-styles.js';
import './hydrostat-panel.js';
import './iso-mode-controls.js';

export class IsoHydrostatPanel extends HaClimateComponent {

/********************************************** getter & setter logic *************************************************/

    isInactive() {
        if ((this.getMode() === 'off') || (this.isSafe())) {
            return 'inactive';
        } else return '';
    }

/********************************************** html logic ************************************************************/

    hygrostatPanel() {
        return html`<hydrostat-panel
                class = "outlined ${this.isInactive()}"
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .entityIds = ${this.getEntityIds()}
                .structure=${this.getStructure()}
                .fixed=${this.isSafe()}
                .callService = ${this.callService}
            />`;
    }

    modeControls() {
        return html`<iso-mode-controls
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .entityIds = ${this.getEntityIds()}
                .structure = ${this.getStructure()}
                .callService = ${this.callService}
            />`;
    }

    render() {
        if (this.isInitialized()) {
            return html`
                <div class="heading"> ${this.getThisName()} </div>
                <div class="hygrostat">
                    ${this.hygrostatPanel()}
                    ${this.modeControls()}
                </div>
            `
        }
    }

/********************************************** style logic ***********************************************************/

    static styles = [sharedStyles, css`

        :host {
            width: var(--ip-width, 350px);
            height: var(--ip-height, 100%);
            padding: var(--ip-padding, 0px);
            padding-top: var(--ip-padding-top, 0px);
            display: flex;
            flex-flow: column nowrap;
            justify-content: flex-start;
            align-items: center;
        }

        .heading {
            font-size: var(--iph-font-size, large-font);
            font-weight: var(--iph-font-weight, 550);
            height: var(--iph-height, 30px);
        }

        .hygrostat {
            height: var(--iphy-height, 100%);
            width: var(--iphy-width, 100%);
            display: flex;
            flex-flow: var(--iphy-flex-flow, column nowrap);
            justify-content: var(iphy-justify-content, space-between);
            align-items: var(--iphy-align-items, center);
        }

    `];

}

customElements.define("iso-hydrostat-panel", IsoHydrostatPanel);
