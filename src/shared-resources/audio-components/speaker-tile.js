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
                ${this.getName(this.getMainSpeakerId())} 
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
