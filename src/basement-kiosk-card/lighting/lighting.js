import { html } from 'lit';
import { HaSubComponent } from '../../shared-resources/base-classes/ha-subcomponent.js';
import styles from './lighting.styles.js';
import sharedStyles from '../../shared-resources/styles/shared-styles.js';
import '../basic-lighting/basic-lighting.js';
import '../led-lighting/led-lighting.js';

export class LightingPanel extends HaSubComponent {



    /****************************** getter and setter logic **************************/

    getSubDict(option) {
        return this.getStructure()[option];
    }

    getSubStructure(option) {
        return this.getSubDict(option).structure;
    }

    getSubEntityIds(option) {
        return this.getSubDict(option).entityIds;
    }


    /****************************** html/style logic *********************************/

    static styles = [sharedStyles, styles];

    basicLightingPanel() {
        return html`
            <basic-lighting-panel
                class="outlined"
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .structure = ${this.getSubStructure("basic_lighting")}
                .entityIds = ${this.getSubEntityIds("basic_lighting")}
                .callService=${this.callService}
            ></basic-lighting-panel>
        `
    }

    ledLightingPanel() {
        return html`
            <led-lighting-panel
                class="outlined"
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .structure = ${this.getSubStructure("leds")}
                .entityIds = ${this.getSubEntityIds("leds")}
                .callService=${this.callService}
            ></led-lighting-panel>
        `
    }

    render() {
        if (this.isInitialized()) {
            return html`
                ${this.basicLightingPanel()}
                ${this.ledLightingPanel()}
            `
        }
    }

}

customElements.define("lighting-panel", LightingPanel);