import { html } from 'lit';
import { HaClimateComponent } from '../../shared-resources/base-classes/ha-climate-component.js';
import styles from './aux.styles.js';
import sharedStyles from '../../shared-resources/styles/shared-styles.js';
import '../../shared-resources/climate-components/thermostat-panel/thermostat-panel.js';
import '../../shared-resources/climate-components/aux-mode-controls/aux-mode-controls.js';

export class MainThermostatPanel extends HaClimateComponent {

    getThermostatEIs() {
        let entityIds = new Set();
        entityIds.add(this.getTempId());
        entityIds.add(this.getModeId());
        if (this.getMode() === 'heat') {
            entityIds.add(this.getMinId());
            entityIds.add(this.getActionId());
        }
        return entityIds;
    }

    getAreaName() {
        return this.areaName;
    }

    getAreaMode() {
        return this.areaMode;
    }

    getAreaAction() {
        return this.areaAction;
    }

    isTied() {
        return !['Off', 'off'].includes(this.getTie())
    }

    getTitle() {
        return this.title;
    }

    /********************************* html/css logic ******************************************/

    static styles = [sharedStyles, styles];

    render() {
        if (this.isInitialized()) {
            return html`
                <div class="large-heading"> ${this.getTitle()} </div>
                <thermostat-panel
                    class = "outlined"
                    .changedEntityIds = ${this.getCEIs()}
                    .states = ${this.getStates()}
                    .entityIds = ${this.getThermostatEIs()}
                    .structure=${this.getStructure()}
                    .fixed=${this.isTied()}
                    .title=${this.getTitle()}
                    .callService = ${this.callService}
                ></thermostat-panel>
                <aux-mode-controls
                    .changedEntityIds = ${this.getCEIs()}
                    .states = ${this.getStates()}
                    .entityIds = ${this.getEntityIds()}
                    .structure = ${this.getStructure()}
                    .areaName = ${this.getAreaName()}
                    .areaMode = ${this.getAreaMode()}
                    .areaAction = ${this.getAreaAction()}
                    .fixed=${this.isTied()}
                    .callService = ${this.callService}
                ></aux-mode-controls>
                `
        }
    }

}

customElements.define("main-thermostat-panel", MainThermostatPanel);