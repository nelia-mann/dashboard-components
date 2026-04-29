import { html } from 'lit';
import { getBrightness, getColorModes } from '../util/light-util.js';
import { HaSubComponent } from '../../base-classes/ha-subcomponent.js';
import styles from './light.styles.js';
import sharedStyles from '../../styles/shared-styles.js';
import '../simple-light/simple-light.js';

export class LightComponent extends HaSubComponent {

    constructor() {
        super();
        this.lightId = '';
    }


    /********************** getter and setter logic ********************************************/

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

    /********************************* interactive logic **********************************/

    onClick() {
        const entityId = this.getMainId();
        const idStructure = entityId.split('.');
        const type = idStructure[0];
        const data = { entity_id: entityId };
        this.callService(type, 'toggle', data)
    }

    /************************************ style/html logic **********************************/

    simpleLight() {
        return html`
            <simple-light
                .changedEntityIds=${this.getCEIs()}
                .states=${this.getStates()}
                .lightId=${this.getMainId()}
                .structure=${this.getStructure()}
                .entityIds=${this.getEntityIds()}
                @click=${this.onClick}
            >
        `
    }

    static styles = [sharedStyles, styles];

    render() {
        if (this.isInitialized()) {
            return html`
                ${this.simpleLight()}
            `
        }
    }

}

customElements.define("light-component", LightComponent);