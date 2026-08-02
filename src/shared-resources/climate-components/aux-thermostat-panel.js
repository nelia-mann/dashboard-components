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
            width: var(--aux-panel-width, 350px);
            height: var(--aux-panel-height, 100%);
            display: flex;
            flex-flow: var(--aux-panel-flex-flow, column nowrap);
            justify-content: var(--aux-panel-justify-content, space-between);
            align-items: var(--aux-panel-align-items, center);
            padding: var(--aux-panel-padding, 0px);
            padding-top: var(--aux-panel-padding-top, 0px);
        }

        .heading {
            font-size: var(--aux-panel-heading-font-size, var(--large-font));
            font-weight: var(--aux-panel-heading-font-weight, 550);
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: flex-start;
            width: 100%;
            height: var(--aux-panel-heading-height, 50px);
        }

        .main {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: flex-end;
            height: var(--aux-panel-main-height, 430px);
            width: var(--aux-panel-main-width);
        }

        .thermostat {
            display: flex;
            flex-flow: var(--aux-thermostat-layout, column nowrap);
            justify-content: space-between;
            align-items: center;
            height: 100%;
        }

`];

}

customElements.define("aux-thermostat-panel", AuxThermostatPanel);
