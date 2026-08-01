import { html, LitElement, css } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { getThemeGradient, getThemeOutline } from './theme-select/theme-util.js';
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

    /********************************************** lifecycle ***********************************************************/

    shouldUpdate(changedProps) {
        return (!this.isInitialized()
            || changedProps.has("selected")
            || changedProps.has("_initialized"))
    }

    firstUpdated() {
        this.initialize();
    }

    /********************************************** getter & setter logic ***********************************************/

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

    /********************************************** interactive logic ***************************************************/

    onClick() {
        this.dispatchEvent(new CustomEvent('select'));
    }

    /********************************************** html logic **********************************************************/

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

    /********************************************** style logic *********************************************************/

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
        margin: var(--theme-button-margin, 5px);
        width: var(--theme-button-width, 90px);
        height: var(--theme-button-height, 20px);
    }

    .option {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        padding-top: var(--theme-button-padding-top, 1px);
        padding-bottom: var(--theme-button-padding-bottom, 1px);
        outline-offset: var(--button-outline-offset, -3px);
        outline: none;
        font-size: var(--theme-button-font-size, 100%);
        font-weight: var(--theme-button-font-weight, 400);
    }

`];

}

customElements.define("theme-button", ThemeButton);
