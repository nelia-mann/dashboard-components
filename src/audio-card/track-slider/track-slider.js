import { html } from 'lit';
import { live } from 'lit/directives/live.js';
import { HaSubComponent } from '../../shared-resources/base-classes/ha-subcomponent.js';
import { volume, volumeOff} from '../../shared-resources/util/mdi-util.js';
import styles from './track.styles.js';
import sharedStyles from '../../shared-resources/styles/shared-styles.js';

export class TrackSlider extends HaSubComponent {

static properties= {
    ...super.properties,
    _value: { state: true }
}

constructor() {
    super();
    this._value = 0;
}

/********************************************** lifecycle ************************************************/

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

/********************************************** getter & setter logic ************************************/

getValue() {
    return this._value;
}

setValue(value) {
    this._value = value;
}

getSpeakerId() {
    return [...this.getEntityIds()][0];
}

getSpeakerState() {
    return this.getStates()[this.getSpeakerId()];
}

getSpeakerAttributes() {
    return this.getSpeakerState().attributes;
}

getTrackLength() {
    return this.getAttribute(this.getSpeakerId(), "media_duration");
}

getTrackTitle() {
    return this.getAttribute(this.getSpeakerId(), "media_title");
}

getTrackUpdated() {
    return new Date(this.getAttribute(this.getSpeakerId(), "media_position_updated_at")).getTime();
}

getTrackPosition() {
    const checkedTime = this.getTrackUpdated();
    const last = this.getAttribute(this.getSpeakerId(), "media_position");
    const now = Date.now();
    const time = last + (now - checkedTime) / 1000;
    if (time < this.getTrackLength()) return Math.round(time);
    return 0;
}

formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = String(time - (60 * minutes));
    (seconds.length === 1) && (seconds = "0" + seconds);
    return String(minutes) + ":" + seconds;
}

isTrackTimeUpdated(speakerId, oldTime) {
    const newTime = this.getAttribute(speakerId, "media_position_updated_at");
    return oldTime !== newTime;
}

isTrackTimeUpdated(speakerId, value) {
    const newTime = this.getAttribute(speakerId, "media_position");
    console.log(newTime, value);
    return Number(value) === newTime;
}

/********************************************** interactive logic ****************************************/

handleOnInput(e) {
    this.raiseChangeFlag();
    this.setValue(Number(e.target.value));    
}

async handleOnChange(e) {
    const value = e.target.value;
    const data = { entity_id: this.getSpeakerId(), seek_position: value };
    const oldTime = this.getAttribute(this.getSpeakerId(), "media_position_updated_at");
    this.callService('media_player', 'media_seek', data);
    await this.waitForEntity(this.getSpeakerId(), (speakerId) => this.isTrackTimeUpdated(speakerId, value));
    this.lowerChangeFlag();
    this.requestUpdate();
}

/********************************************** html/style logic *****************************************/

static styles = [sharedStyles, styles];


render() {
    if (this.isInitialized()) {
        return html`
            <div> ${this.getTrackTitle()} </div>
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
}

}

customElements.define("track-slider", TrackSlider);

