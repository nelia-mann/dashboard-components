import { html, css } from 'lit';
import { HaClimateComponent } from '../base-classes/ha-climate-component.js';
import { climateGradientUp } from '../util/climate-util/climate-util.js';
import sharedStyles from '../styles/shared-styles.js';
import '../general-components/slider.js';

export class OffsetSlider extends HaClimateComponent {

    static properties = {
        ...super.properties,
        currentValue: { state: true }
    }

    constructor() {
        super();
        this.currentValue = 0;
    }

/********************************************** lifecycle *************************************************************/

    getTriggers() {
        return ["currentValue"];
    }

    onFirstUpdate() {
        this.setCurrentValue(this.getOffset());
    }

/********************************************** getter & setter logic *************************************************/

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

/********************************************** interactive logic *****************************************************/

    waitCondition(entityId, value) {
        const state = this.getState(entityId);
        const target = state.state;
        return (target - .5 < value) && (value < target + .5);
    }

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

/********************************************** html logic ************************************************************/

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
            />`;
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

/********************************************** style logic ***********************************************************/

    static styles = [sharedStyles, css`

        :host {
            width: var(--os-width, 75px);
            height: var(--os-height, 210px);
            padding: var(--os-padding);
            padding-top: var(--os-padding-top);
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-between;


/************************************************ slider **************************************************************/

            --slider-flex-flow: var(--oss-flex-flow);
            --slider-justify-content: var(--oss-justify-content);
            --slider-margin: var(--oss-margin);
            --slider-width: var(--oss-width);
            --slider-text-padding: var(--oss-text-padding);
            --slider-text-offset: var(--oss-text-offset);
            --slider-text-width: var(--oss-text-width);
            --slider-level-offset: var(--oss-level-offset);
            --slider-level-height: var(--oss-level-height);


        }

        .value {
            height: var(--osv-height, 50px);
            width: 100%;
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            justify-content: flex-start;
            font-weight: var(--osv-font-weight);
            font-size: var(--osv-font-size);
        }

        .bar {
            height: var(--osb-height, 100%);
        }

    `];

}

customElements.define("offset-slider", OffsetSlider);
