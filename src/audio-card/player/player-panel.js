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

    getTriggers() {
        return ["speakers"]
    }

    getSpeakers() {
        return this.speakers;
    }

    getName(id) {
        return this.getStates()[id].attributes.friendly_name;
    }

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

    static styles = [sharedStyles, styles];

    getSpeaker(id) {
        return html`<speaker-tile
                .name = ${this.getName(id)}
                @pointerdown = ${(e) => this.handlePointerDown(e, id)}
                @pointerup = ${(e) => this.handlePointerUp(e, id)}
                @pointermove = ${this.handlePointerMove}
            />`;
    }

    getSpeakerPanel() {
        return html`${repeat(this.getSpeakers(), (speakerId) => speakerId, speakerId => this.getSpeaker(speakerId))}`
    }

    render() {
        if (this.isInitialized()) {
            return this.getSpeakerPanel();
        }
    }
}

customElements.define("player-panel", PlayerPanel);