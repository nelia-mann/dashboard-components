import { html } from 'lit';
import { repeat } from 'lit-html/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { brightness6, creationOutline } from '../../util/mdi-util.js';
import { rgba, ONLIGHT, INDIGO } from '../../util/color-util.js';
import { HaLightingComponent } from '../../base-classes/ha-lighting-component.js';
import styles from './control-select.styles.js';
import sharedStyles from '../../styles/shared-styles.js';
import '../light-icon/light-icon.js';
import '../brightness-slider/brightness-slider.js';
import '../colortemp-slider/colortemp-slider.js';
import '../color-wheel/color-wheel.js';
import '../theme-select/theme-select.js';

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

    /******************************* lifecycle *******************************/

    getTriggers() {
        return ["option"];
    }

    onFirstUpdate() {
        this.buildOptions();
    }

    /*********************** getter and setter logic ***********************/

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

    /************************* build options structure logic ***************/

    buildOptions() {
        let options = ['onOff'];
        this.hasBrightness() && options.push('brightness');
        this.hasCTColor() && options.push('color_temp_kelvin');
        this.hasHSColor() && options.push('hs_color');
        this.hasTheme() && options.push('theme');
        this._options = options;
    }

    /************************* interactive logic ***************************/

    onSelect(option) {
        this.dispatchEvent(new CustomEvent('select', { detail: option }));
    }

    /************************** html/style logic ***************************/

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

    iconContent(option) {
        let content;
        switch (option) {
            case 'onOff':
                content = html`<light-icon
                            .changedEntityIds=${this.getCEIs()}
                            .states=${this.getStates()}
                            .structure=${this.getStructure()}
                        ></light-icon>`;
                break;
            case 'brightness':
                content = html`<ha-svg-icon .path=${brightness6}></ha-svg-icon>`;
                break;
            case 'theme':
                content = html`<ha-svg-icon .path=${creationOutline}></ha-svg-icon>`;
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

    static styles = [sharedStyles, styles];

    render() {
        if (this.isInitialized()) {
            return html`${this.icons()}`
        }
    }

}

customElements.define("light-control-select", LightControlSelect);