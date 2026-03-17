import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { HaSubComponent } from '../../base-classes/ha-subcomponent.js';
import { OFF, COOL, HOT, climateGradient, rgba } from './../../util/color-util.js';
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

    getTemp() {
        const entityId = this.getStructure().temp;
        const state = this.getStates()[entityId];
        const value = state.state;
        const unit = state.attributes.unit_of_measurement;
        return value + " " + unit;
    }

    getMode() {
        const modeId = this.getStructure().mode;
        return this.getStates()[modeId].state;
    }

    getAction() {
        const hpId = this.getStructure().heatpump;
        const hpState = this.getStates()[hpId].state;
        let action = "off";
        switch (hpState) {
            case 'heat':
                action = "heating";
                break;
            case 'cool':
                action = "cooling";
                break;
            case 'off':
                if (this.getMode() !== "off") {
                    action = "idle";
                } else { action = "off" };
                break;
        }
        return action;
    }

    /**************************** interactive logic **************************/

    onClick() {
        this.dispatchEvent(new CustomEvent('select'))
    }

    /********************************html/style logic ***************************/

    getStyles() {
        let styles = {};
        switch (this.getMode()) {
            case 'off':
                styles['background-color'] = rgba(OFF, 0.5);
                if (this.selected()) {
                    styles['outline'] = `solid ${rgba(OFF, 1.0)}`;
                    styles['outline-offset'] = '-3px';
                }
                break;
            case 'heat':
                styles['background-color'] = rgba(HOT, 0.5);
                if (this.selected()) {
                    styles['outline'] = `solid ${rgba(HOT, 1.0)}`;
                    styles['outline-offset'] = '-3px';
                }
                break;
            case 'cool':
                styles['background-color'] = rgba(COOL, 0.5);
                if (this.selected()) {
                    styles['outline'] = `solid ${rgba(COOL, 1.0)}`;
                    styles['outline-offset'] = '-3px';
                }
                break;
            case 'heat-cool':
                styles['background'] = climateGradient();
                if (this.selected()) {
                    switch (this.getAction()) {
                        case 'heating':
                            styles['outline'] = `solid ${rgba(HOT, 1.0)}`;
                            break;
                        case 'cooling':
                            styles['outline'] = `solid ${rgba(COOL, 1.0)}`;
                            break;
                        case 'idle':
                            styles['outline'] = `solid ${rgba(OFF, 1.0)}`;
                            break;
                    }
                    styles['outline-offset'] = '-3px';
                }
        }
        return styles;
    }

    static styles = [sharedStyles, styles];

    render() {
        if (this.isInitialized()) {
            return html`
                <div
                    class="button outlined"
                    @click=${this.onClick}
                    style=${styleMap(this.getStyles())}
                >
                    <div class="small-heading"> ${this.getTitle()} </div>
                    <div class="sub-info"> ${this.getTemp() + " \u00B7 " + this.getAction()} </div >
                </div>`
        }
    }
}

customElements.define("climate-button", ClimateButton);