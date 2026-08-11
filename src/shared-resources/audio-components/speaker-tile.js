import { css, html } from 'lit';
import { HaAudioComponent } from '../base-classes/ha-audio-component.js';
import sharedStyles from '../styles/shared-styles.js';
import './volume-slider.js';

export class SpeakerTile extends HaAudioComponent {

/********************************************** getter & setter logic *************************************************/

    hasVolume() {
        return !!this.getAttribute(this.getMainSpeakerId(), "media_title");
    }

/********************************************** interactive logic *****************************************************/

    handlePointerDown() {
        this.dispatchEvent(new CustomEvent('forceup'));
    }

    handlePointerUp() {
        this.dispatchEvent(new CustomEvent('forcedown'));
    }

/********************************************** html logic ************************************************************/

    getVolumeSlider() {
        if (this.hasVolume()) {
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
                ${this.name} 
                ${this.getVolumeSlider()}
            `
        }
    }

/********************************************** style logic ***********************************************************/

    static styles = [sharedStyles, css`

    :host {
        width: var(--speaker-panel-width);
        margin-top: var(--speaker-panel-margin-top);
        padding: var(--speaker-panel-padding, 5px);
        font-size: var(--speaker-panel-font-size, 100%);
        font-weight: var(--speaker-panel-font-weight, 400);
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
    }

`];

}

customElements.define("speaker-tile", SpeakerTile);
