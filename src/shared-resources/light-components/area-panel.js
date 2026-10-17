import { html, css } from 'lit';
import { repeat } from 'lit-html/directives/repeat.js';
import { HaSubComponent } from '../base-classes/ha-subcomponent.js';
import sharedStyles from '../styles/shared-styles.js';
import './light-component.js';

export class AreaPanel extends HaSubComponent {

    constructor() {
        super();
        this.name = '';
    }

/********************************************** getter & setter logic *************************************************/

    getAreaName() {
        return this.name;
    }

    getSubStructure(lightId) {
        return this.getStructure()[lightId].structure;
    }

    getSubEIs(lightId) {
        return this.getStructure()[lightId].entityIds;
    }

/********************************************** html logic ************************************************************/

    getLightDisplay(lightId) {
        return html`
            <light-component
                class="outlined"
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .structure = ${this.getSubStructure(lightId)}
                .entityIds = ${this.getSubEIs(lightId)}
                .callService=${this.callService}
            />`;
    }

    render() {
        if (this.isInitialized()) {
            const lightIds = Object.keys(this.getStructure());
            return html`
                <div class="heading"> ${this.getAreaName()} </div>
                ${repeat(lightIds, (lightId) => lightId, lightId => this.getLightDisplay(lightId))}
            `
        }
    }

/********************************************** style logic ***********************************************************/

    static styles = [sharedStyles, css`

        :host {
            margin-left: var(--ap-margin-left, 10px);
            margin-right: var(--ap-margin-right, 10px);
            margin-top: var(--ap-margin-top, 20px);
            width: var(--ap-width);
            height: var(--ap-height);
            padding: var(--ap-padding, 0px);
            display: flex;
            flex-flow: column nowrap;
            justify-content: var(--ap-justify-content);
            align-items: var(--ap-align-items);
        }

        .heading {
            font-size: var(--aph-font-size, 100%);
            font-weight: var(--aph-font-weight, 700);
            margin-bottom: var(--aph-margin-bottom);
        }

    `];

}

customElements.define("area-panel", AreaPanel);
