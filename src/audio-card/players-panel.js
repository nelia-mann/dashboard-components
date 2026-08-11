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

    setPlayer(leaderId) {
        this.player = leaderId;
    }

    getPlayer() {
        return this.player;
    }

    getPlayerGroup() {
        if (!this.getPlayer()) return [];
        const group = this.getGroup(this.getPlayer());
        (group.length === 0) && (group.push(this.getPlayer()));
        return group;
    }

/********************************************** interactive logic *****************************************************/

    handleSelect(e) {
        this.setPlayer(e.detail);
    }

/********************************************** html logic ************************************************************/

    getMainPanel() {
        if (this.getPlayerGroup().length > 0) {
            return html`<player-panel
                    data-group-index=${0}
                    class="outlined"
                    .changedEntityIds = ${this.getCEIs()}
                    .entityIds= ${new Set(this.getPlayerGroup())}
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

    .main {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-around;
        align-items: flex-start;
        height: 100%;
        width: var(--main-player-panel-width, 75%);        
    }

    .side {
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: center;
        height: 100%;
        width: var(--side-player-panel-width, 25%);
        touch-action: none;
    }

    .empty {
        height: var(--player-panel-height, 300px);
        width: var(--player-panel-width, 200px);
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
    }

    .circle {
        height: calc(var(--player-panel-height) / 2);
        width: calc(var(--player-panel-height) / 2);
        border-radius: 50%;
    }

    .plus {
        height: 100%;
        width: 100%;
        ---mdc-icon-size: 400%;
    }

`];

}

customElements.define("players-panel", PlayersPanel);
