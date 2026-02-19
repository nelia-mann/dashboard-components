import { html, LitElement } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import styles from './wheel.styles.js';
import sharedStyles from '../../styles/shared-styles.js';
import { hsGradient } from '../util/color-util.js';



export class ColorWheel extends LitElement {

    _box;
    _isDown = false;

    static get properties() {
        return {
            _lightState: { state: true },
            _changedEntityIds: { state: true },
            _hue: { state: true },
            _saturation: { state: true },
            _initialized: { state: true }
        }
    }

    constructor() {
        super();
        this._lightState = {};
        this._changedEntityIds = new Set();
        this._initialized = false;
    }

    /****************************** lifecycle **************************************/

    update(changedProps) {
        super.update(changedProps);
    }

    shouldUpdate(changedProps) {
        return (!this.isInitialized()
            || this.hasRelevantChanges()
            || changedProps.has("_hue")
            || changedProps.has("_saturation")
            || changedProps.has("_initialized"))
    }

    firstUpdated() {
        this.setBox(this.renderRoot.querySelector('.wheel-background'));
        this.setInitialValues();
        this.initialize();
    }

    updated() {
        (this.hasRelevantChanges() && !this.isDown()) && (this.setInitialValues());
    }

    hasRelevantChanges() {
        return this.getCEIs().has(this.getEntityId());
    }

    setInitialValues() {
        const hs_values = this.getHSColor();
        if (hs_values) {
            this.setHue(hs_values[0]);
            this.setSat(hs_values[1]);
        }
        else {
            this.setHue(0);
            this.setSat(0);
        }
    }

    /****************************** getter and setter logic *******************/

    getHue() {
        return this._hue;
    }

    getSat() {
        return this._saturation;
    }

    setHue(hue) {
        this._hue = hue;
    }

    setSat(saturation) {
        this._saturation = saturation;
    }

    isDown() {
        return this._isDown;
    }

    setIsDown(boolean) {
        this._isDown = boolean;
    }

    isInitialized() {
        return this._initialized;
    }

    initialize() {
        this._initialized = true;
    }

    // access reference object
    getRect() {
        return this._box.getBoundingClientRect();
    }

    setBox(box) {
        this._box = box;
    }

    getEntityId() {
        return this._lightState.entity_id;
    }

    getHSColor() {
        return this._lightState.attributes.hs_color;
    }

    // access reference object
    getCEIs() {
        return this._changedEntityIds;
    }

    /**************************** interactive logic **************************/

    down(e) {
        this.setIsDown(true);
        this.move(e);
    }

    up() {
        this.setIsDown(false);
        this.handleCallService();
    }

    move(e) {
        if (this.isDown()) {
            const rect = this.getRect();
            const scale = rect.width;
            let x = (100 * (e.clientX - rect.left) / scale) - 50;
            let y = 50 - (100 * (e.clientY - rect.top) / scale);
            let saturation = 2 * Math.sqrt(x ** 2 + y ** 2)
            let hue = 360 * Math.atan2(x, y) / (2 * Math.PI);
            (hue < 0) && (hue = 360 + hue);
            if (saturation < 100) {
                this.setHue(hue);
                this.setSat(saturation);
            } else {
                this.up();
            }
        }
    }

    handleCallService() {
        const entityId = this.getEntityId();
        const data = {
            entity_id: entityId,
            'hs_color': [this.getHue(), this.getSat()]
        }
        this.callService('light', 'turn_on', data)
    }

    /**************************** style/html logic ***************************/

    getXY() {
        const angle = this._hue * 2 * Math.PI / 360;
        const relX = this.getSat() * Math.sin(angle) / 2;
        const relY = this.getSat() * Math.cos(angle) / 2;
        const X = 50 + relX;
        const Y = 50 - relY;
        return [X, Y]
    }

    // logic could be improved to derive "lightness"
    // -- actually, maybe better to change how the color gradient works!
    getColor() {
        return `hsl(${this.getHue()}, ${this.getSat()}%, ${100 - this.getSat() / 2}%)`
    }

    getBGStyle() {
        let styles = {};
        styles['background'] = hsGradient(20);
        return styles;
    }

    getDotStyle() {
        let styles = {};
        const XY = this.getXY();
        styles['top'] = `${XY[1]}%`;
        styles['left'] = `${XY[0]}%`;
        styles['background'] = this.getColor();
        return styles;
    }

    getDot() {
        if (this.isInitialized()) {
            return html`<div class="dot outlined" style="${styleMap(this.getDotStyle())}"></div>`
        }
    }

    static styles = [sharedStyles, styles];

    render() {
        const XY = this.getXY();
        return html`
            <div class="wheel">
                <div class="wheel-background outlined"
                    style="${styleMap(this.getBGStyle())}"
                    @pointerdown=${this.down}
                    @pointerup=${this.up}
                    @pointermove=${this.move}
                >
                    ${this.getDot()}
                </div>
            </div>
        `
    }

}

customElements.define("color-wheel", ColorWheel);