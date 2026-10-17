import { html, LitElement, css } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { getThemeGradient, getThemeOutline } from '../util/lighting-util/theme-util.js';
import sharedStyles from '../styles/shared-styles.js';

export class ThemeButton extends LitElement {

    static get properties() {
        return {
            option: { state: true },
            selected: { state: true },
            _initialized: { state: true }
        }
    }

    constructor() {
        super();
        this.selected = false;
        this._initialized = false;
    }

/********************************************** lifecycle *************************************************************/

    shouldUpdate(changedProps) {
        return (!this.isInitialized()
            || changedProps.has("selected")
            || changedProps.has("_initialized"))
    }

    firstUpdated() {
        this.initialize();
    }

/********************************************** getter & setter logic *************************************************/

    isInitialized() {
        return this._initialized;
    }

    initialize() {
        this._initialized = true;
    }

    getOption() {
        return this.option;
    }

    isSelected() {
        return this.selected;
    }

/********************************************** interactive logic *****************************************************/

    onClick() {
        this.dispatchEvent(new CustomEvent('select'));
    }

/********************************************** html logic ************************************************************/

    render() {
        if (this.isInitialized()) {
            return html`<div
                    class="option outlined"
                    style=${styleMap(this.getStyles())}
                    @click=${this.onClick}
                >
                    ${this.getOption()}
                </div>`
        }
    }

/********************************************** style logic ***********************************************************/

    getStyles() {
        let styles = {};
        if (this.isSelected()) {
            styles['outline'] = `solid ${getThemeOutline(this.getOption())}`;
        }
        styles['background'] = getThemeGradient(this.getOption())
        return styles;
    }

    static styles = [sharedStyles, css`

        :host {

            margin: var(--tb-margin, 5px);
            width: var(--tb-width, 90px);
            height: var(--tb-height, 20px);
        }

        .option {
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
            padding-top: var(--tb-padding-top, 1px);
            padding-bottom: var(--tb-padding-bottom, 1px);
            outline-offset: var(--tb-outline-offset, -3px);
            outline: none;
            font-size: var(--tb-font-size, 100%);
            font-weight: var(--tb-font-weight, 400);
            height: 100%;
        }

    `];

}

customElements.define("theme-button", ThemeButton);
