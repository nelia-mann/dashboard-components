import { html } from 'lit';
import { HaSubComponent } from '../../shared-resources/base-classes/ha-subcomponent.js';
import styles from './led.styles.js';
import sharedStyles from '../../shared-resources/styles/shared-styles.js';
import '../../shared-resources/light-components/light-group-control/light-group-control.js';

export class LEDLightingPanel extends HaSubComponent {


    /******************************* getter and setter logic *************************/

    getMainId() {
        return Object.keys(this.getStructure())[0]
    }

    getThemeId() {
        return this.getStructure()[this.getMainId()].theme;
    }

    getSubStructure() {
        return this.getStructure()[this.getMainId()].structure;
    }

    /****************************** html/style logic *********************************/

    static styles = [sharedStyles, styles];

    contents() {
        return html`
            <div class="large-heading"> LED Lighting </div>
            <light-group-control
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .lightId = ${this.getMainId()}
                .themeId = ${this.getThemeId()}
                .structure = ${this.getSubStructure()}
                .entityIds = ${this.getEntityIds()}
                .callService=${this.callService}
            ></light-group-control>
        `
    }

    render() {
        if (this.isInitialized()) {
            return this.contents();
        }
    }

}

customElements.define("led-lighting-panel", LEDLightingPanel);