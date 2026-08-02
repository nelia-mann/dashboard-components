import { html, css } from 'lit';
import { HaLightingComponent } from '../base-classes/ha-lighting-component.js';
import sharedStyles from '../styles/shared-styles.js';
import './light-icon.js';
import './brightness-slider.js';
import './colortemp-slider.js';
import './color-wheel.js';
import './theme-select.js';

export class LightControl extends HaLightingComponent {

    static properties = {
        ...super.properties,
        option: { state: true }
    }

    constructor() {
        super();
        this.option = '';
    }

/********************************************** lifecycle *************************************************************/

    getTriggers() {
        return ["option"];
    }

/********************************************** getter & setter logic *************************************************/

    getOption() {
        return this.option;
    }

/********************************************** html logic ************************************************************/


    brightnessBar() {
        return html`
            <brightness-slider
                .changedEntityIds=${this.getCEIs()}
                .states = ${this.getStates()}
                .structure=${this.getStructure()}
                .entityIds = ${new Set([this.getMainId()])}
                .callService=${this.callService}
            />`;
    }

    ctBar() {
        return html`
            <colortemp-slider
                .changedEntityIds=${this.getCEIs()}
                .states = ${this.getStates()}
                .structure=${this.getStructure()}
                .entityIds = ${new Set([this.getMainId()])}
                .callService=${this.callService}
            />`;
    }

    colorWheel() {
        return html`<color-wheel
            .changedEntityIds = ${this.getCEIs()}
            .states = ${this.getStates()}
            .structure=${this.getStructure()}
            .entityIds = ${new Set([this.getMainId()])}
            .callService = ${this.callService}
        />`;
    }

    themeSelect() {
        return html`<theme-select
            .changedEntityIds = ${this.getCEIs()}
            .states = ${this.getStates()}
            .structure=${this.getStructure()}
            .entityIds = ${new Set([this.getThemeId()])}
            .callService = ${this.callService}
        />`;
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

    render() {
        if (this.isInitialized()) {
            return html`
                ${this.optionControl()}
            `
        }
    }

/********************************************** style logic ***********************************************************/

    static styles = [sharedStyles, css`

        :host {
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: center;
            padding: var(--light-control-padding, 20px);
            margin-left: var(--light-control-margin-left, 20px);
            margin-right: var(--light-control-margin-right, 10px);
            margin: var(--light-control-margin);
            min-height: var(--light-control-minsize);
            min-width: var(--light-control-minsize);
        }

    `];

}

customElements.define("light-control", LightControl);
