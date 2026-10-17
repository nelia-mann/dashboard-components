import { html, css } from 'lit';
import { HaLightingComponent } from '../base-classes/ha-lighting-component.js';
import sharedStyles from '../styles/shared-styles.js';

export class LightComponent extends HaLightingComponent {

/********************************************** interactive logic *****************************************************/

    onClick() {
        const entityId = this.getMainId();
        const idStructure = entityId.split('.');
        const type = idStructure[0];
        const data = { entity_id: entityId };
        this.callService(type, 'toggle', data)
    }

/********************************************** html logic ************************************************************/

    render() {
        if (this.isInitialized()) {
            return html`
                <div class="light-element" @click=${this.onClick}>
                    <div class="icon">
                        <light-icon
                            .changedEntityIds=${this.getCEIs()}
                            .states=${this.getStates()}
                            .structure=${this.getStructure()}
                        />
                    </div>
                    ${this.getName()}
                </div>
            `;
        }
    }

/********************************************** style logic ***********************************************************/

    static styles = [sharedStyles, css`

        :host {
            width: var(--lc-width, 180px);
            height: var(--lc-height, 25px);
            padding: var(--lc-padding, 8px);
            margin: var(--lc-margin, 10px);
            margin-bottom: var(--lc-margin-bottom);
            display: flex;
            flex-flow: row nowrap;
            justify-content: flex-start;
            align-items: center;
        }

        .light-element {
            width: 100%;
            height: 100%;
            display: flex;
            flex-flow: row nowrap;
            align-items: var(--lcl-align-items, center);
            justify-content: var(--lcl-justify-content, flex-start);
            font-size: var(--lcl-font-size, 100%);
            font-weight: var(--lcl-font-weight, 400);
        }

        .icon {
            width: var(--lci-width, 20px);
            height: var(--lci-width, 20px);
            margin-left: var(--lci-margin-left, 0px);
            margin-right: var(--lci-margin-right, 10px);
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
        }

    `];

}

customElements.define("light-component", LightComponent);
