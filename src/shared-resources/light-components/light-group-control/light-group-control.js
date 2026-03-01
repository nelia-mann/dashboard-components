import { html } from 'lit';
import { repeat } from 'lit-html/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { getColor } from '../util/light-util.js';
import { getName, isGroup } from '../../util/state-util.js';
import { HaSubComponent } from '../../base-classes/ha-subcomponent.js';
import styles from './group.styles.js';
import sharedStyles from '../../styles/shared-styles.js';
import '../light-control/light-control.js';

export class LightGroupControl extends HaSubComponent {

    static properties = {
        ...super.properties,
        _selectedId: { state: true }
    }

    constructor() {
        super();
        this.lightId = '';
        this.themeId = '';
    }

    /******************************* lifecycle **********************************/

    getTriggers() {
        return ["_selectedId"];
    }

    onFirstUpdate() {
        this.setSelectedId(this.getMainId());
    }

    /************************ getter and setter logic *************************/

    isSelected(lightId) {
        return (this._selectedId === lightId);
    }

    getState(entityId) {
        return this.states[entityId];
    }

    getSelectedId() {
        return this._selectedId;
    }

    setSelectedId(lightId) {
        this._selectedId = lightId;
    }

    getMainId() {
        return this.lightId;
    }

    selectedLightState() {
        return this.getState(this.getSelectedId());
    }

    selectedThemeState() {
        let themeId;
        if (this.isSelected(this.getMainId())) {
            themeId = this.themeId;
        } else {
            themeId = this.getStructure()[this.getSelectedId()].theme;
        }
        if (themeId) {
            return this.getState(themeId);
        }
    }

    /************************ interactive logic *******************************/

    onSelect(lightId) {
        this.setSelectedId(lightId);
    }

    /**************************** style/html logic ******************************/

        getStyles(lightId) {
            let styles = {};
            if (this.isSelected(lightId)) {
                styles['outline'] = 'solid ' + getColor(this.getState(lightId));
                styles['outline-offset'] = '-4px'
            }
            return styles;
        }

        fontClass(lightId) {
            if (isGroup(this.getState(lightId))) {
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
                    <div class="icons">
                        <light-icon
                            .changedEntityIds=${this.getCEIs()}
                            .lightState=${this.getState(lightId)}
                        ></light-icon>
                    </div>
                    ${getName(this.getState(lightId))}
                </div>
            `
        }

        lights() {
            const memberIds = Object.keys(this.getStructure());
            return repeat(memberIds, (memberId) => memberId, (memberId) => this.innerLight(memberId))
        }

        lightControl() {
            return html`
                <light-control
                    .changedEntityIds = ${this.getCEIs()}
                    .lightState = ${this.selectedLightState()}
                    .themeState = ${this.selectedThemeState()}
                    .callService=${this.callService}
                ></light-control>
            `
        }

        static styles = [sharedStyles, styles];

        render() {
            if (this.isInitialized()) {
                const name = getName(this.getState(this.getMainId()));
                return html`
                    <div class="select-lights">
                        ${this.innerLight(this.getMainId())}
                        ${this.lights()}
                    </div>
                    ${this.lightControl()}
                `
            }
        }

}

customElements.define("light-group-control", LightGroupControl);