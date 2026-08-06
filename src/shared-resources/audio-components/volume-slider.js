import { css, html } from 'lit';
import { HaAudioComponent } from '../base-classes/ha-audio-component.js';
import { volume, volumeOff} from '../util/mdi-util.js';
import sharedStyles from '../styles/shared-styles.js';

export class VolumeSlider extends HaAudioComponent {

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

    setInitialValues() {
        this.setValue(this.getAverageVolume());
    }

/********************************************** getter & setter logic *************************************************/

    getValue() {
        return this._value;
    }

    setValue(value) {
        (value) && (this._value = value);
    }

    isVolume(speakerId, value) {
        const volume = Number(this.getVolume(speakerId));
        return volume === value;
    }

/********************************************** interactive logic *****************************************************/

    scaleVolume(speakerId, oldAverage, newAverage) {
        const oldVolume = this.getVolume(speakerId);
        let newVolume;
        if (newAverage > oldAverage) {
            const invScaleFactor = (1 - newAverage) / (1 - oldAverage);
            newVolume = 1 - invScaleFactor * (1 - oldVolume);
        } else if (oldAverage > newAverage) {
            const scaleFactor = newAverage / oldAverage;
            newVolume = oldVolume * scaleFactor;
        }
        newVolume = Math.floor(newVolume * 100) / 100;
        const data = { entity_id: speakerId, volume_level: newVolume };
        this.callService('media_player', 'volume_set', data); 
        return this.waitForEntity(speakerId, (speakerId) => this.isVolume(speakerId, newVolume));
    }

    onMute(speakerId) {
        const data = { entity_id: speakerId, is_volume_muted: true};
        this.callService('media_player', 'volume_mute', data);
        return this.waitForEntity(speakerId, (speakerId) => this.isMuted(speakerId));
    }

    offMute(speakerId) {
        const data = { entity_id: speakerId, is_volume_muted: false};
        this.callService('media_player', 'volume_mute', data);
        return this.waitForEntity(speakerId, (speakerId) => !this.isMuted(speakerId));
    }

    async toggleMuteAll() {
        const speakerIds = [...this.getEntityIds()];
        let promises;
        if (!this.isAllMuted()) {
            promises = speakerIds.map((speakerId) => this.onMute(speakerId));
        } else {
            promises = speakerIds.map((speakerId) => this.offMute(speakerId));
        }
        await Promise.all(promises);
    }

    async setAverageVolume(newVolume) {
        const oldVolume = this.getValue();
        const speakerIds = [...this.getEntityIds()];
        this.raiseChangeFlag();
        const promises = speakerIds.map((speakerId) => this.scaleVolume(speakerId, oldVolume, newVolume));
        await Promise.all(promises);
        this.lowerChangeFlag();
    }

    handleOnInput(e) {
        this.setValue(Number(e.target.value));
    }

    handleOnChange(e) {
        this.setAverageVolume(Number(e.target.value));
    }

    handleOnClick() {
        this.toggleMuteAll();
    }

/********************************************** html logic ************************************************************/

    muteButton() {
        let icon;
        if (this.isAllMuted()) {
            icon = volumeOff;
        } else {
            icon = volume;
        }
        return html`<div class = "outlined mute" @click=${this.handleOnClick}> <ha-svg-icon .path=${icon}/> </div>`
    }

    slider() {
        return html`<input
                type="range"
                max = 1
                min = 0
                .value = ${this.getValue()}
                @input ${this.handleOnInput}
                @change = ${this.handleOnChange}
                step = 0.01
            />`;
    }

    render() {
        if (this.isInitialized()) {
            return html`
                ${this.muteButton()}
                ${this.slider()}
            `
        }
    }

/********************************************** style logic ***********************************************************/

    static styles = [sharedStyles, css`

        :host {
            width: var(--volume-slider-overall-width, 90%);
            height: var(--volume-slider-overall-height, 40px);
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-around;
            align-items: center;
        }

        input {
            width: var(--volume-slider-input-width, 70%);
            accent-color: rgba(0, 0, 0, .6);
        }

        .mute {
            border-radius: 50%;
            height: var(--mute-button-height, 30px);
            width: var(--mute-button-height, 30px);
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;        
        }

    `];

}

customElements.define("volume-slider", VolumeSlider);

