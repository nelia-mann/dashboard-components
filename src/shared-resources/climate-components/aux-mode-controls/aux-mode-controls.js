import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { repeat } from 'lit-html/directives/repeat.js';
import { HaClimateComponent } from '../../base-classes/ha-climate-component.js';
import { getModeStyles } from '../util/climate-util.js';
import { fire, power, minimum, exclamation } from '../../util/mdi-util.js';
import styles from './mode.styles.js';
import sharedStyles from '../../styles/shared-styles.js';

export class AuxModeControls extends HaClimateComponent {

    getRegionName() {
        return this.regionName;
    }

    isTied() {
        return [this.getRegionName(), 'on'].includes(this.getTie());
    }

    getAreaMode() {
        return this.areaMode;
    }

    getAreaAction() {
        return this.areaAction;
    }

    /*********************************** interactive logic ***********************************/

    selectMode(mode) {
        (this.isTied()) && (this.selectTie());
        const entityId = this.getEntityId('thermostat');
        const data = {
            entity_id: entityId,
            hvac_mode: mode
        }
        this.callService('climate', 'set_hvac_mode', data)
    }

    selectTie() {
        const entityId = this.getTieId();
        let data = { entity_id: entityId };
        if (this.getTieOptions()) {
            let newOption = this.getRegionName();
            (this.isTied()) && (newOption = 'off');
            data['option'] = newOption;
            this.callService('input_select', 'select_option', data);
        } else {
            this.callService('input_boolean', 'toggle', data);
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

    getTieStyles() {
        return getModeStyles(this.getAreaMode(), this.getAreaAction(), this.isTied())
    }

    getSafeStyles() {
        return getModeStyles('safe_min', this.getAction(), this.isSafe());
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
            case 'safe_min':
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

    safeButton() {
        if (this.getEntityId('safe_mode')) {
            return html`<div class="button outlined"
                style=${styleMap(this.getSafeStyles())}
                @click=${this.setSafe}
            >
                <ha-svg-icon .path=${fire} ></ha-svg-icon>
                <ha-svg-icon .path=${minimum} class="center"></ha-svg-icon>
            </div>`
        }
    }

    TieButton() {
        return html`<div class="bigbutton outlined"
            style=${styleMap(this.getTieStyles())}
            @click=${this.selectTie}
        >
            <ha-svg-icon .path=${exclamation}} class="exclamation"></ha-svg-icon>
            ${this.makePretty(this.getRegionName())}
        </div>`
    }

    static styles = [sharedStyles, styles];

    render() {
        if (this.isInitialized()) {
            return html`
                ${this.modeButtons()}
                ${this.safeButton()}
                ${this.TieButton()}
            `
        }
    }
}

customElements.define("aux-mode-controls", AuxModeControls);