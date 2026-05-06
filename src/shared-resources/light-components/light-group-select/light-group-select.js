import { html } from 'lit';
import { repeat } from 'lit-html/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { HaLightingComponent } from '../../base-classes/ha-lighting-component.js';
import styles from './group-select.styles.js';
import sharedStyles from '../../styles/shared-styles.js';
import '../light-control/light-control.js';

export class LightGroupSelect extends HaLightingComponent {

    static properties = {
        ...super.properties,
        selectedId: { state: true }
    }

    /******************************* lifecycle **********************************/

    getTriggers() {
        return ["selectedId"];
    }

    /************************ getter and setter logic *************************/

    isSelected(lightId) {
        return (this.selectedId === lightId);
    }

    getSelectedId() {
        return this.selectedId;
    }

    /************************ interactive logic *******************************/

    onSelect(lightId) {
        this.dispatchEvent(new CustomEvent('select', { detail: lightId }));
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
                ${this.innerLight(this.getMainId())}
                <div class="members">
                    ${this.lights()}
                </div>
            `
        }
    }

}

customElements.define("light-group-select", LightGroupSelect);