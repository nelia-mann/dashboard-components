import { html, css } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { repeat } from 'lit-html/directives/repeat.js';
import { HaClimateComponent } from '../base-classes/ha-climate-component.js';
import { getModeStyles } from './util/climate-util.js';
import { fire, power, minimum, exclamation } from '../util/mdi-util.js';
import sharedStyles from '../styles/shared-styles.js';

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

    /********************************************** interactive logic ***************************************************/

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

    /********************************************** html logic **********************************************************/

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

    render() {
        if (this.isInitialized()) {
            return html`
                ${this.modeButtons()}
                ${this.safeButton()}
                ${this.TieButton()}
            `
        }
    }
/********************************************** style logic *************************************************************/

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

    static styles = [sharedStyles, css`

    :host {
        width: var(--aux-mode-control-width, 100%);
        height: var(--aux-mode-control-height, 50px);
        margin-bottom: var(--aux-mode-control-margin-bottom, 0px);
        display: flex;
        flex-flow: var(--aux-mode-control-flex-flow, row nowrap);
        justify-content: var(--aux-mode-control-justify-content, space-around);
        align-items: var(--aux-mode-control-align-items, center);
    }

    .button {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        width: var(--aux-mode-control-button-width, 60px);
        height: var(--aux-mode-control-button-height, 100%);
        outline-offset: var(--aux-mode-control-button-outline-offset, -3px);
        outline: none;
    }

    .bigbutton {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        width: var(--tie-button-width, 140px);
        height: var(--aux-mode-control-button-height, 100%);
        outline-offset: var(--button-outline-offset, -3px);
        outline: none;
        font-size: var(--aux-mode-control-font-size, var(--normal-font));
        font-weight: var(--aux-mode-control-font-weight, 500);
    }

    .exclamation {
        margin-right: var(--aux-mode-control-button-margin-correction-r, -2px);
        margin-left: var(--aux-mode-control-button-margin-correction-l, 0px);
    }

    .center {
        margin-left: var(--aux-mode-control-button-margin-correction-arrow-l, -6px);
    }

`];

}

customElements.define("aux-mode-controls", AuxModeControls);
