import { html, LitElement } from 'lit';
import { repeat } from 'lit-html/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import styles from './theme.styles.js';
import sharedStyles from '../../styles/shared-styles.js';
import { getThemeGradient, getThemeOutline } from './theme-util.js';
import { getEntityId, getState } from '../../util/state-util.js';
import './theme-button.js';


export class ThemeSelect extends LitElement {

    static get properties() {
        return {
            _themeState: { state: true },
            _option: { state: true },
            _changedEntityIds: { state: true },
            _initialized: { state: true }
        }
    }

    constructor() {
        super();
        this._themeState = {};
        this._changedEntityIds = new Set();
        this._initialized = false;
    }

    /************* lifecycle ***********************************************/



    update(changedProps) {
        super.update(changedProps);
    }

    shouldUpdate(changedProps) {
        return (!this.isInitialized()
            || this.hasRelevantChanges()
            || changedProps.has("_option")
            || changedProps.has("_initialized"))
    }

    firstUpdated() {
        this.setInitialValue();
        this.initialize();
    }

    hasRelevantChanges() {
        const isStateChanged = this.getCEIs().has(getEntityId(this.getThemeState()));
        const isNewOption = (this.getOption() != getState(this.getThemeState()));
        return (isStateChanged && isNewOption);
    }

    updated() {
        (this.hasRelevantChanges()) && this.setInitialValue();
    }

    setInitialValue() {
        this.setOption(getState(this.getThemeState()));
    }

    /************************ getter and setter logic **************************/

    isInitialized() {
        return this._initialized;
    }

    initialize() {
        this._initialized = true;
    }

    getOptions() {
        const optionList = this._themeState.attributes.options;
        return optionList;
    }

    getThemeState() {
        return this._themeState;
    }

    getOption() {
        return this._option;
    }

    setOption(option) {
        this._option = option;
    }

    isSelected(option) {
        return (option === this.getOption());
    }

    getCEIs() {
        return this._changedEntityIds;
    }

    /**************************** interactive logic **************************/

    onClick(option) {
        this.setOption(option);
        this.handleCallService(option);
    }

    handleCallService(option) {
        const entityId = getEntityId(this.getThemeState());
        const data = { entity_id: entityId, option: option };
        this.callService('select', 'select_option', data);
    }

    /**************************** style/html logic ***************************/



    getStyles(option) {
        let styles = {};
        if (this.isSelected(option)) {
            styles['outline'] = `solid ${getThemeOutline(option)}`;
            styles['outline-offset'] = '-3px;'
        }
        styles['background'] = getThemeGradient(option)
        return styles;
    }

    listOptions() {
        const optionList = this.getOptions();
        return repeat(optionList, (option) => option, option => {
            return html`<theme-button
                @select=${() => this.onClick(option)}
                ._option=${option}
                ._isSelected=${this.isSelected(option)}
             ></theme-button>`
        })
    }

    static styles = [sharedStyles, styles];

    render() {
        if (this.isInitialized()) {
            return html`${this.listOptions()}`
        }
    }

}

customElements.define("theme-select", ThemeSelect);