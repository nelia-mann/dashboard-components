import { html } from 'lit';
import { repeat } from 'lit-html/directives/repeat.js';
import { HaSubComponent } from '../../base-classes/ha-subcomponent.js';
import { snowflake, fire, power, slash, exclamation } from '../../util/mdi-util.js';
import styles from './mode.styles.js';
import sharedStyles from '../../styles/shared-styles.js';

export class ModeControls extends HaSubComponent {

    static styles = [sharedStyles, styles];

    getModeId() {
        return this.getStructure().mode;
    }

    getDominateId() {
        return this.getStructure().dominanthp;
    }

    getModes() {
        const options = this.getStates()[this.getModeId()].attributes.options;
        return options;
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
        return html`<div class="button outlined"> ${icon} </div>`
    }

    modeButtons() {
        return html`
            ${repeat(this.getModes(), (mode) => mode, mode => this.modeButton(mode))}
        `
    }

    dominateButton() {
        if (this.getDominateId()) {
            return html`
                <div class="button outlined">
                    <ha-svg-icon .path=${exclamation}}></ha-svg-icon>
                </div>`
        }
    }

    render() {
        if (this.isInitialized()) {
            console.log("ping2")
            return html`
                ${this.modeButtons()}
                ${this.dominateButton()}
            `
        }
    }
}

customElements.define("mode-controls", ModeControls);