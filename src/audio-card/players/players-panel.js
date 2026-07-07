import { html } from 'lit';
import { repeat } from 'lit-html/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { HaSubComponent } from '../../shared-resources/base-classes/ha-subcomponent';
import { OFF, rgba } from './../../shared-resources/util/color-util.js';
import { plus } from '../../shared-resources/util/mdi-util.js';
import styles from './players.styles.js';
import sharedStyles from '../../shared-resources/styles/shared-styles.js';
import '../speaker/speaker-panel.js';
import '../player/player-panel.js';

export class PlayersPanel extends HaSubComponent {

    _ghost;

    static properties = {
        ...super.properties,
        players: { state: true },
        idles: { state: true }
    }

    constructor() {
        super();
        this.players = [];
        this.idles = [];
        this._ghost = null;
    }

    /********************************** lifecycle  ************************************/

    getTriggers() {
        return ["players", "idles"];
    }

    setInitialValues() {
        const ids = [...this.getStructure().sorted];
        const newPlayers = [];
        const newIdles = [];
        ids.forEach((id) => {
            if (this.isInactive(id)) {
                newIdles.push(id);
            } else {
                const group = this.getGroup(id);
                if (group[0] === id) {
                    newPlayers.push(group);
                } else if (group.length === 0) {
                    newPlayers.push([id]);
                }
            }   
        })
        this.players = newPlayers;
        this.idles = newIdles;
    }

    /************************************ speaker logic **********************************/

    getGroup(speakerId) {
        return this.getState(speakerId).attributes.group_members;
    }

    isAlone(speakerId) {
        return this.getGroup(speakerId).length === 0;
    }

    isUnjoined(speakerId, targetId) {
        const index = this.getPlayerIndex(targetId);
        const intendedGroup = this.getPlayer(index);
        const isRemoved = intendedGroup.every((speakerId) => {
            const result = this.checkGroup(intendedGroup, this.getGroup(speakerId));
            return result;
        })
        return (isRemoved && this.isAlone(speakerId));
    }

    isJoined(speakerId, targetId) {
        const index = this.getPlayerIndex(targetId);
        const intendedGroup = this.getPlayer(index);
        return intendedGroup.every((speakerId) => {
            const result = this.checkGroup(intendedGroup, this.getGroup(speakerId));
            return result;
        })
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
        return (this.isAlone(id)) && ((this.getStateState(id) === 'idle') || (this.getStateState(id) === 'off'))
    }

    checkGroup(group1, group2) {
        return group1.length === group2.length && group1.every(value => group2.includes(value));
    }

    /******************************** player/idle logic ***********************************/

    getPlayers() {
        return [...this.players];
    }

    getPlayer(index) {
        return [...this.getPlayers()[index]];
    }

    getPlayerIndex(speakerId) {
        let foundIndex;
        this.getPlayers().forEach((player, index) => {
            if (player.includes(speakerId)) {
                foundIndex = index;
            }
        })
        return foundIndex;
    }

    getLeaderFromIndex(index) {
        return this.getPlayer(index)[0];
    }

    getIdles() {
        return [...this.idles];
    }

