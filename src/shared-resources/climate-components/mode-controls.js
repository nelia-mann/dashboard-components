import { html, css } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { repeat } from 'lit-html/directives/repeat.js';
import { HaClimateComponent } from '../base-classes/ha-climate-component.js';
import { getModeStyles } from '../util/climate-util/climate-util.js';
import { snowflake, fire, power, slash, exclamation } from '../util/mdi-util.js';
import sharedStyles from '../styles/shared-styles.js';

export class ModeControls extends HaClimateComponent {

/********************************************** interactive logic *****************************************************/

    selectMode(mode) {
        const entityId = this.getEntityId('hp');
        const data = {
            entity_id: entityId,
            hvac_mode: mode
        }
        this.callService('climate', 'set_hvac_mode', data)
    }

    setDominant() {
        const entityId = this.getScriptId();
        const data = {
            entity_id: entityId,
            variables: {
                heatpump_entity: this.getEntityId('hp')
            }
        }
        this.callService('script', 'turn_on', data)
    }

/********************************************** html logic ************************************************************/

    modeButton(mode) {
        let icon;
        switch (mode) {
            case 'off':
                icon = html`<ha-svg-icon .path=${power}/>`;
                break;
            case 'heat':
                icon = html`<ha-svg-icon .path=${fire}/>`;
                break;
            case 'cool':
                icon = html`<ha-svg-icon .path=${snowflake}/>`;
                break;
            case 'heat_cool':
                icon = html`
                    <ha-svg-icon .path=${snowflake}></ha-svg-icon>
                    <ha-svg-icon .path=${slash} class="center"></ha-svg-icon>
                    <ha-svg-icon .path=${fire}></ha-svg-icon>
                `
                break;
            case 'auto':
                icon = html`
                    <ha-svg-icon .path=${snowflake}></ha-svg-icon>
                    <ha-svg-icon .path=${slash} class="center"></ha-svg-icon>
                    <ha-svg-icon .path=${fire}></ha-svg-icon>
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
            ${repeat(this.getModes().sort().reverse(), (mode) => mode, mode => this.modeButton(mode))}
        `
    }

    dominateButton() {
        if (this.getRank()) {
            return html`
                <div class="button outlined"
                    style=${styleMap(this.getDomStyles())}
                    @click=${this.setDominant}
                >
                    <ha-svg-icon .path=${exclamation}/>
                </div>`
        }
    }

    render() {
        if (this.isInitialized()) {
            return html`
                ${this.modeButtons()}
                ${this.dominateButton()}
            `
        }
    }

/********************************************** style logic ***********************************************************/

    getModeStyles(mode) {
        const isMode = (mode === this.getMode())
        return getModeStyles(mode, this.getAction(), isMode)
    }

    getDomStyles() {
        return getModeStyles(this.getMode(), this.getAction(), this.isDominant())
    }

    static styles = [sharedStyles, css`

        :host {
            width: var(--mc-width, 100%);
            height: var(--mc-height, 50px);
            margin-top: var(--mc-margin-top, 0px);
            display: flex;
            flex-flow: row nowwrap;
            justify-content: space-between;
            align-items: center;
        }

        .button {
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
            width: var(--mcb-width, 60px);
            height: var(--mcb-height, 100%);
            outline-offset: var(--mcb-outline-offset, -3px);
            outline: none;
        }

        .center {
            margin-left: var(--mcbc-margin-left, -10px);
            margin-right: var(--mcbc-margin-right, -10px);
        }

    `];

}

customElements.define("mode-controls", ModeControls);
