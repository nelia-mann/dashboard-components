import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { HaSubComponent } from '../../base-classes/ha-subcomponent.js';
import { OFF, rgba, rgbp } from '../../util/color-util.js';
import styles from './slider.styles.js';
import sharedStyles from '../../styles/shared-styles.js';

export class DoubleCircularSlider extends HaSubComponent {

    _OFFSETANGLE = 40;
    _THICKNESS = .075;
    _IRIS = .75;
    _TEMPDOT = 0.025;

    static properties = {
        ...super.properties,
        _targetValue: { state: true },
        fixed: { state: true }
    }

    constructor() {
        super();
        this.structure = {};
        this._whichValue = 'none';
        this._targetValue = 50;
        this._flag = false;
        this.fixed = true;
    }

    /************************** lifecycle *****************************/

    update(changedProps) {
        (!this.getChangeFlag()) && (this.setInitialValue());
        super.update(changedProps);
    }

    getTriggers() {
        return ["_targetValue", "fixed"];
    }

    updated() {
        (this.getWhichValue() == 'none') && (this.lowerChangeFlag());
    }

    onFirstUpdate() {
        this.setInitialValue();
    }

    setInitialValue() {
        if (this.getMinStateValue()) {
            this.setTargetValue(this.getMinStateValue());
        } else if (this.getMaxStateValue()) {
            this.setTargetValue(this.getMaxStateValue());
        } else this.setTargetValue(this.getTargetStateValue());
    }

    /****************************** getter and setter logic *************************/

    getTempDotSize() {
        return this._TEMPDOT;
    }

    getIris() {
        return this._IRIS;
    }

    getTolerance() {
        return 2 * this._THICKNESS;
    }

    getThickness() {
        return this._THICKNESS;
    }

    getOffset() {
        return this._OFFSETANGLE;
    }

    clearWhichValue() {
        this._whichValue = 'none';
    }

