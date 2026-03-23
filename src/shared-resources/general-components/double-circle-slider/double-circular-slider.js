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
        _minValue: { state: true },
        _maxValue: { state: true }
    }

    constructor() {
        super();
        this.structure = {};
        this._whichValue = 'none';
        this._flag = false;
    }

    /************************** lifecycle *****************************/

    update(changedProps) {
        (!this.getChangeFlag()) && (this.setInitialValues());
        super.update(changedProps);
    }

    getTriggers() {
        return ["_minValue", "_maxValue"];
    }

    updated() {
        (this.getWhichValue() == 'none') && (this.lowerChangeFlag());
    }

    onFirstUpdate() {
        this.setInitialValues();
    }

    setInitialValues() {
        this.setMinValue(this.getMinStateValue());
        this.setMaxValue(this.getMaxStateValue());
    }

    /****************************** getter and setter logic *************************/

    getTempDotSize() {
        return this._TEMPDOT;
    }

    getIris() {
        return this._IRIS;
    }

    clearWhichValue() {
        this._whichValue = 'none';
    }

    getWhichValue() {
        return this._whichValue;
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

    setMinValue(value) {
        if (value < this.getMinExtreme()) {
            this._minValue = this.getMinExtreme();
        } else if (this.getMinMax() < value) {
            this._minValue = this.getMinMax();
        } else {
            this._minValue = value;
        }
    }

    setMaxValue(value) {
        if (value < this.getMaxMin()) {
            this._maxValue = this.getMaxMin()
        } else if (this.getMaxExtreme() < value) {
            this._maxValue = this.getMaxExtreme();
        } else {
            this._maxValue = value;
        }
    }

    getMinValue() {
        if (this.getMinStateValue()) return this._minValue;
    }

    getMaxValue() {
        if (this.getMaxStateValue()) return this._maxValue;
    }

    getMinMax() {
        if (this.getMaxValue()) {
            return this.getMaxValue() - this.getSeparation();
        } else {
            return this.getMaxExtreme();
        }
    }

    getMaxMin() {
        if (this.getMinValue()) {
            return this.getMinValue() + this.getSeparation();
        } else {
            return this.getMinExtreme();
        }
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

    getIcon() {
        let icon = html``;
        if (this.structure.icon) {
            icon = html`<ha-svg-icon .path="${this.structure.icon}"></ha-svg-icon>`
        }
        return icon;
    }

    /******************************* text logic ************************************/

    getRange() {
        let result = html``;
        let min = this.getMinValue();
        let max = this.getMaxValue();
        (min) && (min = min.toFixed(1));
        (max) && (max = max.toFixed(1));
        const units = this.getUnits();
        if (min && max) {
            result = html`<var>${min}</var><sup>${units}</sup><var>&thinsp;-&thinsp;${max}</var><sup>${units}</sup>`
        } else if (min) {
            result = html`<var class="one">${min}</var><sup class="one">${units}</sup>`
        } else if (max) {
            result = html`<var class="one">${max}</var><sup class="one">${units}</sup>`
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
        (upper === 'off') && (upper = html`&thinsp;`);
        return html`<div class="upper" style=${styleMap(this.getTextStyles())}>${upper}</div>`;
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

    isNearMin(e) {
        if (!this.getMinValue()) return false;
        return (this.getDistance(e, this.getMinValue()) < this.getTolerance())
    }

    isNearMax(e) {
        if (!this.getMaxValue()) return false;
        return (this.getDistance(e, this.getMaxValue()) < this.getTolerance())
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
        let minDistance = 5;
        let maxDistance = 5;
        (this.isNearMin(e)) && (minDistance = this.getDistance(e, this.getMinValue()));
        (this.isNearMax(e)) && (maxDistance = this.getDistance(e, this.getMaxValue()));
        if (minDistance < maxDistance) {
            this._whichValue = 'min';
        } else if (minDistance > maxDistance) {
            this._whichValue = 'max';
        } else {
            this._whichValue = 'none';
        }
    }

    shouldUp(newValue) {
        if (this.getWhichValue() == 'min') {
            return (this.getMinMax() < newValue || newValue < this.getMinExtreme())
        }
        if (this.getWhichValue() == 'max') {
            return (newValue < this.getMaxMin() || this.getMaxExtreme() < newValue);
        }
    }

    /****************************** interactive logic *******************************/


    down(e) {
        this.setWhichValue(e);
        if (this.getWhichValue() !== 'none') {
            this.raiseChangeFlag();
            this.move(e);
        }
    }

    up(e) {
        this.handleMessage();
        this.clearWhichValue();
    }

    move(e) {
        const which = this.getWhichValue();
        if (which !== 'none') {
            const mouseCoords = this.getMouseCoords(e);
            const xFromCenter = mouseCoords[0] - 1;
            const yFromCenter = mouseCoords[1] - 1;
            let angle = Math.atan2(-xFromCenter, yFromCenter) % (2 * Math.PI);
            (angle < 0) && (angle = angle + 2 * Math.PI);
            const newValue = this.getNewValue(angle);
            (which === 'min') ? (this.setMinValue(newValue)) : (this.setMaxValue(newValue));
            (this.shouldUp(newValue)) && (this.up(e));
        }
    }

    handleMessage() {
        if (this.getWhichValue() == 'none') return;
        let which = 'min';
        let value = this.getMinValue();
        if (this.getWhichValue() == 'max') {
            which = 'max';
            value = this.getMaxValue();
        }
        this.dispatchEvent(new CustomEvent('change', { detail: [which, value] }));
    }

    /**************************** style/html logic ***************************/

    arc(startAngle, stopAngle, stroke) {
        const ns = "http://www.w3.org/2000/svg";
        const path = document.createElementNS(ns, "path");
        path.setAttribute("d", this.arcD(startAngle, stopAngle));
        path.setAttribute("stroke", stroke);
        path.setAttribute("stroke-width", 2 * this.getThickness())
        path.setAttribute("class", "arc");
        return path;
    }

    backArc() {
        let start = this.getAngle(this.getMinExtreme());
        let end = this.getAngle(this.getMaxExtreme());
        if (this.getMinValue()) {
            start = this.getAngle(this.getMinValue());
        }
        if (this.getMaxValue()) {
            end = this.getAngle(this.getMaxValue());
        }
        return this.arc(start, end, rgba(OFF, .25));
    }

    minArc() {
        if (!this.getMinValue()) return null;
        const start = this.getAngle(this.getMinExtreme());
        const end = this.getAngle(this.getMinValue());
        return this.arc(start, end, rgba(this.getMinColor(), .5))
    }

    minDifference() {
        if (!this.getMinValue() || this.getValue() > this.getMinValue()) return null;
        const start = this.getAngle(this.getValue());
        const end = this.getAngle(this.getMinValue());
        return this.arc(start, end, rgba(this.getMinColor(), 1))
    }

    maxArc() {
        if (!this.getMaxValue()) return null;
        const start = this.getAngle(this.getMaxValue());
        const end = this.getAngle(this.getMaxExtreme());
        return this.arc(start, end, rgba(this.getMaxColor(), .5))
    }

    maxDifference() {
        if (!this.getMaxValue() || this.getValue() < this.getMaxValue()) return null;
        const start = this.getAngle(this.getMaxValue());
        const end = this.getAngle(this.getValue());
        return this.arc(start, end, rgba(this.getMaxColor(), 1))
    }

    dot(value, r, fill) {
        const ns = "http://www.w3.org/2000/svg";
        const dot1 = document.createElementNS(ns, "circle");
        const coords = this.getCoords(value);
        dot1.setAttribute("cx", coords[0]);
        dot1.setAttribute("cy", coords[1]);
        dot1.setAttribute("r", r);
        dot1.setAttribute("fill", fill);
        return dot1;
    }

    minDot(inner) {
        if (!this.getMinValue()) return null;
        if (inner) {
            return this.dot(this.getMinValue(), this.getIris() * this.getThickness(), "white")
        } else {
            return this.dot(this.getMinValue(), this.getThickness(), rgba(this.getMinColor(), 1))
        }
    }

    maxDot(inner) {
        if (!this.getMaxValue()) return null;
        if (inner) {
            return this.dot(this.getMaxValue(), this.getIris() * this.getThickness(), "white")
        } else {
            return this.dot(this.getMaxValue(), this.getThickness(), rgba(this.getMaxColor(), 1))
        }
    }

    tempDot() {
        let color = rgba(OFF, 1);
        if (this.getMinValue() && this.getValue() < this.getMinValue()) {
            color = rgbp(this.getMinColor(), .5);
        }
        if (this.getMaxValue() && this.getValue() > this.getMaxValue()) {
            color = rgbp(this.getMaxColor(), .5);
        }
        return this.dot(this.getValue(), this.getTempDotSize(), color);
    }

    static styles = [sharedStyles, styles];

    getBackground() {
        let background = ``;
        const color = this.getColorMode();
        if (color) {
            background = `radial-gradient(circle at center, ${rgba(color, .2)} 0, ${rgba(color, 0)} 60%)`
        }
        return background;
    }

    getStyles() {
        let styles = {};
        styles['background'] = this.getBackground();
        return styles;
    }

    getTextStyles() {
        let styles = {};
        if (this.getColorMode()) {
            styles['color'] = rgba(this.getColorMode(), 1);
        }
        return styles;
    }

    render() {
        if (this.isInitialized()) {
            return html`
                <div class="info" style=${styleMap(this.getStyles())}>
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
                    ${this.backArc()}
                    ${this.minArc()}
                    ${this.minDifference()}
                    ${this.minDot(false)}
                    ${this.minDot(true)}
                    ${this.maxArc()}
                    ${this.maxDifference()}
                    ${this.maxDot(false)}
                    ${this.maxDot(true)}
                    ${this.tempDot()}
                </svg>
            `
        }
    }

}

customElements.define("double-circular-slider", DoubleCircularSlider);