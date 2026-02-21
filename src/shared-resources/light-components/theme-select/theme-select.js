import { html, LitElement } from 'lit';
import { repeat } from 'lit-html/directives/repeat.js';
import styles from './theme.styles.js';
import sharedStyles from '../../styles/shared-styles.js';
import { getThemeGradient, getThemeOutline } from './theme-util.js';
import { getEntityId, getState, getAttributes } from '../../util/state-util.js';
import './theme-button.js';


export class ThemeSelect extends LitElement {

    _flag = false;

    static get properties() {
        return {
            changedEntityIds: { state: true },
            themeState: { state: true },
            _option: { state: true },
            _initialized: { state: true }
        }
    }

    constructor() {
        super();
        this.changedEntityIds = new Set();
        this.themeState = {};
        this._initialized = false;
    }

    /************* lifecycle ***********************************************/



    update(changedProps) {
        (!this.getChangeFlag()) && (this.setInitialValue());
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
        const isFlag = this.getChangeFlag();
        return (!isFlag && isStateChanged && isNewOption);
    }

    updated() {
        this.lowerChangeFlag();
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

    getThemeState() {
        return this.themeState;
    }

    getOptions() {
        const optionList = getAttributes(this.getThemeState()).options;
        return optionList;
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
        return this.changedEntityIds;
    }

    getChangeFlag() {
        return this._flag;
    }

    raiseChangeFlag() {
        this._flag = true;
    }

    lowerChangeFlag() {
        this._flag = false;
    }

    /**************************** interactive logic **************************/

    onClick(option) {
        this.raiseChangeFlag();
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
                .option=${option}
                .selected=${this.isSelected(option)}
                @select=${() => this.onClick(option)}
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