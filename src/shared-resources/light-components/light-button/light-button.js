import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { interpolateRGB, OFF, ONLIGHT, rgba } from './../../util/color-util.js';
import { isOn } from './../../util/state-util.js';
import { HaSubComponent } from '../../base-classes/ha-subcomponent.js';
import styles from './button.styles.js';
import sharedStyles from '../../styles/shared-styles.js';

export class LightingButton extends HaSubComponent {

    static properties = {
        ...super.properties,
        isSelected: { state: true },
    }

    constructor() {
        super();
        this.isSelected = false;
        this.title = '';
        this._total = 0;
    }

    /************* lifecycle ***********************************************/

    updateTrigger(changedProps) {
        return changedProps.has('isSelected');
    }

    onFirstUpdate() {
        this.setTotal();
    }

    /************************* getter and setter logic ***********************/

    selected() {
        return this.isSelected;
    }

    isLightOn(lightId) {
        return isOn(this.states[lightId]);
    }

    getTitle() {
        return this.title;
    }

    setTotal() {
        this._total = this.getEntityIds().size;
    }

    getTotal() {
        return this._total;
    }

    /**************************** interactive logic **************************/

    onClick() {
        this.dispatchEvent(new CustomEvent('select'))
    }

    /********************************html/style logic ***************************/

    getLightData() {
        let on = 0;
        this.getEntityIds().forEach((lightId) => {
            (this.isLightOn(lightId)) && (on = on + 1);
        })
        return [on, this.getTotal()];
    }

    // determines the shade of color associated with a particular floor id, based on
    // the fraction of the lights that are on.
    getRGB(opacity) {
        const onTot = this.getLightData();
        const rgb = interpolateRGB(OFF, ONLIGHT, onTot[0] / onTot[1])
        return rgba(rgb, opacity);
    }

    getStyles() {
        let styles = {
            'background-color': this.getRGB(0.5)
        }
        if (this.selected()) {
            styles['outline'] = `solid ${this.getRGB(1)}`;
            styles['outline-offset'] = '-4px';
        }
        return styles;
    }

    static styles = [sharedStyles, styles];

    render() {
        if (this.isInitialized()) {
            const onTot = this.getLightData();
            return html`
                <div
                    class="button outlined"
                    @click=${this.onClick}
                    style=${styleMap(this.getStyles())}
                >
                    <div class="small-heading"> ${this.getTitle()} </div>
                    <div class="sub-info"> ${onTot[0]}/${onTot[1]} lights on </div>
                </div>`
        }
    }
}

customElements.define("lighting-button", LightingButton);