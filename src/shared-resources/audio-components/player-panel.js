import { css, html } from 'lit';
import { repeat } from 'lit-html/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { OFF, rgba } from '../util/color-util.js';
import { HaSubComponent } from '../base-classes/ha-subcomponent.js';
import sharedStyles from '../styles/shared-styles.js';
import './speaker-panel.js';
import './volume-slider.js';
import './track-slider.js';
import './track-controls.js';

export class PlayerPanel extends HaSubComponent {

    static properties = {
        ...super.properties,
        speakers: { state: true }
    }

    constructor() {
        super();
        this.speakers = {};
    }

/********************************************** lifecycle *************************************************************/

    getTriggers() {
        return ["speakers"]
    }

/********************************************** getter & setter logic *************************************************/

    getSpeakers() {
        return this.speakers;
    }

    getLeadSpeakerId() {
        return this.getSpeakers()[0];
    }

    getImageURL() {
        let URL = this.getAttribute(this.getLeadSpeakerId(), "entity_picture_local");
        if (URL) return URL;
        URL = this.getAttribute(this.getLeadSpeakerId(), "entity_picture");
        return URL;
    }

    getAlbumInitials() {
        const state = this.getState(this.getLeadSpeakerId());
        const albumName = state.attributes.media_album_name;
        if (albumName) {
            const albumWords = albumName.split(" ");
            let inits = '';
            albumWords.forEach((word) => {
                const init = word[0];
                const upper = init.toUpperCase();
                (upper === init) && (inits = inits + init);
            })
            if (inits.length > 2) {
                inits = inits.slice(0, 2);
            }
            return inits;
        }
    }

    getBackgroundCase() {
        if (this.getImageURL()) return 'albumArt';
        if (this.getAlbumInitials()) return 'initials';
        return 'nothing';
    }

    hasTrackLength() {
        return !!this.getAttribute(this.getLeadSpeakerId(), "media_duration");
    }

    hasVolume() {
        return !!this.getAttribute(this.getLeadSpeakerId(), "media_title");
    }

    hasTrack() {
        const track = this.getAttribute(this.getLeadSpeakerId(), "media_title");
        return !!track && track !== 'TV audio';
    }

/********************************************** interactive logic *****************************************************/

    handlePointerDown(e, id) {
        e.currentTarget.setPointerCapture(e.pointerId);
        this.createGhost(e, id);
        this.moveGhost(e.clientX, e.clientY);
    }

    handlePointerMove(e) {
        this.moveGhost(e.clientX, e.clientY);
    }

    handlePointerUp(e, id) {
        this.removeGhost();
        this.dispatchEvent(new CustomEvent('end', { 
            detail: {
                speakerId: id, 
                x: e.clientX, 
                y: e.clientY 
            }
        }));
    }

    createGhost(e, id) {
        const rect = e.currentTarget.getBoundingClientRect();
        this._ghost = document.createElement('speaker-tile');
        this._ghost.name = this.getName(id);
        Object.assign(this._ghost.style, {
            position: 'fixed',
            pointerEvents: 'none',
            opacity: '0.7',
            zIndex: '1000',
            width: rect.width + 'px',
            height: rect.height + 'px',
        });
        document.body.appendChild(this._ghost);
    }

    moveGhost(x, y) {
        if (!this._ghost) return;
        Object.assign(this._ghost.style, {
            left: x + 'px',
            top: y + 'px',
            transform: 'translate(-50%, -50%)',
        })
    }

    removeGhost() {
        this._ghost?.remove();
        this._ghost = null;
    }

/********************************************** html logic ************************************************************/

    makeImage() {
        const styles = {};
        const bgCase = this.getBackgroundCase();
        if (bgCase === 'albumArt') {
            styles['backgroundImage'] = `url(${this.getImageURL()})`;
        } else if (bgCase === 'nothing') {
            styles['background'] = rgba(OFF, .5);
        }
        return styles;
    }

    makeBGInits() {
        if (this.getBackgroundCase() === 'initials') {
            return html`<span class = "initials" style = ${styleMap(this.getFontColor())}> 
                    ${this.getAlbumInitials()} 
                </span>`;
        }
    }

    getFontColor() {
        const styles = {};
        styles['color'] = rgba(OFF, .5);
        return styles;
    }

    getSpeakerTile(id) {
        return html`<speaker-tile
                class = "outlined player-pop"
                .name = ${this.getName(id)}
                @pointerdown = ${(e) => this.handlePointerDown(e, id)}
                @pointerup = ${(e) => this.handlePointerUp(e, id)}
                @pointermove = ${this.handlePointerMove}
            />`;
    }

    getSpeakerPanel() {
        return html`
            <div class="speakerTiles"> 
                ${repeat(this.getSpeakers(), (speakerId) => speakerId, speakerId => this.getSpeakerTile(speakerId))}
            </div> `
    }

    getVolumeSlider() {
        if (this.hasVolume()) {
            return html`<volume-slider
                    .changedEntityIds = ${this.getCEIs()}
                    .entityIds = ${this.getEntityIds()}
                    .states = ${this.getStates()}
                    .callService = ${this.callService}
                />`
        }
    }

    getTrackSlider() {
        if (this.hasTrackLength()) {
            return html`<track-slider
                    .changedEntityIds = ${this.getCEIs()}
                    .entityIds = ${new Set([this.getLeadSpeakerId()])}
                    .states = ${this.getStates()}
                    .callService = ${this.callService}
                />`   
        } 
    }

    getTrackControls() {
        if (this.hasTrack()) {
            return html`<track-controls
                .changedEntityIds = ${this.getCEIs()}
                .entityIds = ${new Set([this.getLeadSpeakerId()])}
                .states = ${this.getStates()}
                .callService = ${this.callService}
            />`
        }
    }

    getControlPanel() {
        return html`<div class = "outlined controls player-pop"> 
                ${this.getTrackSlider()}
                ${this.getTrackControls()} 
                ${this.getVolumeSlider()} 
            </div>`;
    }

    render() {
        if (this.isInitialized()) {
            return html`
                ${this.makeBGInits()}
                <div class = "outlined player" style=${styleMap(this.makeImage())}>
                    ${this.getSpeakerPanel()}
                    ${this.getControlPanel()}
                </div>`;
        }
    }

/********************************************** style logic ***********************************************************/

    static styles = [sharedStyles, css`

    :host {
        height: var(--player-panel-height, 280px);
        width: var(--player-panel-width, 180px);
        position: relative;
    }

    .player {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        align-items: center;
        padding: var(--player-panel-padding, 10px);
        overflow: hidden;
        background-size: contain;
    }

    .initials {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        font-size: var(--player-BGInits-size, 100%);
    }

    .speakerTiles{
        width: calc(100% - 2 * var(--player-speakers-margin, 5%));
        display: flex;
        flex-flow: row wrap;
        justify-content: space-around;
        align-items: flex-start;
    }

    .controls {
        margin: var(--player-controls-margin, 10px);
        width: calc(100% - 2 * var(--player-controls-margin, 10px));
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;
        align-items: center;
    }

`];

}

customElements.define("player-panel", PlayerPanel);
