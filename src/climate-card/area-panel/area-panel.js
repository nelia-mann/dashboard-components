import { html } from 'lit';
import { HaSubComponent } from '../../shared-resources/base-classes/ha-subcomponent.js';
import styles from './area.styles.js';
import sharedStyles from '../../shared-resources/styles/shared-styles.js';
import './../../shared-resources/climate-components/climate-panel/climate-panel.js';

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

    getAreaName() {
        return this.title;
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
                    .title = ${this.getAreaName()}
                    .callService = ${this.callService}
                ></climate-panel>
                <div class="aux">
                    Auxiliary Placeholder
                </div>
            `
        }
    }

}

customElements.define("area-climate-panel", AreaClimatePanel);