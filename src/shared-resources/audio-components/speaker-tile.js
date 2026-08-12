import { css, html } from 'lit';
import { HaAudioComponent } from '../base-classes/ha-audio-component.js';
import sharedStyles from '../styles/shared-styles.js';
import './volume-slider.js';

export class SpeakerTile extends HaAudioComponent {

    static properties = {
        ...super.properties,
        selected: { state: true }
    }


/********************************************** lifecycle *************************************************************/

    getTriggers() {
        return ['selected'];
    }

/********************************************** getter & setter logic *************************************************/

    displayVolume() {
        return this.hasVolume() && this.selected;
    }

/********************************************** interactive logic *****************************************************/

    handlePointerDown() {
        this.dispatchEvent(new CustomEvent('forceup', { bubbles: true, composed: true }));
    }

    handlePointerUp() {
        this.dispatchEvent(new CustomEvent('forcedown', { bubbles: true, composed: true }));
    }

/********************************************** html logic ************************************************************/

    getVolumeSlider() {
        if (this.displayVolume()) {
            return html`
                <volume-slider
                    @pointerdown = ${this.handlePointerDown}
                    @pointerup = ${this.handlePointerUp}
                    .changedEntityIds = ${this.getCEIs()}
                    .entityIds = ${this.getEntityIds()}
                    .states = ${this.getStates()}
                    .callService = ${this.callService}
                />`
        }
    }

    render() {
        if (this.isInitialized()) {
            return html`
                <div class = "tile outlined">
                    ${this.getName(this.getMainSpeakerId())} 
                    ${this.getVolumeSlider()}
                </div>
            `
        }
    }

/********************************************** style logic ***********************************************************/

    static styles = [sharedStyles, css`

    :host {
        width: var(--speaker-tile-width);
        margin-top: var(--speaker-tile-margin-top);
        font-size: var(--speaker-tile-font-size, 100%);
        font-weight: var(--speaker-tile-font-weight, 400);
        touch-action: none;
    }

    .tile {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        padding: var(--speaker-tile-padding, 5px);
        width: 100%;
        height: 100%;
    }


`];

}

customElements.define("speaker-tile", SpeakerTile);
