import { html } from 'lit';
import { HaSubComponent } from '../../base-classes/ha-subcomponent.js';
import { plus, minus } from '../../util/mdi-util.js';
import styles from './adjust.styles.js';
import sharedStyles from '../../styles/shared-styles.js';

export class AdjustButtons extends HaSubComponent {

    static styles = [sharedStyles, styles];

    onAdd() {
        this.dispatchEvent(new CustomEvent('change', { detail: 'increment'}))
    }

    onSubtract() {
        this.dispatchEvent(new CustomEvent('change', { detail: 'decrement'}))
    }

    render() {
        if (this.isInitialized()) {
            return html`
                <div class="circle outlined" @click=${this.onSubtract}>
                    <ha-svg-icon .path=${minus}}></ha-svg-icon>
                </div>
                <div class="circle outlined" @click=${this.onAdd}>
                    <ha-svg-icon .path=${plus}}></ha-svg-icon>
                </div>
            `
        }
    }
}

customElements.define("adjust-buttons", AdjustButtons);