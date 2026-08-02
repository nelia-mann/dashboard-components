import { css, html } from 'lit';
import { HaSubComponent } from '../base-classes/ha-subcomponent.js';
import sharedStyles from '../styles/shared-styles.js';

export class SpeakerTile extends HaSubComponent {

    /********************************************** html logic ******************************************************/

    render() {
        if (this.isInitialized()) {
            return html`<div class="tile outlined"> ${this.name} </div>`
        }
    }

    /********************************************** style logic *****************************************************/

    static styles = [sharedStyles, css`

    :host {
        width: var(--idle-panel-width);
        height: var(--idle-panel-height);
        margin-top: var(--idle-panel-margin-top);
        font-size: var(--idle-panel-font-size, 100%);
        font-weight: var(--idle-panel-font-weight, 400);
        touch-action: none;
        display: block;
    }

    .tile {
        width: 100%;
        height: 100%;
        touch-action: none;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
    }

`];

}

customElements.define("speaker-tile", SpeakerTile);
