import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { HaClimateComponent } from '../../base-classes/ha-climate-component.js';
import { FAN } from '../../util/color-util.js';
import { fan } from '../../util/mdi-util.js';
import styles from './hydrostat.styles.js';
import sharedStyles from '../../styles/shared-styles.js';
import '../../general-components/double-circle-slider/double-circular-slider.js';
import '../../general-components/adjust-buttons/adjust-buttons.js';

export class HydrostatPanel extends HaClimateComponent {

    static properties = {
        ...super.properties,
        fixed: { state: true }
    }

    constructor() {
        super();
        this.fixed = false;
    }

    getTriggers() {
        return ['fixed'];
    }

    static styles = [sharedStyles, styles];

    getColorMode() {
        let colorMode;
        (this.getAction() === 'Venting') && (colorMode = 'max');
        return colorMode;
    }

    getSliderStructure() {
        let structure = {};
        structure.value = this.getSensor();
        structure.minExtreme = this.getMinExtreme();
        structure.maxExtreme = this.getMaxExtreme();
        structure.units = this.getSensorUnits();
        structure.upper = this.getAction();
        structure.icon = fan;
        structure.maxColor = FAN;
        structure.minColor = FAN;
        structure.colorMode = this.getColorMode();
        structure.separation = this.getSeparation();
        (this.getMode() === 'fan') && (structure.maxValue = this.getTarget());
        (this.getMode() === 'safe_max') && (structure.maxValue = this.getSafeMax());
        return structure;
    }

    isFixed() {
        return this.fixed;
    }

    /******************************** interactive logic ************************************/

    handleCallService(e) {
        const details = e.detail;
        const entityId = this.getEntityId('hygrostat');
        const value = details[1];
        const data = {
            entity_id: entityId,
            humidity: value
        }
        this.callService('humidifier', 'set_humidity', data);
    }

    change(e) {
        const change = e.detail;
        const entityId = this.getEntityId('hygrostat');
        let value = this.getTarget();
        value = value + change * this.getSeparation();  
        if ((this.getMinExtreme() < value) && (value < this.getMaxExtreme())) {
            const data = { entity_id: entityId,  humidity: value};
            this.callService('humidifier', 'set_humidity', data);
        }       
    }

    /*********************************** html/css logic *********************************************/

    adjustMax() {
        let result = html``;
        if (this.getMode() === 'fan') {
            result = html`<adjust-buttons @change=${(e) => this.change(e)}></adjust-buttons>`
        }
        return result;
    }

    adjustButtons() {
        if (this.isFixed()) return null;
        return html`<div class="button-row"> ${this.adjustMax()} </div>`
    }

    render() {
        if (this.isInitialized()) {
            return html`
                <double-circular-slider
                    .changedEntityIds = ${this.getCEIs()}
                    .states = ${this.getStates()}
                    .entityIds = ${this.getEntityIds()}
                    .structure=${this.getSliderStructure()}
                    .fixed=${this.isFixed()}
                    @change=${this.handleCallService}
                >
                </double-circular-slider>
                ${this.adjustButtons()}
            `
        }
    }
}

customElements.define("hydrostat-panel", HydrostatPanel);