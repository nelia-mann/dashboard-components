import { html } from 'lit';
import { repeat } from 'lit-html/directives/repeat.js';
import { getThemeGradient, getThemeOutline } from './theme-util.js';
import { HaLightingComponent } from '../../base-classes/ha-lighting-component.js';
import styles from './theme.styles.js';
import sharedStyles from '../../styles/shared-styles.js';
import './theme-button.js';


export class ThemeSelect extends HaLightingComponent {

    static properties = {
        ...super.properties,
        _option: { state: true }
    }

    constructor() {
        super();
        this._flag = false;
    }

    /************* lifecycle ***********************************************/

    update(changedProps) {
        (!this.getChangeFlag()) && (this.setInitialValue());
        super.update(changedProps);
    }

    getTriggers() {
        return ["_option"];
    }

    onFirstUpdate() {
        this.setInitialValue();
    }

    hasRelevantChanges() {
        const isStateChanged = this.getCEIs().has(this.getThemeId());
        const isNewOption = (this.getOption() != this.getThemeStateState());
        const isFlag = this.getChangeFlag();
        return (!isFlag && isStateChanged && isNewOption);
    }

    updated() {
        this.lowerChangeFlag();
    }

    setInitialValue() {
        this.setOption(this.getThemeStateState());
    }

    /************************ getter and setter logic **************************/

    getOption() {
        return this._option;
    }

    setOption(option) {
        this._option = option;
    }

    isSelected(option) {
        return (option === this.getOption());
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

    isFixed() {
        if (this.getLightState().state === 'off') {
            return true;
        } return false;
    }

    /**************************** interactive logic **************************/

    onClick(option) {
        if (!this.isFixed()) {
            this.raiseChangeFlag();
            this.setOption(option);
            this.handleCallService(option);
        }
    }

    handleCallService(option) {
        const entityId = this.getThemeId();
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
        const optionList = this.getThemeOptions();
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