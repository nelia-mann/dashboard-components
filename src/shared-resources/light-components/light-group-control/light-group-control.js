import { html } from 'lit';
import { keyed } from 'lit/directives/keyed.js';
import { HaLightingComponent } from '../../base-classes/ha-lighting-component.js';
import styles from './group.styles.js';
import sharedStyles from '../../styles/shared-styles.js';
import '../light-control/light-control.js';
import '../light-group-select/light-group-select.js';
import '../light-control-select/light-control-select.js';

export class LightGroupControl extends HaLightingComponent {

    static properties = {
        ...super.properties,
        selectedId: { state: true },
        option: { state: true }
    }

    constructor() {
        super();
        this.option = '';
        this.selectedId = '';
    }

    /******************************* lifecycle **********************************/

    getTriggers() {
        return ["selectedId", "option"];
    }

    onFirstUpdate() {
        this.setSelectedId(this.getMainId());
        this.setDefaultOption();
    }

    /************************ getter and setter logic *************************/

    getOption() {
        return this.option;
    }

    setOption(option) {
        this.option = option;
    }

    isOption(option) {
        return (this.option === option);
    }

    isSelected(lightId) {
        return (this.selectedId === lightId);
    }

    getSelectedId() {
        return this.selectedId;
    }

    setSelectedId(lightId) {
        this.selectedId = lightId;
    }

    setDefaultOption() {
        if (this.hasCTColor(this.getSelectedId())) {
            this.setOption('color_temp_kelvin');
        } else if (this.hasBrightness(this.getSelectedId())) {
            this.setOption('brightness');
        } else {
            this.setOption(null);
        }
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
            const idStructure = entityId.split('.');
            const type = idStructure[0];
            const data = { entity_id: entityId };
            this.callService(type, 'toggle', data)
            this.setDefaultOption();
        } else {
            if (option === this.getOption()) {
                this.setDefaultOption();
            } else {
                this.setOption(option);
            }
        }
    }

    /**************************** style/html logic ******************************/

    getClass() {
        let string = "";
        if (this.isOption('brightness')
            || this.isOption('color_temp_kelvin')
            || this.isOption('theme')
            || this.isOption('hs_color')) {
            string = string + "outlined"
        };
        if (this.getLightState().state === "off") {
            string = string + " inactive";
        }
        return string;
    }

    lightGroupSelect() {
        return html`
            <light-group-select
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .structure = ${this.getStructure()}
                .entityIds = ${this.getEntityIds()}
                .selectedId = ${this.getSelectedId()}
                .option = ${this.getOption()}
                @select = ${this.onSelectLight}
                @select_control = ${this.onSelectControl}
            ></light-group-select>
        `
    }

    lightControlSelect() {
        return keyed(this.getSelectedId(), html`
            <light-control-select
                class = "outlined"
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .structure = ${this.getThisStructure(this.getSelectedId())}
                .entityIds = ${this.getSelectedId()}
                .option = ${this.getOption()}
                @select = ${this.onSelectControl}
            ></light-control-select>
        `)
    }

    lightControl(option) {
        return keyed(this.getSelectedId(), html`
            <light-control
                class = ${this.getClass()}
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .entityIds = ${this.getTheseEntityIds(this.getSelectedId())}
                .structure = ${this.getThisStructure(this.getSelectedId())}
                .option = ${option}
                .callService=${this.callService}
            ></light-control>
        `)
    }

    lightControls() {
        if (this.getOption()) {
            if (this.getOption() === 'color_temp_kelvin') {
                return [this.lightControl('brightness'), this.lightControl('color_temp_kelvin')];
            } else {
                return this.lightControl(this.getOption());
            }
        }
    }

    static styles = [sharedStyles, styles];

    render() {
        if (this.isInitialized()) {
            return html`
                ${this.lightGroupSelect()}
                ${this.lightControls()}
            `
        }
    }

}

customElements.define("light-group-control", LightGroupControl);