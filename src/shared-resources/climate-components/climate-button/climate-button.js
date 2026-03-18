import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { HaSubComponent } from '../../base-classes/ha-subcomponent.js';
import { getAction, getTemp, getMode, getModeStyles } from '../util/climate-util.js';
import styles from './button.styles.js';
import sharedStyles from '../../styles/shared-styles.js';

export class ClimateButton extends HaSubComponent {

    static properties = {
        ...super.properties,
        isSelected: { state: true },
    }

    constructor() {
        super();
        this.isSelected = false;
        this.title = '';
    }

    /************* lifecycle ***********************************************/

    getTriggers() {
        return ["isSelected"];
    }

    /************************* getter and setter logic ***********************/

    selected() {
        return this.isSelected;
    }

    getTitle() {
        return this.title;
    }

    /**************************** interactive logic **************************/

    onClick() {
        this.dispatchEvent(new CustomEvent('select'))
    }

    /********************************html/style logic ***************************/

    static styles = [sharedStyles, styles];

    getStyles() {
        const structure = this.getStructure();
        const states = this.getStates();
        const mode = getMode(structure, states)
        return getModeStyles(structure, states, mode, this.selected())
    }

    render() {
        if (this.isInitialized()) {
            const temp = getTemp(this.getStructure(), this.getStates());
            const action = getAction(this.getStructure(), this.getStates());
            return html`
                <div
                    class="button outlined"
                    @click=${this.onClick}
                    style=${styleMap(this.getStyles())}
                >
                    <div class="small-heading"> ${this.getTitle()} </div>
                    <div class="sub-info"> ${temp + " \u00B7 " + action} </div >
                </div>`
        }
    }
}

customElements.define("climate-button", ClimateButton);