    createPlayer(speakerId) {
        const newPlayers = [...this.players];
        newPlayers.push([speakerId]);
        this.players = newPlayers;
        this.removeIdle(speakerId);
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

    addToPlayer(speakerId, index) {
        const playerList = this.getPlayer(index);
        playerList.push(speakerId);
        const newPlayers = this.getPlayers();
        newPlayers[index] = playerList;
        this.players = newPlayers;
    }

    removeFromPlayer(speakerId) {
        const index = this.getPlayerIndex(speakerId);
        const newSpeakers = this.getPlayer(index).filter((id) => (id !== speakerId));
        const newPlayers = this.getPlayers();
        if (newSpeakers.length > 0) {
            newPlayers[index] = newSpeakers;
        } else {
            newPlayers.splice(index, 1);
        }
        this.players = newPlayers;
        if (newSpeakers.length > 0) return newSpeakers[0]; 
    } 

    /************************************* interactive logic *************************************************/

    async joinSpeaker(speakerId, leaderId) {
        this.raiseChangeFlag();
        const data = {
            entity_id: leaderId,
            group_members: [speakerId]
        }
        this.callService('media_player', 'join', data);
        await this.waitForEntity(speakerId, (speakerId) => this.isJoined(speakerId, leaderId));
        this.lowerChangeFlag();
        console.log("done joining");
    }

    async addSpeaker(speakerId, index) {
        this.addToPlayer(speakerId, index);
        this.removeIdle(speakerId);
        const targetLeaderId = this.getLeaderFromIndex(index);
        await this.joinSpeaker(speakerId, targetLeaderId);
    }

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

    async unJoinSpeaker(speakerId, targetId) {
        if (targetId) {
            this.raiseChangeFlag();
            if (this.isLeader(speakerId)) {
                this.unJoinLeader(speakerId);
            } else {
                this.unJoinFollower(speakerId);
            }
            await this.waitForEntity(speakerId, (speakerId) => this.isUnjoined(speakerId, targetId));
            this.lowerChangeFlag();
            console.log("done unjoining");
        }        
    }

    stopSpeaker(speakerId) {
        const data = { entity_id: speakerId }
        this.callService('media_player', 'media_stop', data);
    }

    async removeSpeaker(speakerId) {
        const targetId = this.removeFromPlayer(speakerId);
        this.addIdle(speakerId);
        await this.unJoinSpeaker(speakerId, targetId);
    }

    async transferSpeaker(speakerId, index) {
        if (this.getPlayer(index).includes(speakerId)) return;
        const oldTargetId = this.removeFromPlayer(speakerId);
        const newTargetId = this.getLeaderFromIndex(index);
        this.addToPlayer(speakerId, index);
        await this.unJoinSpeaker(speakerId, oldTargetId);
        await this.joinSpeaker(speakerId, newTargetId);
    }

    async transferToEmpty(speakerId) {
        const targetId = this.removeFromPlayer(speakerId);
        this.createPlayer(speakerId);
        await this.unJoinSpeaker(speakerId, targetId);
    }

    manipulateSpeaker(speakerId, prevIndex, targetIndex) {
        if (prevIndex === targetIndex) return;
        if (targetIndex !== null) {
            if (targetIndex < this.getPlayers().length) {
                if (prevIndex !== null) {
                    console.log("transfering");
                    this.transferSpeaker(speakerId, targetIndex);
                } else {
                    console.log("adding", targetIndex);
                    this.addSpeaker(speakerId, targetIndex);
                }
            } else {
                if (prevIndex !== null) {
                    console.log("transfering to empty")
                    this.transferToEmpty(speakerId);
                } else {
                    console.log("creating");
                    this.createPlayer(speakerId);
                }
            }
        } else {
            console.log("removing");
            this.removeSpeaker(speakerId);
        }
    }

    handlePointerDown(e, id) {
        e.currentTarget.setPointerCapture(e.pointerId);
        this.createGhost(e, id);
        this.moveGhost(e.clientX, e.clientY)
    }

    handlePointerMove(e) {
        this.moveGhost(e.clientX, e.clientY);
    }

    handlePointerUp(e, id, prevIndex) {
        this.removeGhost();
        let elementUnder;
        if (e.clientX && e.clientY) { 
            elementUnder = this.renderRoot.elementFromPoint(e.clientX, e.clientY);
        } else {
            elementUnder = this.renderRoot.elementFromPoint(e.detail.x, e.detail.y);
        }
        const playerBoxes = this.renderRoot.querySelectorAll('[data-group-index');
        const playerBox = Array.from(playerBoxes).find(box => box.contains(elementUnder));
        let targetIndex = null;
        if (playerBox) {
            targetIndex = parseInt(playerBox.dataset.groupIndex);
        }
        this.manipulateSpeaker(id, prevIndex, targetIndex);
    }

    createGhost(e, id) {
        const rect = e.currentTarget.getBoundingClientRect();
        this._ghost = document.createElement('speaker-tile');
        this._ghost.name = this.getName(id);
        Object.assign(this._ghost.style, {
            position: 'fixed',
            pointerEvents: 'none',
            opacity: '0.7',
            zIndex: '1000',
            width: rect.width + 'px',
            height: rect.height + 'px',
        });
        document.body.appendChild(this._ghost);
    }

    moveGhost(x, y) {
        if (!this._ghost) return;
        Object.assign(this._ghost.style, {
            left: x + 'px',
            top: y + 'px',
            transform: 'translate(-50%, -50%)',
        })
    }

    removeGhost() {
        this._ghost?.remove();
        this._ghost = null;
    }


    /************************************* html/style logic *************************************************/

    getIdleStyles() {
        let styles = {};
        styles['background-color'] = rgba(OFF, 0.5);
        return styles;
    }

    getPlusStyles() {
        let styles = {};
        styles['color'] = rgba(OFF, 0.5);
        return styles;
    }

    getIdlePanel(id) {
        return html`<speaker-tile
                        class = "outlined"
                        style=${styleMap(this.getIdleStyles())}
                        .name = ${this.getName(id)} 
                        @pointerdown = ${(e) => this.handlePointerDown(e, id)}
                        @pointerup = ${(e) => this.handlePointerUp(e, id, null)}
                        @pointermove = ${this.handlePointerMove}
                    />`
    }

    getEmptyPanel() {
        if (this.getIdles().length > 0) {
            const index = this.getPlayers().length;
            return html`<div data-group-index=${index} class="empty outlined">
                    <div class="circle outlined">
                        <ha-svg-icon .path=${plus} class = "plus" style = ${styleMap(this.getPlusStyles())}/>
                    </div>
                </div>`
        }
    }

    getPlayerPanel(index) {
        return html`<player-panel
                data-group-index=${index}
                class="outlined"
                .changedEntityIds = ${this.getCEIs()}
                .entityIds= ${new Set(this.getPlayer(index))}
                .speakers = ${this.getPlayer(index)}
                .states = ${this.getStates()}
                .callService = ${this.callService}
                @end = ${(e) => this.handlePointerUp(e, e.detail.speakerId, index)}
            />`
    }

    getMainPanel() {
        const indices = Array.from({ length: this.getPlayers().length }, (_, i) => i)
        return html`
            <div class="main" @dragover = ${this.handleDragOver}>
                ${repeat(indices, (index) => index, (index) => this.getPlayerPanel(index))}
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