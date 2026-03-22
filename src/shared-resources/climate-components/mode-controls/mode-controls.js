import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { repeat } from 'lit-html/directives/repeat.js';
import { HaSubComponent } from '../../base-classes/ha-subcomponent.js';
import { getModeStyles, getMode } from '../util/climate-util.js';
import { snowflake, fire, power, slash, exclamation } from '../../util/mdi-util.js';
import styles from './mode.styles.js';
import sharedStyles from '../../styles/shared-styles.js';

export class ModeControls extends HaSubComponent {

    getModeId() {
        return this.getStructure().mode;
    }

    isDominant() {
        const rankId = this.getStructure().rank;
        const rank = Number(this.getStates()[rankId].state);
        return rank === 1;
    }

    getModes() {
        const options = this.getStates()[this.getModeId()].attributes.options;
        return options;
    }

    getMode() {
        return getMode(this.getStructure(), this.getStates());
    }

    /*********************************** interactive logic ***********************************/

    selectMode(mode) {
        const entityId = this.getModeId();
        const data = {
            entity_id: entityId,
            option: mode
        }
        this.callService('input_select', 'select_option', data)
    }

    setDominant() {
        const entityId = this.getStructure().script
        const data = {
            entity_id: entityId,
            variables: {
                mode_entity: this.getModeId()
            }
        }
        this.callService('script', 'turn_on', data)
    }

    /************************************** html/style logic *********************************/

    getModeStyles(mode) {
        const isMode = (mode === this.getMode())
        return getModeStyles(this.getStructure(), this.getStates(), mode, isMode)
    }

    getDomStyles() {
        return getModeStyles(this.getStructure(), this.getStates(), this.getMode(), this.isDominant())
    }

    modeButton(mode) {
        let icon;
        switch (mode) {
            case 'off':
                icon = html`<ha-svg-icon .path=${power}}></ha-svg-icon>`;
                break;
            case 'heat':
                icon = html`<ha-svg-icon .path=${fire}}></ha-svg-icon>`;
                break;
            case 'cool':
                icon = html`<ha-svg-icon .path=${snowflake}}></ha-svg-icon>`;
                break;
            case 'heat-cool':
                icon = html`
                    <ha-svg-icon .path=${snowflake}}"></ha-svg-icon>
                    <ha-svg-icon .path=${slash}} class="center"></ha-svg-icon>
                    <ha-svg-icon .path=${fire}}></ha-svg-icon>
                `
        }
        return html`<div class="button outlined"
            style=${styleMap(this.getModeStyles(mode))}
            @click=${() => this.selectMode(mode)}
        >
            ${icon}
        </div>`
    }

    modeButtons() {

        return html`
            ${repeat(this.getModes().sort().reverse(), (mode) => mode, mode => this.modeButton(mode))}
        `
    }

    dominateButton() {
        if (this.getStructure().rank) {
            return html`
                <div class="button outlined"
                    style=${styleMap(this.getDomStyles())}
                    @click=${this.setDominant}
                >
                    <ha-svg-icon .path=${exclamation}}></ha-svg-icon>
                </div>`
        }
    }

    static styles = [sharedStyles, styles];

    render() {
        if (this.isInitialized()) {
            return html`
                ${this.modeButtons()}
                ${this.dominateButton()}
            `
        }
    }
}

customElements.define("mode-controls", ModeControls);