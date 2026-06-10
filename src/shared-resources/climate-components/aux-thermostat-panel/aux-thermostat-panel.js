import { html } from 'lit';
import { HaClimateComponent } from '../../base-classes/ha-climate-component.js';
import styles from './aux-therm.styles.js';
import sharedStyles from '../../styles/shared-styles.js';
import '../thermostat-panel/thermostat-panel.js';
import '../aux-mode-controls/aux-mode-controls.js';
import '../offset-slider/offset-slider.js';

export class AuxThermostatPanel extends HaClimateComponent {

    getMainStructure() {
        if (this.getStructure().tied) {
            return this.getStructure().tied.structure;
        } else return this.getStructure();
    }

    getThermostatEIs() {
        let entityIds = new Set();
        entityIds.add(this.getEntityId('safe_mode'));
        entityIds.add(this.getEntityId('thermostat'));
        return entityIds;
    }

    getControlEIs() {
        let entityIds = new Set();
        entityIds.add(this.getEntityId('safe_mode'));
        entityIds.add(this.getEntityId('thermostat'));
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
        return (this.getTie() != 'off')
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
        if (![this.getRegionName(), 'on'].includes(this.getTie()) || this.getMode() === 'off' || this.isSafe()) {
            return true;
        } else return false;
    }

    isInactiveSlider() {
        if (this.fixSlider()) return 'inactive';
        return '';
    }


    /********************************* html/css logic ******************************************/

    static styles = [sharedStyles, styles];

    render() {
        if (this.isInitialized()) {
            return html`
                <div class="heading"> ${this.getName()} </div>
                <div class="main">
                    <div class="thermostat">
                        <thermostat-panel
                            class = "outlined ${this.isInactive()}"
                            .changedEntityIds = ${this.getCEIs()}
                            .states = ${this.getStates()}
                            .entityIds = ${this.getThermostatEIs()}
                            .structure=${this.getStructure()}
                            .fixed=${this.isFixed()}
                            .callService = ${this.callService}
                        ></thermostat-panel>
                        <aux-mode-controls
                            .changedEntityIds = ${this.getCEIs()}
                            .states = ${this.getStates()}
                            .entityIds = ${this.getControlEIs()}
                            .structure = ${this.getMainStructure()}
                            .regionName = ${this.getRegionName()}
                            .areaMode = ${this.getTieMode()}
                            .areaAction = ${this.getTieAction()}
                            .callService = ${this.callService}
                        ></aux-mode-controls>
                    </div>
                    <offset-slider
                        class="outlined ${this.isInactiveSlider()}"
                        .changedEntityIds = ${this.getCEIs()}
                        .states = ${this.getStates()}
                        .entityIds = ${this.getEntityIds()}
                        .structure=${this.getStructure()}
                        .regionName=${this.getRegionName()}
                        .callService = ${this.callService}
                    ></offset-slider>
                </div>

                `
        }
    }

}

customElements.define("aux-thermostat-panel", AuxThermostatPanel);