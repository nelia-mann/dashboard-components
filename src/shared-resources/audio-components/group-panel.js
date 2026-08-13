import { css, html } from 'lit';
import { repeat } from 'lit-html/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { interpolateRGB, OFF, VOLUME, rgba } from './../util/color-util.js';
import { tv, lineIn } from '../util/mdi-util.js';
import { HaAudioComponent } from '../base-classes/ha-audio-component.js';
import sharedStyles from '../styles/shared-styles.js';
import './speaker-tile.js';

export class SpeakerGroupPanel extends HaAudioComponent {


    static properties = {
        ...super.properties,
        entityIds: { state: true },
        selected: { type: Boolean }
    }

/********************************************** lifecycle *************************************************************/

    getTriggers() {
        return ['entityIds', 'selected'];
    }

    updated(changedProperties) {
        super.updated(changedProperties);
        Object.assign(this.style, this.getStyles());
    }

/********************************************** getter & setter logic *************************************************/

    getRGB(opacity) {
        if (this.isPlaying()) {
            const volume = this.getAverageVolume();
            const rgb = interpolateRGB(OFF, VOLUME, volume);
            return rgba(rgb, opacity);
        } else {
            return rgba(OFF, opacity);
        }
    }

    isSelected() {
        return this.selected;
    }

/********************************************** interactive logic *****************************************************/

handlePointerDown(e, speakerId) {
    this._debugLog("handlePointerDown inside group-panel fires");
    const rect = e.currentTarget.getBoundingClientRect();
    this.dispatchEvent(new CustomEvent('speaker-drag-start', { 
            detail : {
                speakerId: speakerId,
                pointerId: e.pointerId,
                clientX: e.clientX,
                clientY: e.clientY,
                width: rect.width,
                height: rect.height,
            }
        }));
}

/********************************************** html logic ************************************************************/

    speakerTile(speakerId) {
        return html`
            <speaker-tile
                .changedEntityIds = ${this.getCEIs()}
                .entityIds = ${new Set([speakerId])}
                .states = ${this.getStates()}
                .selected = ${this.isSelected()}
                @pointerdown = ${(e) => this.handlePointerDown(e, speakerId)}
                .callService = ${this.callService}
            />`
    }

    _debugLog(msg) {
        this._debugMessages = [...(this._debugMsgs || []), msg]
    }

    playerTile() {
        return html`
            <div class="player">
                    <div>
                        ${(this._debugMessages || []).map(m => html`<div>${m}</div>`)}
                    </div>
                ${repeat(this.getSpeakerIds(), (speakerId) => speakerId, (speakerId) => this.speakerTile(speakerId))}
            </div>`
    }

    playerIcon() {
        switch (this.getSource()) {
            case 'TV':
                return html`<ha-svg-icon .path=${tv} />`;
            case 'Line-in':
                return html`<ha-svg-icon .path=${lineIn} />`;
            default:
                return html`<ha-svg-icon />`;
        }
    }

    render() {
        if (this.isInitialized()) {
            return html`
                ${this.playerIcon()}
                ${this.playerTile()}`
        }
    }

/********************************************** style logic ***********************************************************/

    getStyles() {
        const styles = { 'background-color': this.getRGB(0.5) }
        styles['outline'] = this.isSelected() ? `solid ${this.getRGB(1)}` : '';
        return styles;
    }

    static styles = [sharedStyles, css`
        
        :host {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-around;
            align-items: center;
            padding: var(--player-tile-padding, 10px);
            padding-right: var(--player-tile-padding-right, 25px);
            padding-top: 0px;
            margin-bottom: 15px;
            margin-top: 15px;
            touch-action: none;
        }

        ha-svg-icon {
            width: 30px;
            height: 100%;
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: center;
            margin-top: 10px;
            margin-right: 10px;
        }

        .player {
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-around;
            align-items: center;  
            touch-action: none;        
        }
        
    `]

}

customElements.define("speaker-group-panel", SpeakerGroupPanel);