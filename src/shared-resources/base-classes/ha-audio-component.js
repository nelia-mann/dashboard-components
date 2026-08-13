import { HaSubComponent } from './ha-subcomponent.js';

/* 
All methods in here that relate to speaker state and attributes
have inputs that can either be specified or left blank; 
these inputs are always either a single speaker ID, or an array of them.  If
these are left blank, they use the methods that pull the speaker IDs or main 
speaker ID from the entityIds in the class.

*/

export class HaAudioComponent extends HaSubComponent {

    getSpeakerIds() {
        return [...this.getEntityIds()];
    }

    getMainSpeakerId() {
        return this.getSpeakerIds()[0];
    }

    getTrackLength(speakerId = this.getMainSpeakerId()) {
        return this.getAttribute(speakerId, "media_duration");
    }

    getTrackTitle(speakerId = this.getMainSpeakerId()) {
        return this.getAttribute(speakerId, "media_title");
    }

    getTrackArtist(speakerId = this.getMainSpeakerId()) {
        return this.getAttribute(speakerId, "media_artist");
    }

    getTrackUpdated(speakerId = this.getMainSpeakerId()) {
        return new Date(this.getAttribute(speakerId, "media_position_updated_at")).getTime();
    }

    isPlaying(speakerId = this.getMainSpeakerId()) {
        return this.getStateState(speakerId) === "playing";
    }

    getTrackRecordedPosition(speakerId = this.getMainSpeakerId()) {
        return this.getAttribute(speakerId, "media_position");
    }

    getTrackPosition(speakerId = this.getMainSpeakerId()) {
        const checkedTime = this.getTrackUpdated(speakerId);
        let time = this.getTrackRecordedPosition(speakerId);
        const now = Date.now();
        if (this.isPlaying(speakerId)) {
            time = Math.floor(time + (now - checkedTime) / 1000);
        } 
        return Math.min(time, this.getTrackLength(speakerId));
    }

    getSpeakerVolume(speakerId = this.getMainSpeakerId()) {
        const volume = this.getAttribute(speakerId, "volume_level");
        if (volume) return Number(volume);
        return 0;
    }

    hasVolume(speakerId = this.getMainSpeakerId()) {
        const volume = this.getAttribute(speakerId, 'volume');
        return volume !== 'undefined';
    }

    getAverageVolume(speakerIds = this.getSpeakerIds()) {
        const volumes = speakerIds.map((speakerId) => this.getSpeakerVolume(speakerId));
        return volumes.reduce((sum, value) => sum + value) / volumes.length;
    }

    isMuted(speakerId = this.getMainSpeakerId()) {
        return this.getAttribute(speakerId, "is_volume_muted");
    }

    isAllMuted(speakerIds = this.getSpeakerIds()) {
        const mutes = speakerIds.map((speakerId) => this.isMuted(speakerId));
        return mutes.every(element => element);
    }

    getGroup(speakerId = this.getMainSpeakerId()) {
        const group = this.getAttribute(speakerId, "group_members");
        if (group.length === 0) {
            return [speakerId];
        } else {
            return group;
        }
    }

    isAlone(speakerId = this.getMainSpeakerId()) {
        return this.getGroup(speakerId).length === 1;       
    }

    getSource(speakerId = this.getMainSpeakerId()) {
        return this.getAttribute(speakerId, "source");
    }

}