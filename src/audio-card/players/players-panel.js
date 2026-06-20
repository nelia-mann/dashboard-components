import { html } from 'lit';
import { repeat } from 'lit-html/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { HaSubComponent } from '../../shared-resources/base-classes/ha-subcomponent';
import { OFF, rgba } from './../../shared-resources/util/color-util.js';
import styles from './players.styles.js';
import sharedStyles from '../../shared-resources/styles/shared-styles.js';
import '../idle/idle-panel.js';
import '../player/player-panel.js';

export class PlayersPanel extends HaSubComponent {

    _moveFlag;

    static properties = {
        ...super.properties,
        players: { state: true },
        idles: { state: true }
    }

    constructor() {
        super();
        this.players = {};
        this.idles = [];
        this._moveFlag = false;
    }

    /********************************** lifecycle  ************************************/

    getTriggers() {
        return ["players", "idles"];
    }

    onFirstUpdate() {
        this.assignRoles();
    }

    /************************************ *********************************************/

    getGroup(speakerId) {
        return this.getState(speakerId).attributes.group_members;
    }

    isUnjoined(speakerId) {
        return this.getGroup(speakerId).length === 0;
    }

    isLeader(speakerId) {
        const group = this.getGroup(speakerId);
        if (group.length === 0) {
            return false;
        } else {
            return (speakerId === group[0]);
        }
    }

    getLeader(speakerId) {
        const group = this.getGroup(speakerId);
        if (group.length === 0) {
            return speakerId;
        } else return group[0];
    }

    isInactive(id) {
        return (this.isUnjoined(id)) && ((this.getStateState(id) === 'idle') || (this.getStateState(id) === 'off'))
    }

    /******************************** player/idle logic ***********************************/

    raiseFlag() {
        this._moveFlag = true;
    }

    lowerFlag() {
        this._moveFlag = false;
    }

    assignRoles() {
        const ids = [...this.getStructure().sorted];
        let dict = {};
        let newIdles = [];
        ids.forEach((id) => {
            if (this.isInactive(id)) {
                newIdles.push(id);
            } else {
                const group = this.getGroup(id);
                if (group[0] === id) {
                    dict[id] = group;
                } else if (group.length === 0) {
                    dict[id] = [id];
                }
            }   
        })
        this.players = dict;
        this.idles = newIdles;
    }

    createPlayer(speakerId) {
        const newPlayers = {...this.players};
        newPlayers[speakerId] = [speakerId];
        this.players = newPlayers;
        this.removeIdle(speakerId);
    }

    getPlayers() {
        return {...this.players};
    }

    getPlayer(leaderId) {
        return [...this.getPlayers()[leaderId]];
    }

    getPlayerLeader(speakerId) {
        let foundId;
        Object.keys(this.getPlayers()).forEach(leaderId => {
            const speakers = this.getPlayer(leaderId);
            if (speakers.includes(speakerId)) {
                foundId = leaderId;
            }
        });
        return foundId;
    }

    isPlayerLeader(speakerId) {
        return this.getPlayerLeader(speakerId) === speakerId;
    }

    getIdles() {
        return [...this.idles];
    }

    removeIdle(speakerId) {
        const newIdles = this.getIdles().filter(id => (id !== speakerId));
        this.idles = newIdles;
    }

    addIdle(speakerId) {
        const newIdles = this.getIdles();
        newIdles.push(speakerId);
        this.idles = newIdles;
    }

    addToPlayer(speakerId, leaderId) {
        const playerList = this.getPlayer(leaderId);
        playerList.push(speakerId);
        const newPlayers = this.getPlayers();
        newPlayers[leaderId] = playerList;
        this.players = newPlayers;
    }

    removeFromPlayer(speakerId) {
        const leaderId = this.getPlayerLeader(speakerId);
        const newSpeakers = this.getPlayer(leaderId).filter((id) => (id !== speakerId));
        const newPlayers = this.getPlayers();
        if (speakerId === leaderId) {
            if (newSpeakers.length > 0) {
                const newLeader = newSpeakers[0];
                newPlayers[newLeader] = newSpeakers;
            }
            delete newPlayers[leaderId];
        } else {
            newPlayers[leaderId] = newSpeakers;
        }
        this.players = newPlayers;
    } 

    /************************************* interactive logic *************************************************/

