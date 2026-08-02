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
                ${this.hygrostatPanel()}
                ${this.modeControls()}
            `
        }
    }

/********************************************** style logic ***********************************************************/

    static styles = [sharedStyles, css`

        :host {
            width: var(--iso-panel-width, 350px);
            height: var(--iso-panel-height, 100%);
            padding: var(--iso-panel-padding, 0px);
            padding-top: var(--iso-panel-padding-top, 0px);
            display: flex;
            flex-flow: var(--iso-panel-flex-flow, column nowrap);
            justify-content: var(--iso-panel-justify-content, flex-start);
            align-items: var(--iso-panel-align-items, center);
        }

        .heading {
            font-size: var(--iso-panel-heading-font-size, large-font);
            font-weight: var(--iso-panel-heading-font-weight, 550);
            height: var(--iso-panel-heading-height, 30px);
            margin-bottom: var(--iso-panel-heading-margin-bottom, 0px);
        }

    `];

}

customElements.define("iso-hydrostat-panel", IsoHydrostatPanel);
