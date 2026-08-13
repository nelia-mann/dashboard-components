import { css, html } from 'lit';
import { repeat } from 'lit-html/directives/repeat.js';
import { HaAudioComponent } from '../shared-resources/base-classes/ha-audio-component.js';
import sharedStyles from '../shared-resources/styles/shared-styles.js';
import '../shared-resources/audio-components/speaker-tile.js';
import '../shared-resources/audio-components/group-panel.js';


/*
At this level, the entityIds are still all of the speaker IDs.  
Ghost and suppressDrag are local objects associated with the drag-and-drop
of speakers into groups.  

Players is an array of arrays, representing the speaker groupings.  Every speaker
is in exactly one player.  The inner array (the "player") is accessed by
and index, mainly so that the listings don't reorganize when things are
joined and removed.  

*/

export class GroupingPanel extends HaAudioComponent {

    _ghost;
    _suppressDrag;
    _draggedSpeakerId;
    _pointerDownTime;

    static properties = {
        ...super.properties,
        players: { state: true },
        selectedPlayer: { state: true },
    }

    constructor() {
        super();
        this.players = {};
        this._ghost = null;
        this.selectedPlayer = null;
        this._suppressDrag = false;
    }

/********************************************** lifecycle *************************************************************/

    getTriggers() {
        return ["players", "selectedPlayer"];
    }

    onFirstUpdate() {
        this.initializeSelectedPlayer();
    }

    setInitialValues() {
        this.initializePlayers();
    }

    initializePlayers() {
        const newPlayers = {};
        this.getSpeakerIds().forEach((speakerId) => {
            if (this.isLeader(speakerId)) {
                newPlayers[speakerId] = this.getGroup(speakerId);
            }
        });
        this.setPlayers(newPlayers);
    }

    initializeSelectedPlayer() {
        const idsAndLengths = Object.keys(this.getPlayers()).map((playerId) => {
            const playerSize = this.getPlayer(playerId).length;
            return [playerId, playerSize];
        })
        idsAndLengths.sort((a, b) => b[1] - a[1])
        this.setSelectedPlayer(idsAndLengths[0][0]);
    }



/********************************************** getter & setter logic *************************************************/

    getSelectedPlayer() {
        return this.selectedPlayer;
    }

    setSelectedPlayer(playerId) {
        this.selectedPlayer = playerId;
        this.dispatchEvent(new CustomEvent('select', { detail: playerId }));
    }

    isSelected(playerId) {
        return playerId === this.getSelectedPlayer();
    }

    getSuppressState() {
        return this._suppressDrag;
    }

    raiseSuppress() {
        this._suppressDrag = true;
    }

    lowerSuppress() {
        this._suppressDrag = false;
    }

    getDraggedId() {
        return this._draggedSpeakerId
    }

    setDraggedId(speakerId) {
        this._draggedSpeakerId = speakerId;
    }

    getPlayers() {
        return {...this.players};
    }

    setPlayers(newPlayers) {
        this.players = newPlayers;
    }

    getPlayer(playerId) {
        if (this.getPlayers()[playerId]) {
            return [...this.getPlayers()[playerId]];
        }
    }

    checkGroup(group1, group2) {
        return group1.length === group2.length && group1.every(value => group2.includes(value));
    }

    isUnjoined(speakerId, targetId) {
        const intendedGroup = this.getPlayer(targetId);
        if (!intendedGroup) return this.isAlone(speakerId);
        const isRemoved = intendedGroup.every((speakerId) => {
            const result = this.checkGroup(intendedGroup, this.getGroup(speakerId));
            return result;
        })
        return (isRemoved && this.isAlone(speakerId));
    }

    isJoined(speakerId, targetId) {
        const intendedGroup = this.getPlayer(targetId);
        return intendedGroup.every((speakerId) => {
            const result = this.checkGroup(intendedGroup, this.getGroup(speakerId));
            return result;
        })
    }

    getLeader(speakerId) {
        const group = this.getGroup(speakerId);
        return group[0];
    }

    isLeader(speakerId) {
        return speakerId === this.getLeader(speakerId);
    }

/********************************************** player manipulation logic *********************************************/

    removeFromPlayer(speakerId) {
        const playerId = this.getLeader(speakerId);
        const player = this.getPlayer(playerId);  
        const newSpeakers = player.filter((id) => (id !== speakerId));  
        const newPlayers = this.getPlayers(); 
        if (newSpeakers.length > 0) {
            newPlayers[playerId] = newSpeakers;
        } else {
            delete newPlayers[playerId]
        }
        this.setPlayers(newPlayers);
        return playerId;
    }

