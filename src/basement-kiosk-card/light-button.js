import { html, LitElement } from 'lit';
import styles from './main.styles.js';
import sharedStyles from './shared-styles.js';
import { interpolateRGB, OFF, ONLIGHT, rgba } from './color-util.js';

export class LightingButton extends LitElement {

    _structure = {};
    _entityIds = [];
    _initialized = false;

    static get properties() {
        return {
            _states: { state: true },
            _changedEntityIds: { state: true },
            _isSelected: { state: true}
        }
    }

    /************* lifecycle ***********************************************/

    // when first constructed
    constructor() {
        super();
    }

    // each time an update occurs resulting in rerendering
    update(changedProps) {
        super.update(changedProps);
    }

    // determines if an update should occur
    shouldUpdate(changedProps) {
        return (!this._initialized || this.hasRelevantChanges() || changedProps.has("_isSelected"))
    }

    // runs after the first update
    firstUpdated() {
        this._initialized = true;
    }

    // runs after every update
    updated() {
    }

    // helper to determine if should update
    hasRelevantChanges() {
        return this._entityIds.some(entityId => this._changedEntityIds.has(entityId));
    }

    /*************************************************************************/

    isSolo(lightId) {
        return !(this._states[lightId].attributes.entity_id);
    }

    getLightData() {
        let on = 0;
        let tot = 0;
        this._entityIds.forEach((lightId) => {
            if (this.isSolo(lightId)) {
                tot = tot + 1;
                const state = this._states[lightId].state;
                (state === "on") && (on = on + 1);
            }
        })
        return [on, tot];
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
        if (this._isSelected) {
            styles['outline'] = `solid ${this.getRGB(1)}`;
            styles['outline-offset'] = '-4px';
        }
        return styles;
    }

    onClick() {
        this._isSelected = true;
        this.dispatchEvent(new CustomEvent('select'))
    }

    static styles = [styles, sharedStyles];

    render() {
        if (this._initialized) {
            return html`
                <div
                    class="button outlined"
                    @click=${() => this.onClick()}
                    style=${styleMap(this.getStyles())}
                >
                    <div class="small-heading"> Lighting </div>
                    <div class="sub-info"> sub-info </div>
                </div>`
        }
    }
}

customElements.define("lighting-button", LightingButton);