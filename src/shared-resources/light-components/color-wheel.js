import { html, css } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { HaLightingComponent } from '../base-classes/ha-lighting-component.js';
import sharedStyles from '../styles/shared-styles.js';

export class ColorWheel extends HaLightingComponent {

    _box;

    static properties = {
        ...super.properties,
        _hue: { state: true },
        _saturation: { state: true }
    }

/********************************************** lifecycle *************************************************************/

    getTriggers() {
        return ["_hue", "_saturation"];
    }

    onFirstUpdate() {
        this.setBox(this.renderRoot.querySelector('.wheel-background'));
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

/********************************************** getter & setter logic *************************************************/

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

    getRect() {
        return this._box.getBoundingClientRect();
    }

    setBox(box) {
        this._box = box;
    }

    getThisColor() {
        return `hsl(${this.getHue()}, 100%, ${100 - this.getSat() / 2}%)`
    }

/********************************************** geometry logic ********************************************************/

    getXY() {
        const angle = this._hue * 2 * Math.PI / 360;
        const relX = this.getSat() * Math.sin(angle) / 2;
        const relY = this.getSat() * Math.cos(angle) / 2;
        const X = 50 + relX;
        const Y = 50 - relY;
        return [X, Y]
    }

/********************************************** interactive logic *****************************************************/

    waitCondition(entityId) {
        const hsColor = this.getHSColor(entityId);
        const firstCondition = ((hsColor[0] - .5 < this.getHue()) && (this.getHue() < hsColor[0] + .5));
        const secondCondition = ((hsColor[1] - .5 < this.getSat()) && (this.getSat() < hsColor[1] + .5));
        return firstCondition && secondCondition;
    }

    down(e) {
        this.raiseChangeFlag();
        this.move(e);
    }

    async up() {
        this.handleCallService();
        await this.waitForEntity(this.getMainId(), this.waitCondition)
        this.lowerChangeFlag();
    }

    move(e) {
        if (this.getChangeFlag() && !this.isFixed()) {
            const rect = this.getRect();
            const scale = rect.width;
            const x = (100 * (e.clientX - rect.left) / scale) - 50;
            const y = 50 - (100 * (e.clientY - rect.top) / scale);
            const saturation = 2 * Math.sqrt(x ** 2 + y ** 2)
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

/********************************************** html logic ************************************************************/

    getDot() {
        if (this.isInitialized()) {
            return html`<div class="dot outlined" style="${styleMap(this.getDotStyle())}"/>`
        }
    }

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

/********************************************** style logic ***********************************************************/

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

    static styles = [sharedStyles, css`

        :host {
            position: relative;
            width: var(--wheel-width, 210px);
            height: var(--wheel-width, 210px);
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .wheel-background {
            position: absolute;
            height: 100%;
            width: 100%;
            top: 0;
            left: 0;
            border-radius: 50%;
            touch-action: none;
        }

        .dot {
            position: absolute;
            width: var(--dot-width, 20px);
            height: var(--dot-width, 20px);
            margin-left: calc(-1 * var(--dot-width, 20px) / 2);
            margin-top: calc(-1 * var(--dot-width, 20px) / 2);
            border-radius: 50%;
        }

    `];

}

customElements.define("color-wheel", ColorWheel);
