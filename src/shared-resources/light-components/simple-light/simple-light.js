import { html } from 'lit';
import { repeat } from 'lit-html/directives/repeat.js';
import { getName } from '../../util/state-util.js';
import { HaSubComponent } from '../../base-classes/ha-subcomponent.js';
import styles from './light.styles.js';
import sharedStyles from '../../styles/shared-styles.js';
import '../../light-components/light-icon/light-icon.js';

export class SimpleLight extends HaSubComponent {

    constructor() {
        super();
        this.lightId = '';
    }

    /********************************** getter and setter logic *****************************/

    getLightState(lightId) {
        return this.getStates()[lightId];
    }

    getMainId() {
        return this.lightId;
    }

    getMainState() {
        return this.getLightState(this.getMainId());
    }

    getLightIds() {
        return Object.keys(this.getStructure());
    }

    /********************************** interactive logic ***********************************/

    onClick() {
        if (this.callService) {
            const entityId = this.getMainId();
            const idStructure = entityId.split('.');
            const type = idStructure[0];
            const data = { entity_id: entityId };
            this.callService(type, 'toggle', data)
        }
    }

    /************************************ style/html logic **********************************/

    icons() {
        let result;
        let lightIds = this.getLightIds();
        (lightIds.length === 0) && (lightIds = [this.getMainId()])
        result = repeat(lightIds, (lightId) => lightId, (lightId) => {
            return html`<div class="icon">
                    <light-icon
                        .changedEntityIds=${this.getCEIs()}
                        .lightState=${this.getLightState(lightId)}
                    ></light-icon>
                </div>
                `
        })
        return result;
    }

    static styles = [sharedStyles, styles];

    render() {
        if (this.isInitialized()) {
            return html`
                <div class="light-element sub-info" @click=${this.onClick}>
                    <div class="icons">
                        ${this.icons()}
                    </div>
                    ${getName(this.getMainState())}
                </div>
            `
        }
    }

}

customElements.define("simple-light", SimpleLight);