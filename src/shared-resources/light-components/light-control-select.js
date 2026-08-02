import { html, css } from 'lit';
import { repeat } from 'lit-html/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { brightness6, creationOutline } from '../util/mdi-util.js';
import { rgba, ONLIGHT, INDIGO } from '../util/color-util.js';
import { HaLightingComponent } from '../base-classes/ha-lighting-component.js';
import sharedStyles from '../styles/shared-styles.js';
import './light-icon.js';
import './brightness-slider.js';
import './colortemp-slider.js';
import './color-wheel.js';
import './theme-select.js';

export class LightControlSelect extends HaLightingComponent {

    static properties = {
        ...super.properties,
        option: { state: true }
    }

    constructor() {
        super();
        this.option = '';
        this._options = [];
    }

/********************************************** lifecycle *************************************************************/

    getTriggers() {
        return ["option"];
    }

    onFirstUpdate() {
        this.buildOptions();
    }

/********************************************** getter & setter logic *************************************************/

    getOption() {
        return this.option;
    }

    setOption(option) {
        this.option = option;
    }

    isSelected(option) {
        return (this.getOption() === option);
    }

    getOptions() {
        return this._options;
    }

    buildOptions() {
        let options = ['onOff'];
        this.hasBrightness() && options.push('brightness');
        this.hasCTColor() && options.push('color_temp_kelvin');
        this.hasHSColor() && options.push('hs_color');
        this.hasTheme() && options.push('theme');
        if (options.length === 2) {
            options = ['onOff'];
        }
        if (options.includes('color_temp_kelvin')) {
            const index = options.indexOf('brightness');
            if (index > -1) {
                options.splice(index, 1);
            }
        }
        this._options = options;
    }

/********************************************** interactive logic *****************************************************/

    onSelect(option) {
        this.dispatchEvent(new CustomEvent('select', { detail: option }));
    }

/********************************************** html logic ************************************************************/

    iconContent(option) {
        let content;
        switch (option) {
            case 'onOff':
                content = html`<light-icon
                            .changedEntityIds=${this.getCEIs()}
                            .states=${this.getStates()}
                            .structure=${this.getStructure()}
                        />`;
                break;
            case 'brightness':
                content = html`<ha-svg-icon .path=${brightness6}/>`;
                break;
            case 'color_temp_kelvin':
                content = html`<ha-svg-icon .path=${brightness6}/>`;
                break;                
            case 'theme':
                content = html`<ha-svg-icon .path=${creationOutline}/>`;
                break;
        }
        return content;
    }

    icons() {
        return repeat(this.getOptions(), (option) => option, option => {
            return html`
                <div
                    class="icon-window outlined"
                    style=${styleMap(this.getStyles(option))}
                    @click=${() => this.onSelect(option)}
                >
                    <div class="icon">
                        ${this.iconContent(option)}
                    </div>
                </div>
            `
        })
    }

    render() {
        if (this.isInitialized()) {
            return html`${this.icons()}`
        }
    }

/********************************************** style logic ***********************************************************/

    getStyles(option) {
        let styles = {};
        let outline = '';
        switch (option) {
            case 'brightness':
                styles['background'] = rgba(ONLIGHT, .2);
                outline = rgba(ONLIGHT, 1);
                break;
            case 'color_temp_kelvin':
                styles['background'] = this.tempGradientFull();
                outline = this.tempBorder();
                break;
            case 'hs_color':
                styles['background'] = this.hsGradient();
                outline = rgba(INDIGO, 1)
                break;
            case 'theme':
                styles['background'] = rgba(ONLIGHT, .2);
                outline = rgba(ONLIGHT, 1)
                break;
        }
        if (this.isSelected(option)) {
            styles['outline'] = 'solid ' + outline;
        }
        return styles;
    }

    static styles = [sharedStyles, css`

        :host {
            display: flex;
            flex-flow: var(--control-select-flex-flow, column nowrap);
            justify-content: var(--control-select-justify-content, space-around);
            align-items: var(--control-select-align-items, center);
            margin-left: var(--control-select-margin-left, 10px);
            margin-top: var(--control-select-margin-top, 0px);
            width: var(--control-select-width);
            height: var(--control-select-height, 100%);
        }

        .icon-window {
            width: var(--control-select-icon-window-width, 30px);
            height: var(--control-select-icon-window-width, 30px);
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: var(--control-select-icon-window-margin, 10px);
            outline-offset: var(--control-select-outline-offset, -2px);
            outline: none;
        }

        .doublewide {
            width: calc(2 * var(--control-select-icon-window-width, 30px));
            height: var(--control-select-icon-window-width, 30px);
            border-radius: 40%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: var(--control-select-icon-window-margin, 10px);
            outline-offset: var(--control-select-outline-offset, -2px);
            outline: none;
        }

        .icon {
            width: var(--control-select-icon-size, 20px);
            height: var(--control-select-icon-size, 20px);
            margin: 0px;
            padding: 0px;
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
        }

        ha-svg-icon {
            --mdc-icon-size: 100%;
        }

    `];

}

customElements.define("light-control-select", LightControlSelect);
