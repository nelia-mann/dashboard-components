import { html, css } from 'lit';
import { HaLightingComponent } from '../base-classes/ha-lighting-component.js';
import sharedStyles from '../styles/shared-styles.js';

export class LightComponent extends HaLightingComponent {

    /********************************************** interactive logic ***************************************************/

    onClick() {
        const entityId = this.getMainId();
        const idStructure = entityId.split('.');
        const type = idStructure[0];
        const data = { entity_id: entityId };
        this.callService(type, 'toggle', data)
    }

    /********************************************** html logic **********************************************************/

    render() {
        if (this.isInitialized()) {
            return html`
                <div class="light-element" @click=${this.onClick}>
                    <div class="icon">
                        <light-icon
                            .changedEntityIds=${this.getCEIs()}
                            .states=${this.getStates()}
                            .structure=${this.getStructure()}
                        ></light-icon>
                    </div>
                    ${this.getName()}
                </div>
            `;
        }
    }

    /********************************************** style logic *********************************************************/

    static styles = [sharedStyles, css`

    :host {
        width: var(--light-component-width, 180px);
        height: var(--light-component-height, 25px);
        padding: var(--light-component-padding, 8px);
        margin: var(--light-component-margin, 10px);
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
        align-items: var(--simple-light-align-items, center);
        justify-content: var(--simple-light-justify-content, flex-start);
        font-size: var(--simple-light-font-size, 100%);
        font-weight: var(--simple-light-font-weight, 400);
    }

    .icon {
        width: var(--simple-light-icon-size, 20px);
        height: var(--simple-light-icon-size, 20px);
        margin-left: var(--simple-light-icons-margin-left, 0px);
        margin-right: var(--simple-light-icons-margin-right, 10px);
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
    }

`];

}

customElements.define("light-component", LightComponent);
