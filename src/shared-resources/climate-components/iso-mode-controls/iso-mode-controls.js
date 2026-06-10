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
        const data = {
            entity_id: this.getEntityId('hygrostat'),
        }
        if (mode === 'on') {
            this.callService('humidifier', 'turn_on', data);
        } else if (mode === 'off') {
            this.callService('humidifier', 'turn_off', data);
        }
    }

    setSafe() {
        const entityId = this.getEntityId('safe_mode');
        this.callService('input_boolean', 'toggle', { entity_id: entityId })
    }

    /************************************** html/style logic *********************************/

    getModeStyles(mode) {
        const isMode = (mode === this.getMode())
        return getModeStyles(mode, this.getAction(), isMode)
    }

    getSafeStyles() {
        return getModeStyles('safe_max', this.getAction(), this.isSafe());
    }

    modeButton(mode) {
        let icon;
        switch (mode) {
            case 'off':
                icon = html`<ha-svg-icon .path=${power}></ha-svg-icon>`;
                break;
            case 'on':
                icon = html`<ha-svg-icon .path=${fan}></ha-svg-icon>`;
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

    safeButton() {
        if (this.getEntityId('safe_mode')) {
            return html`<div class="button outlined"
                style=${styleMap(this.getSafeStyles())}
                @click=${this.setSafe}
            >
                <ha-svg-icon .path=${fan} ></ha-svg-icon>
                <ha-svg-icon .path=${maximum} class="center"></ha-svg-icon>
            </div>`
        }
    }

    static styles = [sharedStyles, styles];

    render() {
        if (this.isInitialized()) {
            return html`
                ${this.modeButtons()}
                ${this.safeButton()}
            `
        }
    }
}

customElements.define("iso-mode-controls", IsoModeControls);