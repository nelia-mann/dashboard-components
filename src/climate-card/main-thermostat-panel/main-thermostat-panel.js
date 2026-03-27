import { html } from 'lit';
import { HaClimateComponent } from '../../shared-resources/base-classes/ha-climate-component.js';
import styles from './thermostat.styles.js';
import sharedStyles from '../../shared-resources/styles/shared-styles.js';
import '../../shared-resources/climate-components/thermostat-panel/thermostat-panel.js';

export class MainThermostatPanel extends HaClimateComponent {



    getThermostatEIs() {
        let entityIds = new Set();
        entityIds.add(this.getTempId());
        entityIds.add(this.getModeId());
        if (this.getMode() === 'heat') {
            entityIds.add(this.getMinId());
            entityIds.add(this.getActionId());
        }
        (this.getMode() === 'heat') && (entityIds.add(this.getMinId()));
        return entityIds;
    }



    /********************************* html/css logic ******************************************/

    static styles = [sharedStyles, styles];

    render() {
        if (this.isInitialized()) {
            return html`
                <thermostat-panel
                    .changedEntityIds = ${this.getCEIs()}
                    .states = ${this.getStates()}
                    .entityIds = ${this.getThermostatEIs()}
                    .structure=${this.getStructure()}
                    .callService = ${this.callService}
                ></thermostat-panel>
                `
        }
    }

}

customElements.define("main-thermostat-panel", MainThermostatPanel);