    getWhichValue() {
        return this._whichValue;
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

    getMinExtreme() {
        return this.structure.minExtreme;
    }

    getMaxExtreme() {
        return this.structure.maxExtreme;
    }

    getMinStateValue() {
        return this.structure.minValue;
    }

    getMaxStateValue() {
        return this.structure.maxValue;
    }

    getTargetStateValue() {
        return this.structure.targetValue;
    }

    getMinColor() {
        return this.structure.minColor;
    }

    getMaxColor() {
        return this.structure.maxColor;
    }

    getValue() {
        return this.structure.value;
    }

    getSeparation() {
        return this.structure.separation;
    }

    getColorMode() {
        const colorMode = this.structure.colorMode;
        if (colorMode === 'min') return this.getMinColor();
        if (colorMode === 'max') return this.getMaxColor();
    }

    getUnits() {
        let units = '';
        (this.structure.units) && (units = this.structure.units);
        return units;
    }

    getUpper() {
        let upper = '';
        (this.structure.upper) && (upper = this.structure.upper);
        return upper;
    }

    setTargetValue(value) {
        if (value < this.getMinExtreme()) {
            this._targetValue = this.getMinExtreme();
        } else if (this.getMaxExtreme() < value) {
            this._targetValue = this.getMaxExtreme();
        } else {
            this._targetValue = value;
        }
    }

    getPointer() {
        return this._targetValue;
    }

    isFixed() {
        return this.fixed;
    }

    getMinOff() {
        if (this.getTargetStateValue()) {
            return null;
        } else if (this.getMinStateValue()) {
            return this.getPointer();
        } else return this.getMinExtreme();
    }

    getMaxOff() {
        if (this.getTargetStateValue()) {
            return null;
        } else if (this.getMaxStateValue()) {
            return this.getPointer();
        } else return this.getMaxExtreme();
    }

    getHeatTarget() {
        if (this.getMaxStateValue()) {
            return null;
        } else return this.getPointer();
    }

    getCoolTarget() {
        if (this.getMinStateValue()) {
            return null;
        } else return this.getPointer();
    }

    /******************************* geometric logic *******************************/

    getAngle(value) {
        const range = this.getMaxExtreme() - this.getMinExtreme();
        const angleRange = 360 - (2 * this.getOffset());
        const scale = angleRange / range;
        return (this.getOffset() + scale * (value - this.getMinExtreme())) * Math.PI / 180;
    }

    getNewValue(angle) {
        const range = this.getMaxExtreme() - this.getMinExtreme();
        const angleRange = 360 - (2 * this.getOffset());
        const scale = range / angleRange;
        const angleDegrees = 180 * angle / Math.PI;
        return (this.getMinExtreme() + scale * (angleDegrees - this.getOffset()))
    }

    arcD(th1, th2) {
        const radius = 1 - this.getThickness();
        let toggle = 0;
        (th2 - th1 > Math.PI) && (toggle = 1);
        const x1 = -radius * Math.sin(th1) + 1;
        const y1 = radius * Math.cos(th1) + 1;
        const x2 = -radius * Math.sin(th2) + 1;
        const y2 = radius * Math.cos(th2) + 1;
        return `M ${x1} ${y1} A ${radius} ${radius} 0 ${toggle} 1 ${x2} ${y2}`
    }

    getCoords(value) {
        const radius = 1 - this.getThickness();
        const angle = this.getAngle(value);
        const x = -radius * Math.sin(angle) + 1;
        const y = radius * Math.cos(angle) + 1;
        return [x, y]
    }

    getDistance(e, value) {
        const mouseCoords = this.getMouseCoords(e);
        const coords = this.getCoords(value);
        return Math.sqrt((coords[0] - mouseCoords[0]) ** 2 + (coords[1] - mouseCoords[1]) ** 2);
    }

    isNearPointer(e) {
        return (this.getDistance(e, this.getPointer()) < this.getTolerance())
    }

    getMouseCoords(e) {
        const svg = this.renderRoot.querySelector('svg');
        const pt = svg.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        const svgPoint = pt.matrixTransform(svg.getScreenCTM().inverse());
        return [svgPoint.x, svgPoint.y]
    }

    setWhichValue(e) {
        if (!this.isNearPointer(e)) {
            this._whichValue = 'none';
        } else if (this.getMinStateValue()) {
            this._whichValue = 'min';
        } else if (this.getMaxStateValue()) {
            this._whichValue = 'max';
        } else {
            this._whichValue = 'target';
        }
    }

    /****************************** interactive logic *******************************/


    down(e) {
        this.setWhichValue(e);
        if (this.getWhichValue() !== 'none' && !this.isFixed()) {
            this.raiseChangeFlag();
            this.move(e);
        }
    }

    up(e) {
        if (!this.isFixed()) {
            this.handleMessage();
            this.clearWhichValue();
        }
    }

    shouldUp(newValue) {
        return (newValue < this.getMinExtreme() || this.getMaxExtreme() < newValue); 
    }

    move(e) {
        const which = this.getWhichValue();
        if (which !== 'none' && !this.isFixed()) {
            const mouseCoords = this.getMouseCoords(e);
            const xFromCenter = mouseCoords[0] - 1;
            const yFromCenter = mouseCoords[1] - 1;
            let angle = Math.atan2(-xFromCenter, yFromCenter) % (2 * Math.PI);
            (angle < 0) && (angle = angle + 2 * Math.PI);
            const newValue = this.getNewValue(angle);
            this.setTargetValue(newValue);
            (this.shouldUp(newValue)) && (this.up(e));
        }
    }

    handleMessage() {
        if (this.getWhichValue() == 'none') return;
        this.dispatchEvent(new CustomEvent('change', { detail: [this.getWhichValue(), this.getPointer()] }));
    }

    /******************************* text logic ************************************/

    getIcon() {
        let icon = html``;
        if (this.structure.icon) {
            icon = html`<ha-svg-icon .path="${this.structure.icon}" style=${styleMap(this.getTextStyles())}></ha-svg-icon>`
        }
        return icon;
    }

    getRange() {
        let result = html``;
        let target = this.getPointer();
        (typeof target === 'number') && (target = target.toFixed(0));
        const units = this.getUnits();
        if (typeof target === 'string') {
            result = html`<var class="one">${target}</var><sup class="one">${units}</sup>`
        } else {
            result = html`<var class="one"> OFF </var>`
        }
        return result;
    }

    getLowerText() {
        const units = this.getUnits();
        const value = this.getValue().toFixed(1);
        return html`<div class="lower" style=${styleMap(this.getTextStyles())}> ${this.getIcon()}  ${value} ${units}</div>`
    }

    getUpperText() {
        let upper = this.getUpper();
        (upper === 'Off') && (upper = html`&thinsp;`);
        return html`<div class="upper" style=${styleMap(this.getTextStyles())}>${upper}</div>`;
    }

    /**************************** style/html logic ***************************/

    arc(startValue, stopValue, stroke) {
        if (typeof startValue != 'number' || typeof stopValue != 'number' || stopValue < startValue) return null;
        const startAngle = this.getAngle(startValue);
        const stopAngle = this.getAngle(stopValue);
        const ns = "http://www.w3.org/2000/svg";
        const path = document.createElementNS(ns, "path");
        path.setAttribute("d", this.arcD(startAngle, stopAngle));
        path.setAttribute("stroke", stroke);
        path.setAttribute("stroke-width", 2 * this.getThickness())
        path.setAttribute("class", "arc");
        return path;
    }

    dot(skip, value, r, fill) {
        if (typeof value != 'number' || skip) return null;
        const ns = "http://www.w3.org/2000/svg";
        const dot1 = document.createElementNS(ns, "circle");
        const coords = this.getCoords(value);
        dot1.setAttribute("cx", coords[0]);
        dot1.setAttribute("cy", coords[1]);
        dot1.setAttribute("r", r);
        dot1.setAttribute("fill", fill);
        return dot1;
    }

    getBGStyles() {
        let styles = {};
        const color = this.getColorMode();
        if (color) {
            styles['background'] = `radial-gradient(circle at center, ${rgba(color, .2)} 0, ${rgba(color, 0)} 60%)`;
        }
        return styles;
    }

    getTextStyles() {
        let styles = {};
        if (this.getColorMode()) {
            styles['color'] = rgba(this.getColorMode(), 1);
        }
        return styles;
    }

    getTempColor() {
        let color = rgba(OFF, 1);
        (this.getValue() < this.getPointer() && !this.getMaxStateValue()) && (color = rgbp(this.getMinColor(), .5));
        (this.getValue() > this.getPointer() && !this.getMinStateValue()) && (color = rgbp(this.getMaxColor(), .5));
        return color;
    }

    static styles = [sharedStyles, styles];

    render() {
        if (this.isInitialized()) {
            return html`
                <div class="info" style=${styleMap(this.getBGStyles())}>
                    ${this.getUpperText()}
                    <div class="center">${this.getRange()}</div>
                    ${this.getLowerText()}
                </div>
                <svg
                    viewBox="0 0 2 2"
                    @pointerdown=${this.down}
                    @pointerup=${this.up}
                    @pointermove=${this.move}
                >
                    ${this.arc(this.getMinOff(), this.getMaxOff(), rgba(OFF, .25))}
                    ${this.arc(this.getMinExtreme(), this.getHeatTarget(), rgba(this.getMinColor(), .5))}
                    ${this.arc(this.getValue(), this.getHeatTarget(), rgba(this.getMinColor(), 1))}
                    ${this.dot(false, this.getHeatTarget(), this.getThickness(), rgba(this.getMinColor(), 1))}
                    ${this.arc(this.getCoolTarget(), this.getMaxExtreme(), rgba(this.getMaxColor(), .5))}
                    ${this.arc(this.getCoolTarget(), this.getValue(), rgba(this.getMaxColor(), 1))}
                    ${this.dot(false, this.getCoolTarget(), this.getThickness(), rgba(this.getMaxColor(), 1))}
                    ${this.dot(this.isFixed(), this.getPointer(), this.getIris() * this.getThickness(), "white")}
                    ${this.dot(false, this.getValue(), this.getTempDotSize(), this.getTempColor())}
                </svg>
            `
        }
    }

}

customElements.define("double-circular-slider", DoubleCircularSlider);