import { html } from 'lit';
import { repeat } from 'lit-html/directives/repeat.js';
import { keyed } from 'lit/directives/keyed.js';
import { styleMap } from 'lit/directives/style-map.js';
import { HaLightingComponent } from '../../base-classes/ha-lighting-component.js';
import styles from './group-select.styles.js';
import sharedStyles from '../../styles/shared-styles.js';
import '../light-control-select/light-control-select.js';

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

    /******************************* lifecycle **********************************/

    getTriggers() {
        return ["selectedId", "option"];
    }

    /************************ getter and setter logic *************************/

    isSelected(lightId) {
        return (this.selectedId === lightId);
    }

    getSelectedId() {
        return this.selectedId;
    }

    getOption() {
        return this.option;
    }

    /************************ interactive logic *******************************/

    onSelect(lightId) {
        this.dispatchEvent(new CustomEvent('select', { detail: lightId }));
    }

    onSelectControl(e) {
        this.dispatchEvent(new CustomEvent('select_control', { detail: e.detail})) 
    }

    /**************************** style/html logic ******************************/

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
            ></light-control-select>
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
                    ></light-icon>
                </div>
                ${this.getName(lightId)}
            </div>
        `
    }

    lights() {
        const memberIds = Object.keys(this.getGroup());
        return repeat(memberIds, (memberId) => memberId, (memberId) => this.innerLight(memberId))
    }

    static styles = [sharedStyles, styles];

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

}

customElements.define("light-group-select", LightGroupSelect);