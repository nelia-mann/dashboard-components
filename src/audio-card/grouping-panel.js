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

    static properties = {
        ...super.properties,
        players: { state: true },
        selectedIndex: { state: true },
    }

    constructor() {
        super();
        this.players = [];
        this._ghost = null;
        this.selectedIndex = null;
        this._suppressDrag = false;
    }

/********************************************** lifecycle *************************************************************/

    getTriggers() {
        return ["players", "selectedIndex"];
    }

    onFirstUpdate() {
        this.initializeSelectedIndex();
    }

    setInitialValues() {
        this.initializePlayers();
    }

    initializePlayers() {
        const newPlayers = [];
        this.getSpeakerIds().forEach((speakerId) => {
            if (this.isAlone(speakerId)) {
                newPlayers.push([speakerId]);
            } else {
                const group = this.getGroup(speakerId);
                if (group[0] === speakerId) {
                    newPlayers.push(group);
                }
            }
        });
        this.setPlayers(newPlayers);
    }

    initializeSelectedIndex() {
        let bestIndex = 0;
        this.getPlayers().forEach((player, index) => {
            const oldLength = this.getPlayer(bestIndex).length;
            const newLength = player.length;
            (newLength > oldLength) && (bestIndex = index);
        })
        this.setSelectedIndex(bestIndex);
    }



/********************************************** getter & setter logic *************************************************/

    getSelectedIndex() {
        return this.selectedIndex;
    }

    setSelectedIndex(index) {
        this.selectedIndex = index;
        const leaderId = this.getLeaderFromIndex(index);
        this.dispatchEvent(new CustomEvent('select', { detail: leaderId }));
    }

    isSelected(index) {
        return index === this.getSelectedIndex();
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
        return [...this.players];
    }

    setPlayers(newPlayers) {
        this.players = newPlayers;
    }

    getPlayer(index) {
        return [...this.getPlayers()[index]];
    }

    getPlayerIndex(playerId) {
        const result = [];
        const players = this.getPlayers();
        players.forEach((player, index) => {
            if (player.includes(playerId)) { 
                result.push(index);
            };
        })
        return result[0];
    }

    checkGroup(group1, group2) {
        return group1.length === group2.length && group1.every(value => group2.includes(value));
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

    getLeaderFromIndex(index) {
        return this.getPlayer(index)[0];
    }

/********************************************** player manipulation logic *********************************************/

    removeFromPlayer(speakerId) {
        const playerIndex = this.getPlayerIndex(speakerId);
        const player = this.getPlayer(playerIndex);  
        const newSpeakers = player.filter((id) => (id !== speakerId));  
        const newPlayers = this.getPlayers(); 
        if (newSpeakers.length > 0) {
            newPlayers[playerIndex] = newSpeakers;
        } else {
            newPlayers.splice(playerIndex, 1);
        }
        this.setPlayers(newPlayers);
        if (newSpeakers.length > 0) return newSpeakers[0];
    }

    addToPlayer(speakerId, targetIndex) {
        const playerList = this.getPlayer(targetIndex);
        playerList.push(speakerId);
        const newPlayers = this.getPlayers();
        newPlayers[targetIndex] = playerList;
        this.setPlayers(newPlayers);
        this.setSelectedIndex(targetIndex);
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

/********************************************** interactive logic *****************************************************/

    handleSelect(e, targetIndex) {
        this.setSelectedIndex(targetIndex);
    }

    handlePointerDown(e, details) {
        if (!this.getSuppressState()) {
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

    handlePointerUp(e, prevIndex) {
        if (!this.getSuppressState()) {
            const speakerId = this.getDraggedId();
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
            this.manipulateSpeaker(speakerId, prevIndex, targetIndex);                     
        }
    }

    manipulateSpeaker(speakerId, prevIndex, targetIndex) {
        if (prevIndex === targetIndex) return;
        if (targetIndex !== null) {
            this.transferSpeaker(speakerId, targetIndex);
        } else if (this.getPlayer(prevIndex).length > 1) {
            this.removeSpeaker(speakerId);
        }
    }

    async transferSpeaker(speakerId, targetIndex) {
        const oldTargetId = this.removeFromPlayer(speakerId);
        const newTargetId = this.getLeaderFromIndex(targetIndex);
        this.addToPlayer(speakerId, targetIndex);
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


    playerTile(player) {
        if (player.length > 0) {
            const index = this.getPlayerIndex(player[0]);
            const speakerIds = this.getPlayer(index);
            return html`
                <speaker-group-panel
                    class = "outlined"
                    data-group-index=${index}
                    .changedEntityIds = ${this.getCEIs()}
                    .states = ${this.getStates()}
                    .entityIds = ${new Set(speakerIds)}
                    .selected = ${this.isSelected(index)}
                    @forceup = ${(e) => this.raiseSuppress()}
                    @forcedown = ${(e) => this.lowerSuppress()}
                    @speaker-drag-start = ${(e) => this.handlePointerDown(e, e.detail)}
                    @pointerup = ${(e) => this.handlePointerUp(e, index)}
                    @pointermove = ${this.handlePointerMove}
                    @click = ${(e) => this.handleSelect(e, index)}
                    .callService = ${this.callService}
                />`    
        }    
    }


    render() {
        if (this.isInitialized()) {
            const players = this.getPlayers();
            return html`
            ${repeat(players, (player) => player[0], player => this.playerTile(player))}`
        }
    }

/********************************************** style logic ***********************************************************/

    static styles = [sharedStyles, css`
        
        :host {
        }
    
        
    `]

}

customElements.define("grouping-panel", GroupingPanel);