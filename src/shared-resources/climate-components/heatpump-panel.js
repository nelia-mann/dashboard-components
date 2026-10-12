import { html, css } from 'lit';
import { HaClimateComponent } from '../base-classes/ha-climate-component.js';
import sharedStyles from '../styles/shared-styles.js';
import './mode-controls.js';
import '../general-components/double-circular-slider.js';
import '../general-components/adjust-buttons.js';
import './thermostat-panel.js';

export class HeatpumpPanel extends HaClimateComponent {

/********************************************** getter & setter logic *************************************************/

    getControlEIs() {
        let entityIds = new Set([this.getEntityId('hp')]);
        if (this.getRankId()) {
            entityIds.add(this.getRankId());
        }
        return entityIds;
    }

    getThermostatEIs() {
        return new Set([this.getEntityId('hp')]);
    }

/********************************************** html logic ************************************************************/

    thermostat() {
        return html`<thermostat-panel
                class="outlined"
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .entityIds = ${this.getThermostatEIs()}
                .structure= ${this.getStructure()}
                .fixed= ${false}
                .callService = ${this.callService}
            />`;
    }

    modeControls() {
        return html`<mode-controls
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .entityIds = ${this.getControlEIs()}
                .structure = ${this.getStructure()}
                .callService = ${this.callService}
            />`;
    }

    render() {
        if (this.isInitialized()) {
            return html`
                <div class="heading"> ${this.getThisName()} </div>
                ${this.thermostat()}
                ${this.modeControls()}
            `
        }
    }
/********************************************** style logic ***********************************************************/

    static styles = [sharedStyles, css`

        :host {
            width: var(--hpp-width, 350px);
            height: var(--hpp-height, 100%);
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-between;
            align-items: center;
            padding: var(--hpp-padding, 0px);
            padding-top: var(--hpp-padding-top, 0px);
        }

        .heading {
            font-size: var(--hpph-font-size, var(--large-font));
            font-weight: var(--hpph-font-weight, 550);
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: flex-start;
            width: 100%;
            height: var(--hpph-height, 50px);
        }

    `];

}

customElements.define("heatpump-panel", HeatpumpPanel);
