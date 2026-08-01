import { html, css } from 'lit';
import { repeat } from 'lit-html/directives/repeat.js';
import { getThemeGradient, getThemeOutline } from './theme-select/theme-util.js';
import { HaLightingComponent } from '../base-classes/ha-lighting-component.js';
import sharedStyles from '../styles/shared-styles.js';
import './theme-button.js';


export class ThemeSelect extends HaLightingComponent {

    static properties = {
        ...super.properties,
        _option: { state: true }
    }

    /********************************************** lifecycle ***********************************************************/

    getTriggers() {
        return ["_option"];
    }

    setInitialValues() {
        this.setOption(this.getThemeStateState());
    }

    /********************************************** getter & setter logic ***********************************************/

    getOption() {
        return this._option;
    }

    setOption(option) {
        this._option = option;
    }

    isSelected(option) {
        return (option === this.getOption());
    }

    isFixed() {
        if (this.getLightState().state === 'off') {
            return true;
        } return false;
    }

    waitCondition(entityId) {
        const theme = this.getState(entityId).state;
        return this.getOption() === theme;
    }

    /********************************************** interactive logic ***************************************************/

    async onClick(option) {
        if (!this.isFixed()) {
            this.raiseChangeFlag();
            this.setOption(option);
            this.handleCallService(option);
            await this.waitForEntity(this.getThemeId(), this.waitCondition);
            this.lowerChangeFlag();
        }
    }

    handleCallService(option) {
        const entityId = this.getThemeId();
        const data = { entity_id: entityId, option: option };
        this.callService('select', 'select_option', data);
    }

    /********************************************** html logic **********************************************************/

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

    render() {
        if (this.isInitialized()) {
            return html`${this.listOptions()}`
        }
    }

    /********************************************** style logic *********************************************************/

    getStyles(option) {
        let styles = {};
        if (this.isSelected(option)) {
            styles['outline'] = `solid ${getThemeOutline(option)}`;
            styles['outline-offset'] = '-3px;'
        }
        styles['background'] = getThemeGradient(option)
        return styles;
    }

    static styles = [sharedStyles, css`

    :host {
        display: flex;
        flex-flow: var(--theme-select-flex-flow, column wrap);
        justify-content: var(--theme-select-justify-content, flex-start);
        align-items: var(--theme-select-align-items, center);
        width: var(--theme-select-width, 450px);
        height: var(--theme-select-height, 360px);
    }

`];

}

customElements.define("theme-select", ThemeSelect);
