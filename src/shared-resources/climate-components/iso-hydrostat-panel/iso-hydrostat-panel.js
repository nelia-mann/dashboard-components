import { html } from 'lit';
import { HaClimateComponent } from '../../base-classes/ha-climate-component.js';
import styles from './iso-hydro.styles.js';
import sharedStyles from '../../styles/shared-styles.js';
import '../hydrostat-panel/hydrostat-panel.js';
import '../iso-mode-controls/iso-mode-controls.js';

export class IsoHydrostatPanel extends HaClimateComponent {

    isInactive() {
        if ((this.getMode() === 'off') || (this.isSafe())) {
            return 'inactive';
        } else return '';
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
                    .entityIds = ${this.getEntityIds()}
                    .structure=${this.getStructure()}
                    .fixed=${this.isSafe()}
                    .callService = ${this.callService}
                ></hydrostat-panel>
                <iso-mode-controls
                    .changedEntityIds = ${this.getCEIs()}
                    .states = ${this.getStates()}
                    .entityIds = ${this.getEntityIds()}
                    .structure = ${this.getStructure()}
                    .callService = ${this.callService}
                ></iso-mode-controls>
                `
        }
    }

}

customElements.define("iso-hydrostat-panel", IsoHydrostatPanel);