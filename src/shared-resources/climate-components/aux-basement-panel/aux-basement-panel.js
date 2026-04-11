import { html } from 'lit';
import { HaClimateComponent } from '../../base-classes/ha-climate-component.js';
import styles from './aux-basement.styles.js';
import sharedStyles from '../../styles/shared-styles.js';
import '../aux-mode-controls/aux-mode-controls.js';
import '../iso-hydrostat-panel/iso-hydrostat-panel.js';

export class AuxBasementPanel extends HaClimateComponent {

    getFireplace() {
        return this.getStructure().fireplace;
    }

    getFireplaceStructure() {
        return this.getFireplace().structure;
    }

    getFireplaceEIs() {
        return this.getFireplace().entityIds;
    }

    getFan() {
        return this.getStructure().fan;
    }

    getFanStructure() {
        return this.getFan().structure;
    }

    getFanEIs() {
        return this.getFan().entityIds;
    }

    getRegionName() {
        return this.regionName;
    }


    /********************************* html/css logic ******************************************/

    fireplace() {
        return html`
            <aux-thermostat-panel class="outlined"
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .entityIds = ${this.getFireplaceEIs()}
                .structure = ${this.getFireplaceStructure()}
                .regionName = ${this.getRegionName()}
                .callService = ${this.callService}
            ></aux-thermostat-panel>
        `
    }

    laundryFan() {
        return html`
            <iso-hydrostat-panel class="outlined"
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .entityIds = ${this.getFanEIs()}
                .structure = ${this.getFanStructure()}
                .callService = ${this.callService}
            ></iso-hydrostat-panel>

        `
    }

    static styles = [sharedStyles, styles];

    render() {
        if (this.isInitialized()) {
            return html`
                <div class="heading"> ${"Auxiliary Elements"} </div>
                <div class="main">
                    <div class="elements top">
                        ${this.fireplace()}
                    </div>
                    <div class="elements bottom">
                        ${this.fireplace()}
                        ${this.laundryFan()}
                    </div>
                </div>
            `;
        }
    }

}

customElements.define("aux-basement-panel", AuxBasementPanel);