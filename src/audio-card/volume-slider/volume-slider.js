import { html } from 'lit';
import { HaSubComponent } from '../../shared-resources/base-classes/ha-subcomponent.js';
import { volume, volumeOff} from '../../shared-resources/util/mdi-util.js';
import styles from './volume.styles.js';
import sharedStyles from '../../shared-resources/styles/shared-styles.js';

export class MainVolumeSlider extends HaSubComponent {

static properties= {
    ...super.properties,
    _value: { state: true }
}

constructor() {
    super();
    this._value = 0.01;
}

/********************************************** lifecycle ************************************************/

getTriggers() {
    return ["_value"];
}

onFirstUpdate() {
    this.setValue(this.getAverageVolume());
}

/********************************************** getter logic *********************************************/

getVolume(speakerId) {
    const state = this.getState(speakerId);
    const volume = state.attributes.volume_level;
    if (volume) return Number(volume);
    return 0;
}

getAverageVolume() {
    const speakerIds = [...this.getEntityIds()];
    const volumes = speakerIds.map((speakerId) => this.getVolume(speakerId));
    return volumes.reduce((sum, value) => sum + value) / volumes.length;
}

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

isMuted(speakerId) {
    const state = this.getState(speakerId);
    return state.attributes.is_volume_muted;
}

isAllMuted() {
    const speakerIds = [...this.getEntityIds()];
    const mutes = speakerIds.map((speakerId) => this.isMuted(speakerId));
    return mutes.every(element => element === true);
}

/********************************************** interactive logic ****************************************/

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

/********************************************** html/style logic *****************************************/

static styles = [sharedStyles, styles];

muteButton() {
    let icon;
    if (this.isAllMuted()) {
        icon = volumeOff;
    } else {
        icon = volume;
    }
    return html`<div class = "outlined mute" @click=${this.handleOnClick}> <ha-svg-icon .path=${icon} /></div>`
}

render() {
    if (this.isInitialized()) {
        return html`
            ${this.muteButton()}
            <input
                type="range"
                max = 1
                min = 0
                value = ${this.getValue()}
                @input ${this.handleOnInput}
                @change = ${this.handleOnChange}
                step = 0.01
            />`
    }
}

}

customElements.define("main-volume-slider", MainVolumeSlider);

