import { html } from 'lit';
import { repeat } from 'lit-html/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { OFF, rgba } from './../../shared-resources/util/color-util.js';
import { HaSubComponent } from '../../shared-resources/base-classes/ha-subcomponent';
import styles from './player.styles.js';
import sharedStyles from '../../shared-resources/styles/shared-styles.js';
import '../speaker/speaker-panel.js';
import '../volume-slider/volume-slider.js';
import '../track-slider/track-slider.js';

export class PlayerPanel extends HaSubComponent {

    static properties = {
        ...super.properties,
        speakers: { state: true }
    }

    constructor() {
        super();
        this.speakers = {};
    }

/********************************* lifecycle ******************************************************/

    getTriggers() {
        return ["speakers"]
    }

    /***************************** getter and setter ***********************************************/

    getSpeakers() {
        return this.speakers;
    }

    getLeadSpeakerId() {
        return this.getSpeakers()[0];
    }

    /*********************************** interactive logic *****************************************/

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

    /************************************ html and style *********************************************/

    getBackgroundCase() {
        if (this.getImageURL()) return 'albumArt';
        if (this.getAlbumInitials()) return 'initials';
        return 'nothing';
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

    makeImage() {
        const styles = {};
        const bgCase = this.getBackgroundCase();
        if (bgCase === 'albumArt') {
            styles['backgroundImage'] = `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${this.getImageURL()})`;
        } else if (bgCase === 'nothing') {
            styles['background'] = rgba(OFF, .5);
        }
        return styles;
    }

    makeBGInits() {
        if (this.getBackgroundCase() === 'initials') {
            return html`<span class = "initials" style = ${styleMap(this.getFontColor())}> ${this.getAlbumInitials()} </span>`;
        }
    }

    getBackground() {
        const styles = {};
        styles['background-color'] = 'rgba(255, 255, 255, .7)';
        return styles;
    }

    getFontColor() {
        const styles = {};
        styles['color'] = rgba(OFF, .5);
        return styles;
    }

    static styles = [sharedStyles, styles];

    getSpeakerTile(id) {
        return html`<speaker-tile
                class = "outlined"
                .name = ${this.getName(id)}
                style = ${styleMap(this.getBackground())}
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
        return html`<volume-slider
                class = "outlined volume"
                style = ${styleMap(this.getBackground())}
                .changedEntityIds = ${this.getCEIs()}
                .entityIds = ${this.getEntityIds()}
                .states = ${this.getStates()}
                .callService = ${this.callService}
            />`
    }

    getTrackSlider() {
        return html`<track-slider
            class = "outlined volume"
            style = ${styleMap(this.getBackground())}
            .changedEntityIds = ${this.getCEIs()}
            .entityIds = ${new Set([this.getLeadSpeakerId()])}
            .states = ${this.getStates()}
            .callService = ${this.callService}
        />`    
    }

    render() {
        if (this.isInitialized()) {
            return html`
                ${this.makeBGInits()}
                <div class = "outlined player" style=${styleMap(this.makeImage())}>
                    ${this.getSpeakerPanel()}
                    ${this.getTrackSlider()}
                    ${this.getVolumeSlider()}
                </div>`;
        }
    }
}

customElements.define("player-panel", PlayerPanel);