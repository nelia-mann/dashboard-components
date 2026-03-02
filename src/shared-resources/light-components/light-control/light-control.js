import { html } from 'lit';
import { getEntityId } from '../../util/state-util.js';
import { HaSubComponent } from '../../base-classes/ha-subcomponent.js';
import styles from './light-control.styles.js';
import sharedStyles from '../../styles/shared-styles.js';
import '../light-icon/light-icon.js';
import '../brightness-slider/brightness-slider.js';
import '../colortemp-slider/colortemp-slider.js';
import '../color-wheel/color-wheel.js';
import '../theme-select/theme-select.js';

export class LightControl extends HaSubComponent {

    static properties = {
        ...super.properties,
        lightState: { state: true },
        themeState: { state: true },
        option: { state: true }
    }

    constructor() {
        super();
        this.lightState = {};
        this.themeState = {};
        this.option = '';
    }

    /******************************* lifecycle *******************************/

    getTriggers() {
        return ["lightState", "option"];
    }

    /*********************** getter and setter logic ***********************/

    getLightState() {
        return this.lightState;
    }

    getThemeState() {
        return this.themeState;
    }

    getOption() {
        return this.option;
    }

    isSelected(option) {
        return (this.getOption() === option);
    }

    getEntityIds() {
        let entityIds = [getEntityId(this.getLightState())];
        const themeState = this.getThemeState();
        (themeState) && (entityIds.push(getEntityId(themeState)));
        return new Set(entityIds);
    }

    /************************** html/style logic ***************************/

    brightnessBar() {
        return html`
            <brightness-slider
                .changedEntityIds=${this.getCEIs()}
                .lightState=${this.getLightState()}
                .callService=${this.callService}
            ></brightness-slider>`
    }

    ctBar() {
        return html`
            <colortemp-slider
                .changedEntityIds=${this.getCEIs()}
                .lightState=${this.getLightState()}
                .callService=${this.callService}
            ></colortemp-slider>`
    }

    colorWheel() {
        return html`<color-wheel
            .changedEntityIds = ${this.getCEIs()}
            .lightState = ${this.getLightState()}
            .callService = ${this.callService}
        ></color-wheel>`
    }

    themeSelect() {
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
            default:
                panel = '';
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