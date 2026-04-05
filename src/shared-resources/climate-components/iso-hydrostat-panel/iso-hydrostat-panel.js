import { html } from 'lit';
import { HaClimateComponent } from '../../base-classes/ha-climate-component.js';
import styles from './iso-hydro.styles.js';
import sharedStyles from '../../styles/shared-styles.js';
import '../hydrostat-panel/hydrostat-panel.js';
import '../iso-mode-controls/iso-mode-controls.js';

export class IsoHydrostatPanel extends HaClimateComponent {

    getRegionName() {
        return this.regionName;
    }

    isFixed() {
        return (this.getMode() == 'safe_max');
    }

    isInactive() {
        if (['off', 'safe_max'].includes(this.getMode())) {
            return 'inactive';
        } else return '';
    }

    getControlEIs() {
        return new Set([this.getModeId()]);
    }

    getHydrostatEIs() {
        let entityIds = new Set();
        entityIds.add(this.getSensorId());
        entityIds.add(this.getModeId());
        (this.getMode() === 'fan') && (entityIds.add(this.getMaxId()));
        return entityIds;
    }


    /********************************* html/css logic ******************************************/

    static styles = [sharedStyles, styles];

    render() {
        if (this.isInitialized()) {
            return html`
                <div class="heading"> ${this.getName()} </div>
                <hydrostat-panel
                    class = "outlined ${this.isInactive()}"
                    .changedEntityIds = ${this.getCEIs()}
                    .states = ${this.getStates()}
                    .entityIds = ${this.getHydrostatEIs()}
                    .structure=${this.getStructure()}
                    .fixed=${this.isFixed()}
                    .callService = ${this.callService}
                ></hydrostat-panel>
                <iso-mode-controls
                    .changedEntityIds = ${this.getCEIs()}
                    .states = ${this.getStates()}
                    .entityIds = ${this.getControlEIs()}
                    .structure = ${this.getStructure()}
                    .callService = ${this.callService}
                ></iso-mode-controls>
                `
        }
    }

}

customElements.define("iso-hydrostat-panel", IsoHydrostatPanel);