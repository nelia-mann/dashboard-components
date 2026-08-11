import { css, html } from 'lit';
import { live } from 'lit/directives/live.js';
import { HaAudioComponent } from '../base-classes/ha-audio-component.js';
import { volume, volumeOff} from '../util/mdi-util.js';
import sharedStyles from '../styles/shared-styles.js';
import { play, pause, next, previous } from '../util/mdi-util.js';

export class TrackControls extends HaAudioComponent {

    static properties = {
        ...super.properties,
        _value: { state: true }
    }

    constructor() {
        super();
        this._value = 0;
    }

/********************************************** lifecycle *************************************************************/

    getTriggers() {
        return ["_value"];
    }

    updated() {
        if (!this.getChangeFlag()) {
            setTimeout(() => this.setInitialValues(), 1000);
        }
    }

    setInitialValues() {
        if (!this.getChangeFlag()) {
            this.setValue(this.getTrackPosition());
        }
    }

/********************************************** getter & setter logic *************************************************/

    getValue() {
        return this._value;
    }

    setValue(value) {
        this._value = value;
    }

    formatTime(time) {
        const minutes = Math.floor(time / 60);
        let seconds = String(time - (60 * minutes));
        (seconds.length === 1) && (seconds = "0" + seconds);
        return String(minutes) + ":" + seconds;
    }

    isTrackTimeUpdated(speakerId, value) {
        const newTime = this.getTrackRecordedPosition();
        return (newTime <= Number(value) + 1) && (Number(value) - 1 <= newTime);
    }

    getPlayPauseIcon() {
        return this.isPlaying() ? pause : play;
    }

    isUpdatedBasic(speakerId, value) {
        const newTime = this.getTrackRecordedPosition();
        return newTime !== value;
    }

/********************************************** interactive logic *****************************************************/

    handleOnInput(e) {
        this.raiseChangeFlag();
        this.setValue(Number(e.target.value));    
    }

    async handleOnChange(e) {
        const value = e.target.value;
        const data = { entity_id: this.getMainSpeakerId(), seek_position: value };
        this.callService('media_player', 'media_seek', data);
        await this.waitForEntity(this.getMainSpeakerId(), (speakerId) => this.isTrackTimeUpdated(speakerId, value));
        this.lowerChangeFlag();
        this.requestUpdate();
    }

    async handlePrevious() {
        const speakerId = this.getMainSpeakerId();
        this.raiseChangeFlag();
        const value = this.getTrackRecordedPosition();
        this.callService('media_player', 'media_previous_track', { entity_id: speakerId });
        await this.waitForEntity(this.getMainSpeakerId(), (speakerId) => this.isUpdatedBasic(speakerId, value));
        this.lowerChangeFlag();
        this.requestUpdate();
    }

    async handlePlayPause() {
        const speakerId = this.getMainSpeakerId();
        const wasPlaying = this.isPlaying();
        this.raiseChangeFlag();
        const value = this.getTrackRecordedPosition();
        this.callService('media_player', 'media_play_pause', { entity_id: speakerId });
        if (wasPlaying) {
            await this.waitForEntity(this.getMainSpeakerId(), (speakerId) => this.isUpdatedBasic(speakerId, value));
        }
        this.lowerChangeFlag();
        this.requestUpdate();
    }

    async handleNext() {
        const speakerId = this.getMainSpeakerId();
        this.raiseChangeFlag();
        const value = this.getTrackRecordedPosition();
        this.callService('media_player', 'media_next_track', { entity_id: speakerId });
        await this.waitForEntity(this.getMainSpeakerId(), (speakerId) => this.isUpdatedBasic(speakerId, value));
        this.lowerChangeFlag();
        this.requestUpdate();
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
        return html`
            <div class = "outlined button" @click=${this.handlePlayPause}> 
                <ha-svg-icon .path=${this.getPlayPauseIcon()} />
            </div>`  
    }

    buttons() {
        return html`
            <div class="buttons">
                ${this.previous()}
                ${this.playPause()}
                ${this.next()}             
            </div>`
    }

    track() {
        return html`
            <div class = "track">
                <div class="value"> ${this.formatTime(this.getValue())} </div>
                <input
                    type = "range"
                    max = ${this.getTrackLength()}
                    min = 0
                    .value = ${live(this.getValue())}
                    @input = ${this.handleOnInput}
                    @change = ${this.handleOnChange}
                    step = 1
                />
                <div class="value"> ${this.formatTime(this.getTrackLength())} </div>
            </div>`
    }

    render() {
        if (this.isInitialized()) {
            return html`
                <div class = "title" > ${this.getTrackTitle()} </div>
                ${this.track()}
                ${this.buttons()}`
        }
    }

/********************************************** style logic ***********************************************************/

    static styles = [sharedStyles, css`

        :host {
            width: var(--track-slider-overall-width, 90%);
            height: var(--track-slider-overall-height, 50px);
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-around;
            align-items: center;
        }

        .title {
            font-weight: var(--track-font-weight, 400);
            font-size: var(--track-font-size, 100%);        
        }

        .track {
            width: 100%;
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: center;
        }

        .value {
            width: var(--track-value-width, 10%);
            height: 100%;
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
        }

        input {
            width: var(--track-slider-input-width, 80%);
            accent-color: rgba(0, 0, 0, .6);
        }

        .buttons {
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

