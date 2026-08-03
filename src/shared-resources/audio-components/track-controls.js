import { css, html } from 'lit';
import { HaSubComponent } from '../base-classes/ha-subcomponent.js';
import sharedStyles from '../styles/shared-styles.js';
import { play, pause, next, previous } from '../util/mdi-util.js';

export class TrackControls extends HaSubComponent {

/********************************************** getter & setter logic *************************************************/

    getSpeakerId() {
        return [...this.getEntityIds()][0];
    }

    getSpeakerState() {
        return this.getStateState(this.getSpeakerId());
    }

    isPlaying() {
        const state = this.getSpeakerState();
        return state === 'playing';
    }

    getPlayPauseIcon() {
        return this.isPlaying() ? pause : play;
    }

/********************************************** interactive logic *****************************************************/

    handlePrevious() {
        const speakerId = this.getSpeakerId();
        if (!speakerId) return;
        this.callService('media_player', 'media_previous_track', { entity_id: speakerId });
    }

    handlePlayPause() {
        const speakerId = this.getSpeakerId();
        if (!speakerId) return;
        this.callService('media_player', 'media_play_pause', { entity_id: speakerId });
    }

    handleNext() {
        const speakerId = this.getSpeakerId();
        if (!speakerId) return;
        this.callService('media_player', 'media_next_track', { entity_id: speakerId });
    }

/********************************************** html logic ************************************************************/

    previous() {
        return html`<div class = "outlined button" @click=${this.handlePrevious}> 
                <ha-svg-icon .path=${previous} />
            </div>`
    }

    next() {
        return html`<div class = "outlined button" @click=${this.handleNext}> 
                <ha-svg-icon .path=${next} />
            </div>`        
    }

    playPause() {
        return html`<div class = "outlined button" @click=${this.handlePlayPause}> 
                <ha-svg-icon .path=${this.getPlayPauseIcon()} />
            </div>`  
    }

    render() {
        if (this.isInitialized()) {
            return html`
                ${this.previous()}
                ${this.playPause()}
                ${this.next()}
            `;
        }
    }

/********************************************** style logic ***********************************************************/

    static styles = [sharedStyles, css`

        :host {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-around;
            align-items: center;
            width: var(--control-button-row-width, 80%);
            height: var(--control-button-row-height, 50px);
        }

        .button {
            border-radius: 50%;
            width: var(--controls-button-height, 30px);
            height: var(--controls-button-height, 30px);
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
        }

    `];

}

customElements.define("track-controls", TrackControls);
