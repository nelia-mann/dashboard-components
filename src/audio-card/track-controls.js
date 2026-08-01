import { css, html } from 'lit';
import { HaSubComponent } from '../shared-resources/base-classes/ha-subcomponent.js';
import sharedStyles from '../shared-resources/styles/shared-styles.js';

export class TrackControls extends HaSubComponent {

    static properties = {
        ...super.properties,
    }

    /********************************************** lifecycle *******************************************************/

    getTriggers() {
        return [];
    }

    /********************************************** getter logic ****************************************************/

    getSpeakerId() {
        return [...this.getEntityIds()][0];
    }

    getSpeakerState() {
        return this.getStates()[this.getSpeakerId()];
    }

    isPlaying() {
        const state = this.getSpeakerState();
        return state?.state === 'playing';
    }

    getPlayPauseLabel() {
        return this.isPlaying() ? 'Pause' : 'Play';
    }

    /********************************************** interactive logic ***********************************************/

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

    /********************************************** html logic ******************************************************/

    render() {
        if (this.isInitialized()) {
            return html`
                <div class="controls">
                    <button class="control-button" @click=${this.handlePrevious}>⏮</button>
                    <button class="control-button primary" @click=${this.handlePlayPause}>${this.getPlayPauseLabel()}</button>
                    <button class="control-button" @click=${this.handleNext}>⏭</button>
                </div>
            `;
        }
    }

    /********************************************** style logic *****************************************************/

    static styles = [sharedStyles, css`

    :host {
        display: block;
        width: 100%;
    }

    .controls {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--track-controls-gap, 8px);
        width: 100%;
    }

    .control-button {
        border: 1px solid rgba(255, 255, 255, 0.6);
        background: rgba(255, 255, 255, 0.15);
        border-radius: 999px;
        color: inherit;
        cursor: pointer;
        min-width: 42px;
        min-height: 42px;
        padding: 0 12px;
        font-size: 0.9rem;
        transition: opacity 0.2s ease;
    }

    .control-button:hover {
        opacity: 0.9;
    }

    .control-button.primary {
        min-width: 74px;
        font-weight: 600;
    }

`];

}

customElements.define("track-controls", TrackControls);