    unJoinLeader(leaderId) {
        const group = this.getGroup(leaderId);
        if (group && group.length > 1) {
            const remainingSpeakers = group.filter((id) => (id !== leaderId));
            const newLeaderId = remainingSpeakers[0];
            const newFollowers = remainingSpeakers.filter(id => (id !== newLeaderId));
            const transferData = { 
                entity_id: newLeaderId,
                source_player: leaderId
             };
            this.callService('music_assistant', 'transfer_queue', transferData);
            const joinData = {
                entity_id: newLeaderId,
                group_members: newFollowers
            }
            this.callService('media_player', 'join', joinData);
        }
    }

    unJoinFollower(speakerId) {
        const data = { entity_id: speakerId };
        this.callService('media_player', 'unjoin', data);
    }

    joinSpeaker(speakerId, leaderId) {
        const data = {
            entity_id: leaderId,
            group_members: [speakerId]
        }
        this.callService('media_player', 'join', data);
    }

    removeSpeaker(speakerId) {
        if (this.isLeader(speakerId)) {
            this.unJoinLeader(speakerId);
        } else {
            this.unJoinFollower(speakerId);
        }
        this.removeFromPlayer(speakerId);
    }

    addSpeaker(speakerId, targetLeaderId) {
        this.joinSpeaker(speakerId, targetLeaderId);
        this.addToPlayer(speakerId, targetLeaderId);
        this.removeIdle(speakerId);
    }

    async transferSpeaker(speakerId, targetLeaderId) {
        if (speakerId === targetLeaderId) return;
        this.removeSpeaker(speakerId);
        await this.waitForState(speakerId, this.isUnjoined);
        this.addSpeaker(speakerId, targetLeaderId);
    }

    async transferToEmpty(speakerId) {
        this.removeSpeaker(speakerId);
        await this.waitForState(speakerId, this.isUnjoined);
        this.createPlayer(speakerId);
    }

    handleDrop(e, leaderId) {
        const joinId = e.dataTransfer.getData('join');
        const transferId = e.dataTransfer.getData('transfer');
        if (joinId) {
            if (leaderId) {
                this.addSpeaker(joinId, leaderId);
            } else {
                this.createPlayer(joinId);
            }
        } else {
            if (leaderId) {
                this.transferSpeaker(transferId, leaderId);
            } else {
                this.transferToEmpty(transferId);
            }
        } 
        this.lowerFlag();
    }

    handleDragStart(e, id) {
        this.raiseFlag();
        e.dataTransfer.setData('join', id);
    }

    handleDragOver(e) {
        e.preventDefault();
    }

    handleDragEnd(e, speakerId) {
        if (this._moveFlag) {
            this.removeSpeaker(speakerId);
            this.addIdle(speakerId);
        }
    }


    /************************************* html/style logic *************************************************/

    getIdleStyles() {
        let styles = {};
        styles['background-color'] = rgba(OFF, 0.5);
        return styles;
    }

    getIdlePanel(id) {
        return html`<idle-panel 
                        draggable="true"
                        class="outlined"
                        style=${styleMap(this.getIdleStyles())}
                        .name = ${this.getName(id)} 
                        @dragstart = ${(e) => this.handleDragStart(e, id)}
                        @dragover = ${this.handleDragOver}
                    />`
    }

    getEmptyPanel() {
        if (this.getIdles().length > 0) {
            return html`<div 
                    class="empty outlined"
                    @drop = ${(e) => this.handleDrop(e, '')}
                    @dragover = ${this.handleDragOver}
                >
                    Placeholder
                </div>`
        }
    }

    getPlayerPanel(leaderId) {
        return html`<player-panel
                class="outlined"
                .changedEntityIds = ${this.getCEIs()}
                .entityIds=${new Set(this.getPlayer(leaderId))}
                .speakers = ${this.getPlayer(leaderId)}
                .states=${this.getStates()}
                @start = ${this.raiseFlag}
                @end = ${(e) => this.handleDragEnd(e, e.detail)}
                @drop = ${(e) => this.handleDrop(e, leaderId)}
                @dragover = ${this.handleDragOver}
            />`
    }

    getMainPanel() {
        const leaderIds = Object.keys(this.getPlayers());
        return html`
            <div class="main" @dragover = ${this.handleDragOver}>
                ${repeat(leaderIds, (leaderId) => leaderId, (leaderId) => this.getPlayerPanel(leaderId))}
                ${this.getEmptyPanel()}
            </div>`
    }

    getSidePanel() {
        const ids = this.getIdles();
        return html`
            <div class="side" @dragover = ${this.handleDragOver}>
                ${repeat(ids, (id) => id, (id) => this.getIdlePanel(id))} 
            </div>`
    }

    static styles = [sharedStyles, styles];

    render() {
        if (this.isInitialized()) {
            return [this.getMainPanel(), this.getSidePanel()];
        }
    }

}

customElements.define("players-panel", PlayersPanel);