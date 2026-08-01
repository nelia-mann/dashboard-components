import { html, css } from 'lit';
import { HaClimateComponent } from '../base-classes/ha-climate-component.js';
import { climateGradientUp } from './util/climate-util.js';
import sharedStyles from '../styles/shared-styles.js';
import '../general-components/slider/slider.js';

export class OffsetSlider extends HaClimateComponent {

    static properties = {
        ...super.properties,
        currentValue: { state: true }
    }

    constructor() {
        super();
        this.currentValue = 0;
    }

    /********************************************** lifecycle ***********************************************************/

    getTriggers() {
        return ["currentValue"];
    }

    onFirstUpdate() {
        this.setCurrentValue(this.getOffset());
    }

    /********************************************** getter & setter logic ***********************************************/

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
        return this.fixed;
    }

    waitCondition(entityId, value) {
        const state = this.getState(entityId);
        const target = state.state;
        return (target - .5 < value) && (value < target + .5);
    }

    /********************************************** interactive logic ***************************************************/

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

    /********************************************** html logic **********************************************************/

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
                .wait = ${this.waitCondition}
            ></slider-bar>`
    }

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

/********************************************** style logic *************************************************************/

    static styles = [sharedStyles, css`

    :host {
        width: var(--offset-slider-width, 210px);
        height: var(--offset-slider-height, 210px);
        padding-left: var(--offset-slider-padding-left, 0px);
        padding-right: var(--offset-slider-padding-right, 0px);
        padding-bottom: var(--offset-slider-padding-bottom, 0px);
        --slider-justify-content: flex-start;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;

        --slider-orientation: column nowrap;
        --slider-width: var(--slider-width-for-offset, 15px);

    }

    .value {
        height: var(--offset-slider-value-height, 50px);
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: flex-start;
        font-weight: var(--offset-slider-value-font-weight);
        font-size: var(--offset-slider-value-font-size);
    }

    .bar {
        height: var(--offset-slider-bar-height, 100%);
    }

`];

}

customElements.define("offset-slider", OffsetSlider);
