import { html } from 'lit';
import { repeat } from 'lit-html/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { HaSubComponent } from '../../shared-resources/base-classes/ha-subcomponent';
import styles from './player.styles.js';
import sharedStyles from '../../shared-resources/styles/shared-styles.js';
import '../idle/idle-panel.js';

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

    handleDragStart(e, id) {
        this.dispatchEvent(new CustomEvent('start'));
        e.dataTransfer.setData('transfer', id);
    }

    handleDragEnd(e, id) {
        this.dispatchEvent(new CustomEvent('end', { detail: id }));
    }

    static styles = [sharedStyles, styles];

    getSpeaker(id) {
        return html`<idle-panel 
                draggable="true"
                class="outlined" 
                .name = ${this.getName(id)}
                @dragstart = ${(e) => this.handleDragStart(e, id)}
                @dragend = ${(e) => this.handleDragEnd(e, id)}
            />`;
    }

    render() {
        if (this.isInitialized()) {
            return html`${repeat(this.getSpeakers(), (speakerId) => speakerId, speakerId => this.getSpeaker(speakerId))}`
        }
    }
}

customElements.define("player-panel", PlayerPanel);