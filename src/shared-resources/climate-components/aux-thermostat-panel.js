import { html, css } from 'lit';
import { HaClimateComponent } from '../base-classes/ha-climate-component.js';
import sharedStyles from '../styles/shared-styles.js';
import './thermostat-panel.js';
import './aux-mode-controls.js';
import './offset-slider.js';

export class AuxThermostatPanel extends HaClimateComponent {

/********************************************** getter & setter logic *************************************************/

    getThermostatEIs() {
        return new Set([this.getEntityId('thermostat'), this.getEntityId('safe_mode')]);
    }

    getControlEIs() {
        let entityIds = new Set();
        entityIds.add(this.getEntityId('safe_mode'));
        entityIds.add(this.getEntityId('thermostat'));
        entityIds.add(this.getEntityId('tie_main'));
        if (this.getStructure().tie) {
            entityIds = entityIds.add(this.getEntityId('tie'));
        }
        return entityIds;
    }

    getRegionName() {
        return this.regionName;
    }

    isTied() {
        return (this.getTie() !== 'off')
    }

    isFixed() {
        return (this.isTied() || this.isSafe());
    }

    isInactive() {
        if (this.isFixed() || this.getMode() === 'off') {
            return 'inactive';
        } else return '';
    }

    fixSlider() {
        return (![this.getRegionName(), 'on'].includes(this.getTie()) || this.getMode() === 'off' || this.isSafe());
    }

    isInactiveSlider() {
        if (this.fixSlider()) return 'inactive';
        return '';
    }

/********************************************** html logic ************************************************************/

    thermostat() {
        return html`<thermostat-panel
                class = "outlined ${this.isInactive()}"
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .entityIds = ${this.getThermostatEIs()}
                .structure=${this.getStructure()}
                .fixed=${this.isFixed()}
                .callService = ${this.callService}
            />`;
    }

    modeControls() {
        return html`<aux-mode-controls
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .entityIds = ${this.getControlEIs()}
                .structure = ${this.getStructure()}
                .regionName = ${this.getRegionName()}
                .areaMode = ${this.getTieMode()}
                .areaAction = ${this.getTieAction()}
                .callService = ${this.callService}
            />`;
    }

    offsetSlider() {
        return html`<offset-slider
                class="outlined ${this.isInactiveSlider()}"
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .entityIds = ${this.getEntityIds()}
                .structure=${this.getStructure()}
                .regionName=${this.getRegionName()}
                .fixed = ${this.fixSlider()}
                .callService = ${this.callService}
            />`;
    }

    render() {
        if (this.isInitialized()) {
            return html`
                <div class="heading"> ${this.getThisName()} </div>
                <div class="main">
                    <div class="thermostat">
                        ${this.thermostat()}
                        ${this.modeControls()}
                    </div>
                    ${this.offsetSlider()}
                </div>

                `
        }
    }

/********************************************** style logic ***********************************************************/

    static styles = [sharedStyles, css`

        :host {
            width: var(--auxp-width, 350px);
            height: var(--auxp-height, 100%);
            padding: var(--auxp-padding, 15px);
            padding-top: var(--auxp-padding-top, 0px);
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-between;
            align-items: center;
        }

        .heading {
            width: 100%;
            height: var(--auxph-height, 50px);
            font-size: var(--auxph-font-size, var(--large-font));
            font-weight: var(--auxph-font-weight, 550);
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: flex-start;
        }

        .main {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: flex-end;
            height: var(--auxpm-height, 430px);
            width: var(--auxpm-width);
        }

        .thermostat {
            height: var(--auxpt-height, 100%);
            width: var(--auxpt-width, 400px);
            display: flex;
            flex-flow: var(--auxpt-flex-flow, column nowrap);
            justify-content: var(--auxpt-justify-content, space-between);
            align-items: var(--auxpt-align-items, center);
        }

`];

}

customElements.define("aux-thermostat-panel", AuxThermostatPanel);
