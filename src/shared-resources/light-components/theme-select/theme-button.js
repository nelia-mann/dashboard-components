import { html, LitElement } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import styles from './button.styles.js';
import sharedStyles from '../../styles/shared-styles.js';
import { getThemeGradient, getThemeOutline } from './theme-util.js';

export class ThemeButton extends LitElement {

    static get properties() {
        return {
            _option: { state: true },
            _isSelected: { state: true },
            _initialized: { state: true }
        }
    }

    constructor() {
        super();
        this._isSelected = false;
        this._initialized = false;
    }

    /********************* lifecycle ******************************/

    update(changedProps) {
        super.update(changedProps);
    }

    shouldUpdate(changedProps) {
        return (!this.isInitialized()
            || changedProps.has("_isSelected")
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
        return this._option;
    }

    isSelected() {
        return this._isSelected;
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