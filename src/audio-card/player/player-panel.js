import { html } from 'lit';
import { repeat } from 'lit-html/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { HaSubComponent } from '../../shared-resources/base-classes/ha-subcomponent';
import styles from './player.styles.js';
import sharedStyles from '../../shared-resources/styles/shared-styles.js';
import '../speaker/speaker-panel.js';

export class PlayerPanel extends HaSubComponent {

    static properties = {
        ...super.properties,
        speakers: { state: true }
    }

    constructor() {
        super();
        this.speakers = {};
    }

/********************************* lifecycle ******************************************************/

    getTriggers() {
        return ["speakers"]
    }

    /***************************** getter and setter ***********************************************/

    getSpeakers() {
        return this.speakers;
    }

    /*********************************** interactive logic *****************************************/

    handlePointerDown(e, id) {
        e.currentTarget.setPointerCapture(e.pointerId);
        this.createGhost(e, id);
        this.moveGhost(e.clientX, e.clientY);
    }

    handlePointerMove(e) {
        this.moveGhost(e.clientX, e.clientY);
    }

    handlePointerUp(e, id) {
        this.removeGhost();
        this.dispatchEvent(new CustomEvent('end', { 
            detail: {
                speakerId: id, 
                x: e.clientX, 
                y: e.clientY 
            }
        }));
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

    /************************************ html and style *********************************************/

    static styles = [sharedStyles, styles];

    getSpeakerTile(id) {
        return html`<speaker-tile
                .name = ${this.getName(id)}
                @pointerdown = ${(e) => this.handlePointerDown(e, id)}
                @pointerup = ${(e) => this.handlePointerUp(e, id)}
                @pointermove = ${this.handlePointerMove}
            />`;
    }

    getSpeakerPanel() {
        return html`${repeat(this.getSpeakers(), (speakerId) => speakerId, speakerId => this.getSpeakerTile(speakerId))}`
    }

    render() {
        if (this.isInitialized()) {
            const sp1 = this.getSpeakers()[0];
            const state1 = this.getState(sp1);
            console.log(state1.attributes);
            return this.getSpeakerPanel();
        }
    }
}

customElements.define("player-panel", PlayerPanel);