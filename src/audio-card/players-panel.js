import { css, html } from 'lit';
import { repeat } from 'lit-html/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { HaAudioComponent } from '../shared-resources/base-classes/ha-audio-component';
import { OFF, rgba } from '../shared-resources/util/color-util.js';
import { plus } from '../shared-resources/util/mdi-util.js';
import sharedStyles from '../shared-resources/styles/shared-styles.js';
import '../shared-resources/audio-components/speaker-tile.js';
import '../shared-resources/audio-components/player-panel.js';
import './grouping-panel.js';

/*
At this level the entity Ids are all of the speakers in the house.  the internal
object "player" is an entityId associated with the lead speaker for the selected
player.  But it's set inside grouping-panel.  

*/

export class PlayersPanel extends HaAudioComponent {

    static properties = {
        ...super.properties,
        player: { state: true }
    }

    constructor() {
        super();
        this.player = null;
    }

/********************************************** lifecycle *************************************************************/

    getTriggers() {
        return ["player"];
    }

/********************************************** getter & setter logic *************************************************/

    setPlayer(leaderId) {
        this.player = leaderId;
    }

    getPlayer() {
        return this.player;
    }

    // returns a set of entityIds associated with the selected player.
    getPlayerGroupIds() {
        if (!this.getPlayer()) return [];
        const group = this.getGroup(this.getPlayer());
        (group.length === 0) && (group.push(this.getPlayer()));
        return new Set(group);
    }

/********************************************** interactive logic *****************************************************/

    // sets the player through interaction from grouping-panel
    handleSelect(e) {
        this.setPlayer(e.detail);
    }

/********************************************** html logic ************************************************************/

    getMainPanel() {
        if (this.getPlayerGroupIds().size > 0) {
            return html`<player-panel
                    class="outlined"
                    .changedEntityIds = ${this.getCEIs()}
                    .entityIds= ${this.getPlayerGroupIds()}
                    .states = ${this.getStates()}
                    .callService = ${this.callService}
                />`    
        }    
    }

    getSidePanel() {
        return html`
            <grouping-panel
                .changedEntityIds = ${this.getCEIs()}
                .entityIds = ${this.getEntityIds()}
                .states = ${this.getStates()}
                @select = ${this.handleSelect}
                .callService = ${this.callService}
            />
        `
    }

    render() {
        if (this.isInitialized()) {
            return [this.getMainPanel(), this.getSidePanel()];
        }
    }

/********************************************** style logic ***********************************************************/

    static styles = [sharedStyles, css`

    :host {
        height: 100%;
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        touch-action: none;
    }

`];

}

customElements.define("players-panel", PlayersPanel);
