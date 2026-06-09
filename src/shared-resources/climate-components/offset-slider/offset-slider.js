import { html } from 'lit';
import { HaClimateComponent } from '../../base-classes/ha-climate-component.js';
import { climateGradientUp } from '../util/climate-util.js';
import styles from './offset-slider.styles.js';
import sharedStyles from '../../styles/shared-styles.js';
import '../../general-components/slider/slider.js';

export class OffsetSlider extends HaClimateComponent {

    static properties = {
        ...super.properties,
        currentValue: { state: true }
    }

    constructor() {
        super();
        this.currentValue = 0;
    }

    /*********************************** lifecycle **********************************/

    getTriggers() {
        return ["currentValue"];
    }

    onFirstUpdate() {
        this.setCurrentValue(this.getOffset());
    }

    /************************ getter and setter logic *************************/

    getRegionName() {
        return this.regionName;
    }

    setCurrentValue(newValue) {
        this.currentValue = newValue;
    }

    getCurrentValue() {
        return this.currentValue;
    }

    displayValue() {
        let value = this.getCurrentValue();
        if (value > 0) {
            value = '+' + String(value);
        }
        return value + this.getSensorUnits();
    }

    isSafe() {
        return this.getMode() === 'safe_min';
    }

    fixSlider() {
        if (![this.getRegionName(), 'on'].includes(this.getTie()) || this.getMode() === 'off' || this.isSafe()) {
            return true;
        } else return false;
    }

    /************************ interactive logic *******************************/

    handleCallService(e) {
        const value = e.detail;
        const entityId = this.getOffsetId();
        let data = { entity_id: entityId, value: value }
        this.callService('input_number', 'set_value', data)
    }

    handleSetValue(e) {
        const value = e.detail;
        this.setCurrentValue(value);
    }

    /**************************** style/html logic ******************************/

    offsetBar() {
        return html`
            <slider-bar
                .changedEntityIds = ${this.getCEIs()}
                .state=${this.getStates()[this.getOffsetId()]}
                .max=${this.getMaxOffset()}
                .min=${this.getMinOffset()}
                .startValue=${this.getOffset()}
                .units=${this.getSensorUnits()}
                .background=${climateGradientUp()}
                .step=${this.getSeparation()}
                .skipScale=${true}
                .fixed=${this.fixSlider()}
                @change=${this.handleCallService}
                @slide=${this.handleSetValue}
            ></slider-bar>`
    }

    static styles = [sharedStyles, styles];

    render() {
        if (this.isInitialized()) {
            return html`
                <div class="value">
                    <div> Offset: </div>
                    <div> ${this.displayValue()} </div>
                </div>
                <div class="bar">
                    ${this.offsetBar()}
                </div>
            `
        }
    }

}

customElements.define("offset-slider", OffsetSlider);