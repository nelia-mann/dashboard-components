import { html, LitElement } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { interpolateRGB, OFF, ONLIGHT, rgba } from './../../util/color-util.js';
import { isOn } from './../../util/state-util.js';
import { isIntersection } from '../../util/logic-util.js';
import styles from './button.styles.js';
import sharedStyles from '../../styles/shared-styles.js';

export class LightingButton extends LitElement {

    lightIds = new Set();
    title;
    _total;

    static get properties() {
        return {
            changedEntityIds: { state: true },
            states: { state: true},
            isSelected: { state: true },
            _initialized: { state: true}
        }
    }

    constructor() {
        super();
        this.changedEntityIds = new Set();
        this.states = {};
        this.isSelected = false;
        this._initialized = false;
    }

    /************* lifecycle ***********************************************/

    // each time an update occurs resulting in rerendering
    update(changedProps) {
        super.update(changedProps);
    }

    // determines if an update should occur
    shouldUpdate(changedProps) {
        return (!this.isInitialized()
            || this.hasRelevantChanges()
            || changedProps.has("isSelected")
            || changedProps.has("_initialized"))
    }

    // runs after the first update
    firstUpdated() {
        this.setTotal();
        this.initialize();
    }

    // helper to determine if should update
    hasRelevantChanges() {
        return isIntersection(this.getCEIs(), this.getLightIds());
    }

    /************************* getter and setter logic ***********************/

    isInitialized() {
        return this._initialized;
    }

    initialize() {
        this._initialized = true;
    }

    selected() {
        return this.isSelected;
    }

    getCEIs() {
        return this.changedEntityIds;
    }

    getLightIds() {
        return this.lightIds;
    }

    isLightOn(lightId) {
        return isOn(this.states[lightId]);
    }

    getTitle() {
        return this.title;
    }

    setTotal() {
        this._total = this.getLightIds().size;
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
        this.getLightIds().forEach((lightId) => {
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