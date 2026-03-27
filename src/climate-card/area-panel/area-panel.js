import { html } from 'lit';
import { HaSubComponent } from '../../shared-resources/base-classes/ha-subcomponent.js';
import styles from './area.styles.js';
import sharedStyles from '../../shared-resources/styles/shared-styles.js';
import './../../shared-resources/climate-components/climate-panel/climate-panel.js';
import '../main-thermostat-panel/main-thermostat-panel.js';

export class AreaClimatePanel extends HaSubComponent {


    getClimate() {
        return this.getStructure().climate;
    }

    getClimateEIs() {
        return this.getClimate().entityIds;
    }

    getClimateStructure() {
        return this.getClimate().structure;
    }

    getAux() {
        return this.getStructure().aux;
    }

    getAuxStructure() {
        return this.getAux().structure;
    }

    getAuxEIs() {
        return this.getAux().entityIds;
    }

    getMain() {
        return this.getAuxStructure().general;
    }

    getMainEIs() {
        return this.getMain().entityIds;
    }

    getMainStructure() {
        return this.getMain().structure;
    }

    getFireplace() {
        return this.getAuxStructure().fireplace;
    }

    getFireplaceEIs() {
        let entityIds = new Set([...this.getFireplace().entityIds]);
        entityIds.add(this.getAreaHpId());
        entityIds.add(this.getAreaModeId());
        return entityIds;
    }

    getFireplaceStructure() {
        return this.getFireplace().structure;
    }

    getAreaName() {
        return this.areaName;
    }

    getAreaMode() {
        return this.getStates()[this.getAreaModeId()].state;
    }

    getAreaModeId() {
        return this.getClimateStructure()['mode'];
    }

    getAreaHpId() {
        return this.getClimateStructure()['heatpump'];
    }

    getMainEIs() {
        let entityIds = new Set([...this.getMain().entityIds]);
        entityIds.add(this.getAreaHpId());
        entityIds.add(this.getAreaModeId());
        return entityIds;
    }

    getAreaAction() {
        const HpState = this.getStates()[this.getAreaHpId()].state;
        let action = "off";
        switch (HpState) {
            case 'heat':
                action = "Heating";
                break;
            case 'cool':
                action = "Cooling";
                break;
            case 'off':
                if (this.getAreaMode() !== "off") {
                    action = "Idle";
                } else { action = "Off" };
                break;
        }
        return action;
    }

    auxPanel() {
        if (this.getMain()) {
            return html`
                <main-thermostat-panel class="outlined"
                    .changedEntityIds = ${this.getCEIs()}
                    .states = ${this.getStates()}
                    .entityIds = ${this.getMainEIs()}
                    .structure = ${this.getMainStructure()}
                    .areaName = ${this.getAreaName()}
                    .areaMode = ${this.getAreaMode()}
                    .areaAction = ${this.getAreaAction()}
                    .callService = ${this.callService}
                ></main-thermostat-panel>
            `
        } else if (this.getFireplace()) {
            return html`
                <main-thermostat-panel class="outlined"
                    .changedEntityIds = ${this.getCEIs()}
                    .states = ${this.getStates()}
                    .entityIds = ${this.getFireplaceEIs()}
                    .structure = ${this.getFireplaceStructure()}
                    .areaName = ${this.getAreaName()}
                    .areaMode = ${this.getAreaMode()}
                    .areaAction = ${this.getAreaAction()}
                    .callService = ${this.callService}
                ></main-thermostat-panel>
            `
        }
    }

    static styles = [sharedStyles, styles];

    render() {
        if (this.isInitialized()) {
            return html`
                <climate-panel class="outlined"
                    .changedEntityIds = ${this.getCEIs()}
                    .states = ${this.getStates()}
                    .entityIds = ${this.getClimateEIs()}
                    .structure = ${this.getClimateStructure()}
                    .callService = ${this.callService}
                ></climate-panel>
                ${this.auxPanel()}
            `
        }
    }

}

customElements.define("area-climate-panel", AreaClimatePanel);