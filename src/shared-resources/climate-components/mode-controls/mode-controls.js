import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { repeat } from 'lit-html/directives/repeat.js';
import { HaSubComponent } from '../../base-classes/ha-subcomponent.js';
import { OFF, COOL, HOT, climateGradient, rgba } from './../../util/color-util.js';
import { snowflake, fire, power, slash, exclamation } from '../../util/mdi-util.js';
import styles from './mode.styles.js';
import sharedStyles from '../../styles/shared-styles.js';

export class ModeControls extends HaSubComponent {

    static styles = [sharedStyles, styles];

    getModeId() {
        return this.getStructure().mode;
    }

    getDominantId() {
        return this.getStructure().dominanthp;
    }

    isDominant() {
        dominantHPid = this.getStates()[this.getDominantId()].state;
        actualHPid = this.getStructure().heatpump;
        return actualHPid === dominantHPid;
    }

    getModes() {
        const options = this.getStates()[this.getModeId()].attributes.options;
        return options;
    }

    getMode() {
        const modeId = this.getStructure().mode;
        return this.getStates()[modeId].state;
    }

    getAction() {
        const hpId = this.getStructure().heatpump;
        const hpState = this.getStates()[hpId].state;
        let action = "off";
        switch (hpState) {
            case 'heat':
                action = "heating";
                break;
            case 'cool':
                action = "cooling";
                break;
            case 'off':
                if (this.getMode() !== "off") {
                    action = "idle";
                } else { action = "off" };
                break;
        }
        return action;
    }

    isMode(mode) {
        return mode === this.getMode();
    }

    getModeStyles(mode, outline) {
        let styles = {};
        switch (mode) {
            case 'off':
                styles['background-color'] = rgba(OFF, 0.5);
                if (outline) {
                    styles['outline'] = `solid ${rgba(OFF, 1.0)}`;
                    styles['outline-offset'] = '-3px';
                }
                break;
            case 'heat':
                styles['background-color'] = rgba(HOT, 0.5);
                if (outline) {
                    styles['outline'] = `solid ${rgba(HOT, 1.0)}`;
                    styles['outline-offset'] = '-3px';
                }
                break;
            case 'cool':
                styles['background-color'] = rgba(COOL, 0.5);
                if (outline) {
                    styles['outline'] = `solid ${rgba(COOL, 1.0)}`;
                    styles['outline-offset'] = '-3px';
                }
                break;
            case 'heat-cool':
                styles['background'] = climateGradient();
                if (outline) {
                    switch (this.getAction()) {
                        case 'heating':
                            styles['outline'] = `solid ${rgba(HOT, 1.0)}`;
                            break;
                        case 'cooling':
                            styles['outline'] = `solid ${rgba(COOL, 1.0)}`;
                            break;
                        case 'idle':
                            styles['outline'] = `solid ${rgba(OFF, 1.0)}`;
                            break;
                        case 'off':
                            styles['outline'] = `solid ${rgba(OFF, 1.0)}`;
                            break;
                    }
                    styles['outline-offset'] = '-3px';
                }
        }
        return styles;
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
            style=${styleMap(this.getModeStyles(mode, this.isMode(mode)))}
        >
            ${icon}
        </div>`
    }

    modeButtons() {
        return html`
            ${repeat(this.getModes(), (mode) => mode, mode => this.modeButton(mode))}
        `
    }

    dominateButton() {
        if (this.getDominateId()) {
            return html`
                <div class="button outlined"
                    style=${styleMap(this.getModeStyles(this.getMode(), this.isDominant()))}>
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