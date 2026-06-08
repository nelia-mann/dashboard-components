import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { HaClimateComponent } from '../../base-classes/ha-climate-component.js';
import { getModeStyles } from '../util/climate-util.js';
import styles from './button.styles.js';
import sharedStyles from '../../styles/shared-styles.js';

export class ClimateButton extends HaClimateComponent {

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
        return getModeStyles(this.getHPMode(), this.getHPAction(), this.selected())
    }

    render() {
        if (this.isInitialized()) {
            return html`
                <div
                    class="button outlined"
                    @click=${this.onClick}
                    style=${styleMap(this.getStyles())}
                >
                    <div class="small-heading"> ${this.getTitle()} </div>
                    <div class="sub-info"> ${this.getHPSensorDisplay() + " \u00B7 " + this.getHPAction()} </div >
                </div>`
        }
    }
}

customElements.define("climate-button", ClimateButton);