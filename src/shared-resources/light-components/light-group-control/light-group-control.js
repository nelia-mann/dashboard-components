import { html } from 'lit';
import { repeat } from 'lit-html/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { getColor } from '../util/light-util.js';
import { getName, isGroup } from '../../util/state-util.js';
import { HaSubComponent } from '../../base-classes/ha-subcomponent.js';
import styles from './group.styles.js';
import sharedStyles from '../../styles/shared-styles.js';
import '../light-control/light-control.js';
import '../light-group-select/light-group-select.js';

export class LightGroupControl extends HaSubComponent {

    static properties = {
        ...super.properties,
        selectedId: { state: true }
    }

    constructor() {
        super();
        this.lightId = '';
        this.themeId = '';
    }

    /******************************* lifecycle **********************************/

    getTriggers() {
        return ["selectedId"];
    }

    onFirstUpdate() {
        this.setSelectedId(this.getMainId());
    }

    /************************ getter and setter logic *************************/

    isSelected(lightId) {
        return (this.selectedId === lightId);
    }

    getState(entityId) {
        return this.states[entityId];
    }

    getSelectedId() {
        return this.selectedId;
    }

    setSelectedId(lightId) {
        this.selectedId = lightId;
    }

    getMainId() {
        return this.lightId;
    }

    selectedLightState() {
        return this.getState(this.getSelectedId());
    }

    selectedThemeState() {
        let themeId;
        if (this.isSelected(this.getMainId())) {
            themeId = this.themeId;
        } else {
            themeId = this.getStructure()[this.getSelectedId()].theme;
        }
        if (themeId) {
            return this.getState(themeId);
        }
    }

    /************************ interactive logic *******************************/

    onSelect(e) {
        const lightId = e.detail;
        this.setSelectedId(lightId);
    }

    /**************************** style/html logic ******************************/

    lightControl() {
        return html`
            <light-control
                .changedEntityIds = ${this.getCEIs()}
                .lightState = ${this.selectedLightState()}
                .themeState = ${this.selectedThemeState()}
                .callService=${this.callService}
            ></light-control>
        `
    }

    lightGroupSelect() {
        return html`
            <light-group-select
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .lightId = ${this.getMainId()}
                .structure = ${this.getStructure()}
                .entityIds = ${this.getEntityIds()}
                .selectedId = ${this.getSelectedId()}
                @select = ${this.onSelect}
            ></light-group-select>
        `
        }

    static styles = [sharedStyles, styles];

    render() {
        if (this.isInitialized()) {
            const name = getName(this.getState(this.getMainId()));
            return html`
                ${this.lightGroupSelect()}
                ${this.lightControl()}
            `
        }
    }

}

customElements.define("light-group-control", LightGroupControl);