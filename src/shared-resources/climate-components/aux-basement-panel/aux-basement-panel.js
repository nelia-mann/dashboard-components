import { html } from 'lit';
import { HaClimateComponent } from '../../base-classes/ha-climate-component.js';
import styles from './aux-basement.styles.js';
import sharedStyles from '../../styles/shared-styles.js';
import '../thermostat-panel/thermostat-panel.js';
import '../aux-mode-controls/aux-mode-controls.js';

export class AuxBasementPanel extends HaClimateComponent {

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
            console.log(this.getStructure());
            return html``;
            return html`
                <div class="heading"> ${"Auxiliary Elements"} </div>
                <div class="elements">
                    <aux-thermostat-panel class="outlined"
                        .changedEntityIds = ${this.getCEIs()}
                        .states = ${this.getStates()}
                        .entityIds = ${this.getEntityIds()}
                        .structure = ${this.getStructure()}
                        .areaName = ${this.getAreaName()}
                        .areaMode = ${this.getAreaMode()}
                        .areaAction = ${this.getAreaAction()}
                        .title = ${'Fireplace'}
                        .callService = ${this.callService}
                    ></aux-thermostat-panel>
                    <aux-thermostat-panel class="outlined"
                        .changedEntityIds = ${this.getCEIs()}
                        .states = ${this.getStates()}
                        .entityIds = ${this.getEntityIds()}
                        .structure = ${this.getStructure()}
                        .areaName = ${this.getAreaName()}
                        .areaMode = ${this.getAreaMode()}
                        .areaAction = ${this.getAreaAction()}
                        .title = ${'Fireplace'}
                        .callService = ${this.callService}
                    ></aux-thermostat-panel>
                    <aux-thermostat-panel class="outlined"
                        .changedEntityIds = ${this.getCEIs()}
                        .states = ${this.getStates()}
                        .entityIds = ${this.getEntityIds()}
                        .structure = ${this.getStructure()}
                        .areaName = ${this.getAreaName()}
                        .areaMode = ${this.getAreaMode()}
                        .areaAction = ${this.getAreaAction()}
                        .title = ${'Fireplace'}
                        .callService = ${this.callService}
                    ></aux-thermostat-panel>
                </div>
                `
        }
    }

}

customElements.define("aux-basement-panel", AuxBasementPanel);