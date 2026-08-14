import { css, html } from 'lit';
import { repeat } from 'lit-html/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { OFF, rgba } from '../util/color-util.js';
import { HaAudioComponent } from '../base-classes/ha-audio-component.js';
import sharedStyles from '../styles/shared-styles.js';
import './speaker-tile.js';
import './volume-slider.js';
import './track-controls.js';

export class PlayerPanel extends HaAudioComponent {

    static properties = {
        ...super.properties,
        entityIds: { state: true }
    }

/********************************************** lifecycle *************************************************************/

    getTriggers() {
        return ["entityIds"];
    }

/********************************************** getter & setter logic *************************************************/

    getImageURL() {
        let URL = this.getAttribute(this.getMainSpeakerId(), "entity_picture_local");
        if (URL) return URL;
        URL = this.getAttribute(this.getMainSpeakerId(), "entity_picture");
        return URL;
    }

    getAlbumInitials() {
        const albumName = this.getAttribute(this.getMainSpeakerId(), "media_album_name");
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
        return !!this.getAttribute(this.getMainSpeakerId(), "media_duration");
    }

    hasVolume() {
        return !!this.getAttribute(this.getMainSpeakerId(), "media_title");
    }

    hasTrack() {
        const track = this.getAttribute(this.getMainSpeakerId(), "media_title");
        return !!track && track !== 'TV audio';
    }


/********************************************** interactive logic *****************************************************/


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

    getVolumeSlider() {
        if (this.hasVolume()) {
            return html`
                <volume-slider
                    .changedEntityIds = ${this.getCEIs()}
                    .entityIds = ${this.getEntityIds()}
                    .states = ${this.getStates()}
                    .callService = ${this.callService}
                />`
        }
    }

    getTrackControls() {
        if (this.hasTrackLength()) {
            return html`
                <track-controls
                    .changedEntityIds = ${this.getCEIs()}
                    .entityIds = ${new Set([this.getMainSpeakerId()])}
                    .states = ${this.getStates()}
                    .callService = ${this.callService}
                />`   
        } 
    }

    getControlPanel() {
        return html`
            <div class = "outlined controls player-pop"> 
                ${this.getTrackControls()}
                ${this.getVolumeSlider()} 
            </div>`;
    }

    render() {
        if (this.isInitialized()) {
            return html`
                ${this.makeBGInits()}
                changed2
                <div class = "outlined player" style=${styleMap(this.makeImage())}>
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
        align-items: center;
        justify-content: flex-end;
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
