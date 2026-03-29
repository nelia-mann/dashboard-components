import { html } from 'lit';
import { repeat } from 'lit-html/directives/repeat.js';
import { HaSubComponent } from '../../base-classes/ha-subcomponent.js';
import styles from './area.styles.js';
import sharedStyles from '../../styles/shared-styles.js';
import '../light-component/light-component.js';

export class AreaPanel extends HaSubComponent {

    constructor() {
        super();
        this.name = '';
    }

    getAreaName() {
        return this.name;
    }

    getSubStructure(lightId) {
        return this.getStructure()[lightId].structure;
    }

    getSubEIs(lightId) {
        return this.getStructure()[lightId].entityIds;
    }

    getThemeId(lightId) {
        return this.getStructure()[lightId].theme;
    }

    getLightDisplay(lightId) {
        return html`
            <light-component
                class="outlined"
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .lightId = ${lightId}
                .themeId = ${this.getThemeId(lightId)}
                .structure = ${this.getSubStructure(lightId)}
                .entityIds = ${this.getSubEIs(lightId)}
                .callService=${this.callService}
            ></light-component>
        `
    }

    static styles = [sharedStyles, styles];

    render() {
        if (this.isInitialized()) {
            const lightIds = Object.keys(this.getStructure());
            return html`
                <div class="heading">${this.getAreaName()}</div>
                ${repeat(lightIds, (lightId) => lightId, lightId => this.getLightDisplay(lightId))}
            `
        }
    }
}

customElements.define("area-panel", AreaPanel);