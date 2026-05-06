import { html } from 'lit';
import { HaLightingComponent } from '../../base-classes/ha-lighting-component.js';
import styles from './light-control.styles.js';
import sharedStyles from '../../styles/shared-styles.js';
import '../light-icon/light-icon.js';
import '../brightness-slider/brightness-slider.js';
import '../colortemp-slider/colortemp-slider.js';
import '../color-wheel/color-wheel.js';
import '../theme-select/theme-select.js';

export class LightControl extends HaLightingComponent {

    static properties = {
        ...super.properties,
        option: { state: true }
    }

    constructor() {
        super();
        this.option = '';
    }

    /******************************* lifecycle *******************************/

    getTriggers() {
        return ["option"];
    }

    /*********************** getter and setter logic ***********************/

    getOption() {
        return this.option;
    }

    /************************** html/style logic ***************************/

    brightnessBar() {
        return html`
            <brightness-slider
                .changedEntityIds=${this.getCEIs()}
                .states = ${this.getStates()}
                .structure=${this.getStructure()}
                .entityIds = ${new Set([this.getMainId()])}
                .callService=${this.callService}
            ></brightness-slider>`
    }

    ctBar() {
        return html`
            <colortemp-slider
                .changedEntityIds=${this.getCEIs()}
                .states = ${this.getStates()}
                .structure=${this.getStructure()}
                .entityIds = ${new Set([this.getMainId()])}
                .callService=${this.callService}
            ></colortemp-slider>`
    }

    colorWheel() {
        return html``;
        return html`<color-wheel
            .changedEntityIds = ${this.getCEIs()}
            .lightState = ${this.getLightState()}
            .callService = ${this.callService}
        ></color-wheel>`
    }

    themeSelect() {
        return html``;
        return html`<theme-select
            .changedEntityIds = ${this.getCEIs()}
            .themeState = ${this.getThemeState()}
            .callService = ${this.callService}
        ></theme-select>
        `
    }

    optionControl() {
        let panel;
        switch (this.getOption()) {
            case 'brightness':
                panel = this.brightnessBar();
                break;
            case 'color_temp_kelvin':
                panel = this.ctBar();
                break;
            case 'hs_color':
                panel = this.colorWheel();
                break;
            case 'theme':
                panel = this.themeSelect();
                break;
        }
        return panel;
    }

    static styles = [sharedStyles, styles];

    render() {
        if (this.isInitialized()) {
            return html`
                ${this.optionControl()}
            `
        }
    }

}

customElements.define("light-control", LightControl);