import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { repeat } from 'lit-html/directives/repeat.js';
import { HaClimateComponent } from '../../base-classes/ha-climate-component.js';
import { getModeStyles } from '../util/climate-util.js';
import { fire, power, minimum } from '../../util/mdi-util.js';
import styles from './mode.styles.js';
import sharedStyles from '../../styles/shared-styles.js';

export class AuxModeControls extends HaClimateComponent {

    getAreaName() {
        return this.areaName;
    }

    isTied() {
        return this.getTie() === this.getAreaName();
    }

    getAreaMode() {
        return this.areaMode;
    }

    getAreaAction() {
        return this.areaAction;
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

    selectTie() {
        let newOption = this.getAreaName();
        (this.isTied()) && (newOption = 'Off');
        const entityId = this.getTieId();
        const data = {
            entity_id: entityId,
            option: newOption
        }
        this.callService('input_select', 'select_option', data);
    }

    /************************************** html/style logic *********************************/

    getModeStyles(mode) {
        const isMode = (mode === this.getMode())
        return getModeStyles(mode, this.getAction(), isMode)
    }

    getTieStyles() {
        return getModeStyles(this.getAreaMode(), this.getAreaAction(), this.isTied())
    }

    modeButton(mode) {
        let icon;
        switch (mode) {
            case 'off':
                icon = html`<ha-svg-icon .path=${power}></ha-svg-icon>`;
                break;
            case 'heat':
                icon = html`<ha-svg-icon .path=${fire}></ha-svg-icon>`;
                break;
            case 'safe':
                icon = html`
                    <ha-svg-icon .path=${fire} ></ha-svg-icon>
                    <ha-svg-icon .path=${minimum} class="center"></ha-svg-icon>
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
            ${repeat(this.getModes().sort(), (mode) => mode, mode => this.modeButton(mode))}
        `
    }

    TieButton() {
        return html`<div class="bigbutton outlined"
            style=${styleMap(this.getTieStyles())}
            @click=${this.selectTie}
        >
            Tie to ${this.getAreaName()}
        </div>`
    }

    static styles = [sharedStyles, styles];

    render() {
        if (this.isInitialized()) {
            return html`
                ${this.modeButtons()}
                ${this.TieButton()}
            `
        }
    }
}

customElements.define("aux-mode-controls", AuxModeControls);