import { html, LitElement } from 'lit';
import { repeat } from 'lit-html/directives/repeat.js';
import styles from './theme.styles.js';
import sharedStyles from '../shared-resources/styles/shared-styles.js';
import { styleMap } from 'lit/directives/style-map.js';
import { getThemeGradient, getThemeOutline } from './theme-util.js';


export class ThemeSelect extends LitElement {

    _initialized = false;

    static get properties() {
        return {
            _themeState: { state: true },
            _option: { state: true },
            _changedEntityIds: { state: true }
        }
    }

    /************* lifecycle ***********************************************/

    constructor() {
        super();
    }

    update(changedProps) {
        super.update(changedProps);
    }

    shouldUpdate(changedProps) {
        return (!this.isInitialized() || this.hasRelevantChanges() || changedProps.has("_option"))
    }

    firstUpdated() {
        this.setInitialValue();
        this.initialize();
    }

    hasRelevantChanges() {
        const isStateChanged = this.getCEIs().has(this.getEntityId());
        const isNewOption = (this.getOption() != this.getThemeState());
        return (isStateChanged && isNewOption);
    }

    updated(changedProps) {
        (changedProps.has('_themeState')) && this.setInitialValue();
    }

    setInitialValue() {
        this.setOption(this.getThemeState());
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

    getEntityId() {
        const entityId = this._themeState.entity_id;
        return entityId;
    }

    getThemeState() {
        return this._themeState.state;
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
        this.doCallService(option);
    }

    doCallService(option) {
        const entityId = this.getEntityId();
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
            return html`<div
                class="option outlined sub-info"
                style=${styleMap(this.getStyles(option))}
                @click=${() => this.onClick(option)}
             >
                ${option}
            </div>`
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