    addToPlayer(speakerId, targetId) {
        const playerList = this.getPlayer(targetId);
        playerList.push(speakerId);
        const newPlayers = this.getPlayers();
        newPlayers[targetId] = playerList;
        this.setPlayers(newPlayers);
        this.setSelectedPlayer(targetId);
    }

/********************************************** speaker manipulation logic ********************************************/

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
        if (targetId && speakerId) {
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

    async joinSpeaker(speakerId, leaderId) {
        if (speakerId && leaderId) {
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
    }

/********************************************** interactive logic *****************************************************/

    handleSelect(e, targetId) {
        this.setSelectedPlayer(targetId);
    }

    handlePointerDown(e, details) {
        if (!this.getSuppressState()) {
            this._pointerDownTime = Date.now();
            e.currentTarget.setPointerCapture(e.pointerId);
            this.createGhost(details);
            this.setDraggedId(details.speakerId)
            this.moveGhost(details.clientX, details.clientY);
        }
    }

    handlePointerMove(e) {
        if (!this.getSuppressState()) {
            this.moveGhost(e.clientX, e.clientY);            
        }
    }

    handlePointerUp(e, prevId) {
        if (!this.getSuppressState()) {
            const elapsed = Date.now() - this._pointerDownTime;
            if (elapsed < 300) {
                this.handleSelect(prevId)
            } else {
                const speakerId = this.getDraggedId();
                this.removeGhost();
                let elementUnder;
                if (e.clientX && e.clientY) { 
                    elementUnder = this.renderRoot.elementFromPoint(e.clientX, e.clientY);
                } else {
                    elementUnder = this.renderRoot.elementFromPoint(e.detail.x, e.detail.y);
                }
                const playerBoxes = this.renderRoot.querySelectorAll('[data-group-player');
                const playerBox = Array.from(playerBoxes).find(box => box.contains(elementUnder));
                let targetId = null;
                if (playerBox) {
                    targetId = playerBox.dataset.groupPlayer;
                }
                this.manipulateSpeaker(speakerId, prevId, targetId);   
            }                  
        }
    }

    manipulateSpeaker(speakerId, prevId, targetId) {
        if (prevId === targetId) return;
        if (targetId !== null) {
            this.transferSpeaker(speakerId, targetId);
        } else if (this.getPlayer(prevId).length > 1) {
            this.removeSpeaker(speakerId);
        }
    }

    async transferSpeaker(speakerId, newTargetId) {
        const oldTargetId = this.removeFromPlayer(speakerId);
        this.addToPlayer(speakerId, newTargetId);
        await this.unJoinSpeaker(speakerId, oldTargetId);
        await this.joinSpeaker(speakerId, newTargetId);        
    }

    async removeSpeaker(speakerId) {
        const targetId = this.removeFromPlayer(speakerId);
        await this.unJoinSpeaker(speakerId, targetId);
    }

/********************************************* ghost manipulation logic ***********************************************/

    createGhost(details) {
        this._ghost = document.createElement('speaker-tile');
        this._ghost.entityIds = new Set([details.speakerId]);
        this._ghost.states = this.getStates();
        Object.assign(this._ghost.style, {
            position: 'fixed',
            pointerEvents: 'none',
            opacity: '0.7',
            zIndex: '1000',
            width: details.width + 'px',
            height: details.height + 'px',
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

/********************************************** html logic ************************************************************/


    _debugLog(msg) {
        this._debugMessages = [...(this._debugMsgs || []), msg]
    }

    playerTile(playerId) {
        const player = this.getPlayer(playerId);
        if (player.length > 0) {
            return html`
                <speaker-group-panel
                    class = "outlined"
                    data-group-player=${playerId}
                    .changedEntityIds = ${this.getCEIs()}
                    .states = ${this.getStates()}
                    .entityIds = ${new Set(player)}
                    .selected = ${this.isSelected(playerId)}
                    @forceup = ${(e) => this.raiseSuppress()}
                    @forcedown = ${(e) => this.lowerSuppress()}
                    @speaker-drag-start = ${(e) => this.handlePointerDown(e, e.detail)}
                    @pointerup = ${(e) => this.handlePointerUp(e, playerId)}
                    @pointermove = ${this.handlePointerMove}
                    .callService = ${this.callService}
                />`    
        }    
    }


    render() {
        if (this.isInitialized()) {
            const playerIds = Object.keys(this.getPlayers());
            return html`
                                        <div>
                    ${(this._debugMessages || []).map(m => html`<div>${m}</div>`)}
                </div>
            ${repeat(playerIds, (playerId) => playerId, playerId => this.playerTile(playerId))}`
        }
    }

/********************************************** style logic ***********************************************************/

    static styles = [sharedStyles, css`
        
        :host {
            touch-action:none;
        }
    
        
    `]

}

customElements.define("grouping-panel", GroupingPanel);