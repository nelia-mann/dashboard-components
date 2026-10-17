import { html, css } from 'lit';
import { keyed } from 'lit/directives/keyed.js';
import { HaLightingComponent } from '../base-classes/ha-lighting-component.js';
import sharedStyles from '../styles/shared-styles.js';
import './light-control.js';
import './light-group-select.js';
import './light-control-select.js';

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

/********************************************** lifecycle *************************************************************/

    getTriggers() {
        return ["selectedId", "option"];
    }

    onFirstUpdate() {
        this.setSelectedId(this.getMainId());
        this.setDefaultOption();
    }

/********************************************** getter & setter logic *************************************************/

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

/********************************************** interactive logic *****************************************************/

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

/********************************************** html logic ************************************************************/

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
            />`;
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
            />`);
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

    render() {
        if (this.isInitialized()) {
            return html`
                ${this.lightGroupSelect()}
                <div class = "controls">
                    ${this.lightControls()}
                </div>
            `
        }
    }

/********************************************** style logic ***********************************************************/

    static styles = [sharedStyles, css`

        :host {
            height: var(--lg-height);
            width: var(--lg-width);
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-between;
            align-items: center;
            padding: var(--lg-padding, 20px);
            padding-bottom: var(--lg-padding-bottom);
            margin-top: var(--lg-margin-top);
            margin-bottom: var(--lg-margin-bottom);
        }

        .controls {
            height: var(--lgcc-height);
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-around;
            align-items: center;
        }

    `];

}

customElements.define("light-group-control", LightGroupControl);
