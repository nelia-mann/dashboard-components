import { html, css } from 'lit';
import { repeat } from 'lit-html/directives/repeat.js';
import { keyed } from 'lit/directives/keyed.js';
import { styleMap } from 'lit/directives/style-map.js';
import { HaLightingComponent } from '../base-classes/ha-lighting-component.js';
import sharedStyles from '../styles/shared-styles.js';
import './light-control-select.js';

export class LightGroupSelect extends HaLightingComponent {

    static properties = {
        ...super.properties,
        selectedId: { state: true },
        option: { state: true }
    }

    constructor() {
        super();
        this.option = '';
        this.selectedId = '';
    }

/********************************************** lifecycle *************************************************************/

    getTriggers() {
        return ["selectedId", "option"];
    }

/********************************************** getter & setter logic *************************************************/

    isSelected(lightId) {
        return (this.selectedId === lightId);
    }

    getSelectedId() {
        return this.selectedId;
    }

    getOption() {
        return this.option;
    }

/********************************************** interactive logic *****************************************************/

    onSelect(lightId) {
        this.dispatchEvent(new CustomEvent('select', { detail: lightId }));
    }

    onSelectControl(e) {
        this.dispatchEvent(new CustomEvent('select_control', { detail: e.detail})) 
    }

/********************************************** html logic ************************************************************/

    lightControlSelect() {
        return keyed(this.getSelectedId(), html`
            <light-control-select
                class = "outlined"
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .structure = ${this.getThisStructure(this.getSelectedId())}
                .entityIds = ${new Set([this.getSelectedId()])}
                .option = ${this.getOption()}
                @select = ${this.onSelectControl}
            />
        `)
    }

    innerLight(lightId) {
        return html`
            <div
                class="light-inner outlined ${this.fontClass(lightId)}"
                style=${styleMap(this.getStyles(lightId))}
                @click=${() => this.onSelect(lightId)}
            >
                <div class="icon">
                    <light-icon
                        .changedEntityIds=${this.getCEIs()}
                        .states=${this.getStates()}
                        .structure=${this.getThisStructure(lightId)}
                    />
                </div>
                ${this.getName(lightId)}
            </div>
        `
    }

    lights() {
        const memberIds = Object.keys(this.getGroup());
        return repeat(memberIds, (memberId) => memberId, (memberId) => this.innerLight(memberId))
    }

    render() {
        if (this.isInitialized()) {
            return html`
                <div class="top-row">
                    ${this.innerLight(this.getMainId())}
                    ${this.lightControlSelect()}
                </div>
                <div class="members">
                    ${this.lights()}
                </div>
            `
        }
    }

/********************************************** style logic ***********************************************************/

    getStyles(lightId) {
        let styles = {};
        if (this.isSelected(lightId)) {
            styles['outline'] = 'solid ' + this.getColor(lightId);
        }
        return styles;
    }

    fontClass(lightId) {
        if (this.isGroup(lightId)) {
            return 'small-heading';
        } else {
            return 'sub-info';
        }
    }

    static styles = [sharedStyles, css`

        :host {
            display: flex;
            flex-flow: var(--light-select-flex-flow, column nowrap);
            align-items: var(--light-select-align-items, flex-start);
            justify-content: var(--light-select-justify-content, center);
        }

        .members {
            display: flex;
            flex-flow: var(--light-select-members-flex-flow);
            justify-content: var(--light-select-members-justify-content);
            align-items: var(--light-select-members-align-items);
            width: var(--light-select-members-width);
            --light-select-innerlight-width: var(--light-select-member-width);
        }

        .light-inner {
            width: var(--light-select-innerlight-width, 180px);
            height: var(--light-select-innerlight-height, 25px);
            padding: var(--light-select-innerlight-padding, 10px);
            margin: var(--light-select-innerlight-margin, 10px);
            display: flex;
            flex-flow: row nowrap;
            justify-content: flex-start;
            align-items: center;
            outline-offset: var(--button-outline-offset, -3px);
            outline: none;
        }

        .small-heading {
            font-size: var(--light-inner-heading-font-size, 100%);
            font-weight: var(--light-inner-heading-font-weight, 700);
        }

        .sub-info {
            font-size: var(--light-inner-font-size, 100%);
            font-weight: var(--light-inner-font-weight, 400);
        }

        .icon {
            margin: 0px;
            padding: 0px;
            margin-right: var(--light-select-icoc-margin-right, 10px);
            margin-left: var(--light-select-icoc-margin-left, 0px);
            width: var(--light-select-icon-size, 20px);
            height: var(--light-select-icon-size, 20px);
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
        }

        .top-row {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-around;
            align-items:center;
            margin-bottom: var(--light-select-top-row-margin, 20px);
        }

    `];

}

customElements.define("light-group-select", LightGroupSelect);
