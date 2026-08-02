import { html, css } from 'lit';
import { HaSubComponent } from '../base-classes/ha-subcomponent.js';
import { plus, minus } from '../util/mdi-util.js';
import sharedStyles from '../styles/shared-styles.js';

export class AdjustButtons extends HaSubComponent {

/********************************************** interactive logic *****************************************************/

    onAdd() {
        this.dispatchEvent(new CustomEvent('change', { detail: 1}))
    }

    onSubtract() {
        this.dispatchEvent(new CustomEvent('change', { detail: -1}))
    }

/********************************************** html logic ************************************************************/

    render() {
        if (this.isInitialized()) {
            return html`
                <div class="circle outlined" @click=${this.onSubtract}>
                    <ha-svg-icon .path=${minus}}/>
                </div>
                <div class="circle outlined" @click=${this.onAdd}>
                    <ha-svg-icon .path=${plus}}/>
                </div>
            `
        }
    }

/****************************************** style logic ***************************************************************/
    
    static styles = [sharedStyles, css`
       
        :host {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: center;
            width: var(--adjust-pair-width, 95px);
            margin-top: var(--adjust-pair-margin-top, -15px);
        }

        .circle {
            border-radius: 50%;
            height: var(--plus-minus-circle-size, 40px);
            width: var(--plus-minus-circle-size, 40px);
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
        }

        ha-svg-icon {
            padding: 0%;
            margin: 0%;
            --mdc-icon-size: var(--plus-minus-sizes, 60%);
        }
        
    `]

}

customElements.define("adjust-buttons", AdjustButtons);