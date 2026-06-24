import { html } from 'lit';
import { HaSubComponent } from '../../shared-resources/base-classes/ha-subcomponent.js';
import styles from './speaker.styles.js';
import sharedStyles from '../../shared-resources/styles/shared-styles.js';

export class SpeakerTile extends HaSubComponent {

    static styles = [sharedStyles, styles];

    render() {
        if (this.isInitialized()) {
            return html`<div class="tile outlined"> ${this.name} </div>`
        }
    }
}

customElements.define("speaker-tile", SpeakerTile);