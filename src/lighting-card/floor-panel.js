import { html, css } from 'lit';
import { repeat } from 'lit-html/directives/repeat.js';
import { HaSubComponent } from '../shared-resources/base-classes/ha-subcomponent.js';
import sharedStyles from '../shared-resources/styles/shared-styles.js';
import '../shared-resources/light-components/light-group-control.js';
import '../shared-resources/light-components/area-list-panel.js';


export class FloorPanel extends HaSubComponent {

/********************************************** getter & setter logic *************************************************/

    getBasicLighting() {
        return this.getStructure().basic_lighting;
    }

    getBasicLightingStructure() {
        return this.getBasicLighting().structure;
    }

    getBasicLightingEIs() {
        return this.getBasicLighting().entityIds;
    }

    getSpecialLights() {
        return this.getStructure().special_lights.structure;
    }

    getSpecialTheme(specialId) {
        return this.getSpecialLights()[specialId].theme;
    }

/********************************************** html logic ************************************************************/

    getAreaListDisplay() {
        return html`
            <area-list-panel
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .structure = ${this.getBasicLightingStructure()}
                .entityIds = ${this.getBasicLightingEIs()}
                .callService=${this.callService}
            />`;
    }

    getSpecialDisplay(specialId) {
        return html`
            <light-group-control
                class="outlined"
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .structure = ${this.getSpecialLights()[specialId].structure}
                .entityIds = ${this.getSpecialLights()[specialId].entityIds}
                .callService = ${this.callService}
            />`;
    }

    getSpecialDisplays() {
        const specialIds = Object.keys(this.getSpecialLights());
        return html`${repeat(specialIds, (specialId) => specialId, (specialId) => this.getSpecialDisplay(specialId))}`
    }

    render() {
        if (this.isInitialized()) {
            return html`
                ${this.getAreaListDisplay()}
                <div class = "special-panel">
                    ${this.getSpecialDisplays()}
                </div>
                `
        }
    }

/********************************************** style logic ***********************************************************/

    static styles = [sharedStyles, css`

        :host {
            width: var(--fp-width, 100%);
            height: var(--fp-height, 400px);
            display: flex;
            flex-flow: column wrap;
            justify-content: flex-start;
            align-items: flex-start;
        }

        .special-panel {
            height: 100%;
            width: var(--fpsp-width);
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: center;
        }

    `];

}

customElements.define("floor-panel", FloorPanel);