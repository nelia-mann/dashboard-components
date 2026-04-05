import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { repeat } from 'lit-html/directives/repeat.js';
import { HaClimateComponent } from '../../base-classes/ha-climate-component.js';
import { getModeStyles } from '../util/climate-util.js';
import { fire, power, minimum, fan, maximum } from '../../util/mdi-util.js';
import styles from './mode.styles.js';
import sharedStyles from '../../styles/shared-styles.js';

export class IsoModeControls extends HaClimateComponent {

    /*********************************** interactive logic ***********************************/

    selectMode(mode) {
        const entityId = this.getModeId();
        const data = {
            entity_id: entityId,
            option: mode
        }
        this.callService('input_select', 'select_option', data)
    }

    /************************************** html/style logic *********************************/

    getModeStyles(mode) {
        const isMode = (mode === this.getMode())
        return getModeStyles(mode, this.getAction(), isMode)
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
            case 'fan':
                icon = html`<ha-svg-icon .path=${fan}></ha-svg-icon>`;
                break;
            case 'safe_min':
                icon = html`
                    <ha-svg-icon .path=${fire} ></ha-svg-icon>
                    <ha-svg-icon .path=${minimum} class="center"></ha-svg-icon>
                `
                break;
            case 'safe_max':
                icon = html`
                    <ha-svg-icon .path=${fan} ></ha-svg-icon>
                    <ha-svg-icon .path=${maximum} class="center"></ha-svg-icon>
                `
                break;
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

    static styles = [sharedStyles, styles];

    render() {
        if (this.isInitialized()) {
            return html`
                ${this.modeButtons()}
            `
        }
    }
}

customElements.define("iso-mode-controls", IsoModeControls);