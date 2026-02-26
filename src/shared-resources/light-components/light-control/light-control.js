import { html } from 'lit';
import { repeat } from 'lit-html/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { brightness6, creationOutline } from '../../util/mdi-util.js';
import { rgba, ONLIGHT, INDIGO } from '../../util/color-util.js';
import { getColorModes, getBrightness, tempGradientFull, tempBorder, hsGradient } from '../util/light-util.js';
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
        _option: { state: true }
    }

    constructor() {
        super();
        this.lightState = {};
        this.themeState = {};
        this._option = '';
        this._options = [];
    }

    /******************************* lifecycle *******************************/

    updateTrigger(changedProps) {
        return changedProps.has("lightState") || changedProps.has("_option")
    }

    onFirstUpdate() {
        this.buildOptions();
    }

    /*********************** getter and setter logic ***********************/

    getLightState() {
        return this.lightState;
    }

    getThemeState() {
        return this.themeState;
    }

    getOption() {
        return this._option;
    }

    setOption(option) {
        this._option = option;
    }

    isSelected(option) {
        return (this.getOption() === option);
    }

    getOptions() {
        return this._options;
    }

    getEntityIds() {
        let entityIds = [getEntityId(this.getLightState())];
        const themeState = this.getThemeState();
        (themeState) && (entityIds.push(getEntityId(themeState)));
        return new Set(entityIds);
    }

    /************************* build options structure logic ***************/


    isBrightness() {
        return (getBrightness(this.getLightState()) !== undefined);
    }

    isHSColor() {
        return (getColorModes(this.getLightState()).includes('hs'));
    }

    isCTColor() {
        return (getColorModes(this.getLightState()).includes('color_temp'));
    }

    isTheme() {
        return (this.getThemeState() && Object.keys(this.getThemeState()).length > 0);
    }

    buildOptions() {
        let options = ['onOff'];
        (this.isBrightness()) && (options.push('brightness'));
        (this.isCTColor()) && (options.push('color_temp_kelvin'));
        (this.isHSColor()) && (options.push('hs_color'));
        (this.isTheme()) && (options.push('theme'));
        this._options = options;
    }

    /************************* interactive logic ***************************/

    onSelect(option) {
        if (option === 'onOff') {
            const entityId = getEntityId(this.getLightState());
            const data = { entity_id: entityId }
            this.callService('light', 'toggle', data)
            this.setOption(null);
        } else {
            this.setOption(option);
        }
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
                styles['background'] = tempGradientFull();
                outline = tempBorder();
                break;
            case 'hs_color':
                styles['background'] = hsGradient();
                outline = rgba(INDIGO, 1)
                break;
            case 'theme':
                styles['background'] = rgba(ONLIGHT, .2);
                outline = rgba(ONLIGHT, 1)
                break;
        }
        if (this.isSelected(option)) {
            styles['outline-offset'] = '-2px';
            styles['outline'] = 'solid ' + outline;
        }
        return styles;
    }

    iconContent(option) {
        let content;
        switch (option) {
            case 'onOff':
                content = html`<light-icon
                        .changedEntityIds = ${this.getCEIs()}
                        .lightState=${this.getLightState()}
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
                    class="icon outlined"
                    style=${styleMap(this.getStyles(option))}
                    @click=${() => this.onSelect(option)}
                >
                    ${this.iconContent(option)}
                </div>
            `
        })
    }

    brightnessBar() {
        return html`
            <brightness-slider
                class="outlined"
                .changedEntityIds=${this.getCEIs()}
                .lightState=${this.getLightState()}
                .callService=${this.callService}
            ></brightness-slider>`
    }

    ctBar() {
        return html`
            <colortemp-slider
                class="outlined"
                .changedEntityIds=${this.getCEIs()}
                .lightState=${this.getLightState()}
                .callService=${this.callService}
            ></colortemp-slider>`
    }

    colorWheel() {
        return html`<color-wheel
            class="outlined"
            .changedEntityIds = ${this.getCEIs()}
            .lightState = ${this.getLightState()}
            .callService = ${this.callService}
        ></color-wheel>`
    }

    themeSelect() {
        return html`<theme-select
            class="outlined"
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
                <div class="control-column outlined">
                    ${this.icons()}
                </div>
                ${this.optionControl()}
            `
        }
    }

}

customElements.define("light-control", LightControl);