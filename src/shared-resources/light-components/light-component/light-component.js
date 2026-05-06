import { html } from 'lit';
import { HaLightingComponent } from '../../base-classes/ha-lighting-component.js';
import styles from './light.styles.js';
import sharedStyles from '../../styles/shared-styles.js';

export class LightComponent extends HaLightingComponent {

    /********************************* interactive logic **********************************/

    onClick() {
        const entityId = this.getMainId();
        const idStructure = entityId.split('.');
        const type = idStructure[0];
        const data = { entity_id: entityId };
        this.callService(type, 'toggle', data)
    }

    /************************************ style/html logic **********************************/

    static styles = [sharedStyles, styles];

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

}

customElements.define("light-component", LightComponent);