import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { HaLightingComponent } from '../../base-classes/ha-lighting-component.js';
import styles from './wheel.styles.js';
import sharedStyles from '../../styles/shared-styles.js';

export class ColorWheel extends HaLightingComponent {

    _box;

    static properties = {
        ...super.properties,
        _hue: { state: true },
        _saturation: { state: true }
    }

    constructor() {
        super();
        this._isDown = false;
        this._flag = false;
    }

    /****************************** lifecycle **************************************/

    update(changedProps) {
        (!this.getChangeFlag()) && (this.setInitialValues());
        super.update(changedProps);
    }

    getTriggers() {
        return ["_hue", "_saturation"];
    }

    onFirstUpdate() {
        this.setBox(this.renderRoot.querySelector('.wheel-background'));
        this.setInitialValues();
    }

    updated() {
        (!this.isDown()) && (this.lowerChangeFlag());
    }

    hasRelevantChanges() {
        const isStateChanged = this.getCEIs().has(this.getMainId());
        const lightHSColor = this.getHSColor();
        const isUp = !this.isDown();
        const hasNewValues = (lightHSColor[0] !== this.getHue()) || (lightHSColor[1] !== this.getSat())
        return isStateChanged && isUp && hasNewValues;
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

    isFixed() {
        if (this.getLightState().state === 'off') {
            return true;
        } return false;
    }

    getHue() {
        return Math.round(this._hue);
    }

    getSat() {
        return Math.round(this._saturation);
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

    getRect() {
        return this._box.getBoundingClientRect();
    }

    setBox(box) {
        this._box = box;
    }

    getChangeFlag() {
        return this._flag;
    }

    raiseChangeFlag() {
        this._flag = true;
    }

    lowerChangeFlag() {
        this._flag = false;
    }

    /**************************** interactive logic **************************/

    down(e) {
        this.raiseChangeFlag();
        this.setIsDown(true);
        this.move(e);
    }

    up() {
        this.setIsDown(false);
        this.handleCallService();
    }

    move(e) {
        if (this.isDown() && !this.isFixed()) {
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
        if (!this.isFixed()) {
            const entityId = this.getMainId();
            const data = {
                entity_id: entityId,
                'hs_color': [this.getHue(), this.getSat()]
            }
            this.callService('light', 'turn_on', data)
        }
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

    getThisColor() {
        return `hsl(${this.getHue()}, 100%, ${100 - this.getSat() / 2}%)`
    }

    getBGStyle() {
        let styles = {};
        styles['background'] = this.hsGradient();
        return styles;
    }

    getDotStyle() {
        let styles = {};
        const XY = this.getXY();
        styles['top'] = `${XY[1]}%`;
        styles['left'] = `${XY[0]}%`;
        styles['background'] = this.getThisColor();
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
                <div class="wheel-background outlined"
                    style="${styleMap(this.getBGStyle())}"
                    @pointerdown=${this.down}
                    @pointerup=${this.up}
                    @pointermove=${this.move}
                >
                    ${this.getDot()}
                </div>
        `;
    }

}

customElements.define("color-wheel", ColorWheel);