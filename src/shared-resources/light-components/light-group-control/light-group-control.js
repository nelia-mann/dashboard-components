import { html } from 'lit';
import { HaSubComponent } from '../../base-classes/ha-subcomponent.js';
import styles from './group.styles.js';
import sharedStyles from '../../styles/shared-styles.js';
import '../light-control/light-control.js';
import '../light-group-select/light-group-select.js';
import '../light-control-select/light-control-select.js';

export class LightGroupControl extends HaSubComponent {

    static properties = {
        ...super.properties,
        selectedId: { state: true },
        option: { state: true }
    }

    constructor() {
        super();
        this.lightId = '';
        this.themeId = '';
    }

    /******************************* lifecycle **********************************/

    getTriggers() {
        return ["selectedId", "option"];
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

    getOption() {
        return this.option;
    }

    setOption(option) {
        this.option = option;
    }

    isOption(option) {
        return (this.option === option);
    }

    /************************ interactive logic *******************************/

    onSelectLight(e) {
        const lightId = e.detail;
        this.setSelectedId(lightId);
    }

    onSelectControl(e) {
        const option = e.detail;
        if (option === 'onOff') {
            const entityId = this.getSelectedId();
            const data = { entity_id: entityId }
            this.callService('light', 'toggle', data)
            this.setOption(null);
        } else {
            if (option === this.getOption()) {
                this.setOption(null);
            } else {
                this.setOption(option);
            }
        }
    }

    /**************************** style/html logic ******************************/

    getClass() {
        if (this.isOption('brightness')
            || this.isOption('color_temp_kelvin')
            || this.isOption('theme')
            || this.isOption('hs_color')) {
            return "outlined"
        } else return "";
    }

    lightControl() {
        return html`
            <light-control
                class = ${this.getClass()}
                .changedEntityIds = ${this.getCEIs()}
                .lightState = ${this.selectedLightState()}
                .themeState = ${this.selectedThemeState()}
                .option = ${this.getOption()}
                .callService=${this.callService}
            > ping </light-control>
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
                @select = ${this.onSelectLight}
            ></light-group-select>
        `
    }

    lightControlSelect() {
        return html`
            <light-control-select
                class = "outlined"
                .changedEntityIds = ${this.getCEIs()}
                .lightState = ${this.selectedLightState()}
                .themeState = ${this.selectedThemeState()}
                .option = ${this.getOption()}
                @select = ${this.onSelectControl}
            > ping </light-control-select>
        `
    }

    static styles = [sharedStyles, styles];

    render() {
        if (this.isInitialized()) {
            return html`
                ${this.lightGroupSelect()}
                ${this.lightControlSelect()}
                ${this.lightControl()}
            `
        }
    }

}

customElements.define("light-group-control", LightGroupControl);