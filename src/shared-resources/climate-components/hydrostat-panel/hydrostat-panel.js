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

    getTargetValue() {
        if (this.getMode() === 'on') return this.getTarget();
    }

    getLowColor() {
        if (this.getMode() === 'on') return FAN;
    }

    getActionColor() {
        if (this.getAction() === 'Venting') return FAN;
    }

    /******************************** interactive logic ************************************/

    wait(entityId, value) {
        return this.getState(entityId).attributes.humidity = Math.round(value);
    }

    handleCallService(e) {
        const value = Math.round(e.detail);
        const entityId = this.getEntityId('hygrostat');
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

    adjustButtons() {
        if (this.isSafe()) return null;
        if (this.getMode() !== 'on') return null;
        return html`<div class="button-row"> 
                        <adjust-buttons @change=${(e) => this.change(e)}>
                    </adjust-buttons> </div>`
    }

    render() {
        if (this.isInitialized()) {
            return html`
                <double-circular-slider
                    .changedEntityIds = ${this.getCEIs()}
                    .states = ${this.getStates()}
                    .entityIds = ${this.getEntityIds()}
                    .min = ${this.getMinExtreme()}
                    .max = ${this.getMaxExtreme()}
                    .sensor = ${this.getSensor()}
                    .units = ${this.getSensorUnits()}
                    .icon = ${fan}
                    .lowColor = ${this.getLowColor()}
                    .targetValue = ${this.getTargetValue()}
                    .action = ${this.getAction()}
                    .actionColor = ${this.getActionColor()}
                    .fixed=${this.isSafe()}
                    .wait=${this.wait}
                    @change=${this.handleCallService}
                >
                </double-circular-slider>
                ${this.adjustButtons()}
            `
        }
    }

    static styles = [sharedStyles, styles];
}

customElements.define("hydrostat-panel", HydrostatPanel);