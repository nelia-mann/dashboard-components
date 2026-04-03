import { html } from 'lit';
import { HaClimateComponent } from '../../base-classes/ha-climate-component.js';
import styles from './aux-therm.styles.js';
import sharedStyles from '../../styles/shared-styles.js';
import '../thermostat-panel/thermostat-panel.js';
import '../aux-mode-controls/aux-mode-controls.js';

export class AuxThermostatPanel extends HaClimateComponent {

    getMainStructure() {
        if (this.getStructure().tied) {
            return this.getStructure().tied.structure;
        } else return this.getStructure();
    }

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

    getControlEIs() {
        let entityIds = new Set();
        entityIds.add(this.getModeId());
        entityIds.add(this.getTieId());
        if (this.getStructure().tie) {
            entityIds = entityIds.union(this.getStructure().tie.entityIds);
        }
        return entityIds;
    }

    getRegionName() {
        return this.regionName;
    }

    isTied() {
        return !['Off', 'off'].includes(this.getTie())
    }

    getTitle() {
        return this.title;
    }

    isSafe() {
        return this.getMode() === 'safe';
    }

    isFixed() {
        return (this.isTied() || this.isSafe());
    }

    isInactive() {
        if (this.isFixed() || this.getMode() === 'off') {
            return 'inactive';
        } else return '';
    }


    /********************************* html/css logic ******************************************/

    static styles = [sharedStyles, styles];

    render() {
        if (this.isInitialized()) {
            return html`
                <div class="heading"> ${this.getTitle()} </div>
                <thermostat-panel
                    class = "outlined ${this.isInactive()}"
                    .changedEntityIds = ${this.getCEIs()}
                    .states = ${this.getStates()}
                    .entityIds = ${this.getThermostatEIs()}
                    .structure=${this.getStructure()}
                    .fixed=${this.isFixed()}
                    .title=${this.getTitle()}
                    .callService = ${this.callService}
                ></thermostat-panel>
                <aux-mode-controls
                    .changedEntityIds = ${this.getCEIs()}
                    .states = ${this.getStates()}
                    .entityIds = ${this.getControlEIs()}
                    .structure = ${this.getMainStructure()}
                    .areaName = ${this.getRegionName()}
                    .areaMode = ${this.getTieMode()}
                    .areaAction = ${this.getTieAction()}
                    .callService = ${this.callService}
                ></aux-mode-controls>
                `
        }
    }

}

customElements.define("aux-thermostat-panel", AuxThermostatPanel);