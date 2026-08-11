import { HaSubComponent } from './ha-subcomponent.js';

export class HaAudioComponent extends HaSubComponent {

    getSpeakerIds() {
        return [...this.getEntityIds()];
    }

    getMainSpeakerId() {
        return this.getSpeakerIds()[0];
    }

    getTrackLength() {
        return this.getAttribute(this.getMainSpeakerId(), "media_duration");
    }

    getTrackTitle() {
        return this.getAttribute(this.getMainSpeakerId(), "media_title");
    }

    getTrackArtist() {
        return this.getAttribute(this.getMainSpeakerId(), "media_artist");
    }

    getTrackUpdated() {
        return new Date(this.getAttribute(this.getMainSpeakerId(), "media_position_updated_at")).getTime();
    }

    isPlaying() {
        return this.getStateState(this.getMainSpeakerId()) === "playing";
    }

    getTrackRecordedPosition() {
        return this.getAttribute(this.getMainSpeakerId(), "media_position");
    }

    getTrackPosition() {
        const checkedTime = this.getTrackUpdated();
        let time = this.getTrackRecordedPosition();
        const now = Date.now();
        if (this.isPlaying()) {
            time = Math.floor(time + (now - checkedTime) / 1000);
        } 
        return Math.min(time, this.getTrackLength());
    }

    getSpeakerVolume(speakerId) {
        const volume = this.getAttribute(speakerId, "volume_level");
        if (volume) return Number(volume);
        return 0;
    }

    getAverageVolume() {
        const volumes = this.getSpeakerIds().map((speakerId) => this.getSpeakerVolume(speakerId));
        return volumes.reduce((sum, value) => sum + value) / volumes.length;
    }

    isMuted(speakerId) {
        return this.getAttribute(speakerId, "is_volume_muted");
    }

    isAllMuted() {
        const mutes = this.getSpeakerIds().map((speakerId) => this.isMuted(speakerId));
        return mutes.every(element => element);
    }

    getGroup(speakerId) {
        return this.getAttribute(speakerId, "group_members");
    }

    isAlone(speakerId) {
        if (this.getGroup(speakerId)) {
            return this.getGroup(speakerId).length === 0;
        } else return true;        
    }

}