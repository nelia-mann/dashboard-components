import { html, LitElement } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { getThemeGradient, getThemeOutline } from './theme-util.js';
import styles from './button.styles.js';
import sharedStyles from '../../styles/shared-styles.js';

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

    /********************* lifecycle ******************************/

    shouldUpdate(changedProps) {
        return (!this.isInitialized()
            || changedProps.has("selected")
            || changedProps.has("_initialized"))
    }

    firstUpdated() {
        this.initialize();
    }

    /********************* getter and setter logic ****************/

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

    /********************* interactive logic **********************/

    onClick() {
        this.dispatchEvent(new CustomEvent('select'));
    }

    /********************* style/html logic ***********************/

    getStyles() {
        let styles = {};
        if (this.isSelected()) {
            styles['outline'] = `solid ${getThemeOutline(this.getOption())}`;
            styles['outline-offset'] = '-3px;'
        }
        styles['background'] = getThemeGradient(this.getOption())
        return styles;
    }

    static styles = [sharedStyles, styles];

    render() {
        if (this.isInitialized()) {
            return html`<div
                    class="option outlined sub-info"
                    style=${styleMap(this.getStyles())}
                    @click=${this.onClick}
                >
                    ${this.getOption()}
                </div>`
        }
    }

}

customElements.define("theme-button", ThemeButton);