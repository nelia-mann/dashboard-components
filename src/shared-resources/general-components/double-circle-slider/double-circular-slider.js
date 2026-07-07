import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { HaSubComponent } from '../../base-classes/ha-subcomponent.js';
import { OFF, WHITE, rgba } from '../../util/color-util.js';
import styles from './slider.styles.js';
import sharedStyles from '../../styles/shared-styles.js';

export class DoubleCircularSlider extends HaSubComponent {

    _OFFSETANGLE = 40;
    _THICKNESS = .075;
    _IRIS = .75;
    _TEMPDOT = 0.025;

    static properties = {
        ...super.properties,
        _value: { state: true },
        fixed: { state: true }
    }

    constructor() {
        super();
        this.structure = {};
        this._value = null;
        this.fixed = true;
    }

    /************************** lifecycle *****************************/

    getTriggers() {
        return ["_value", "fixed"];
    }

    setInitialValues() {
        this.setValue(this.getStateValue());
    }

    /****************************** getter and setter logic *************************/

    getTempDotSize() {
        return this._TEMPDOT;
    }

    getIris() {
        return this._IRIS;
    }

    getThickness() {
        return this._THICKNESS;
    }

    getOffset() {
        return this._OFFSETANGLE;
    }

    getEntityId() {
        return [...this.getEntityIds()][0];
    }

    getMinExtreme() {
        return this.min;
    }

    getMaxExtreme() {
        return this.max;
    }

    getStateValue() {
        return this.targetValue;
    }

    getHighColor() {
        return this.highColor;
    }

    getLowColor() {
        return this.lowColor;
    }

    getSensor() {
        return this.sensor;
    }

    getActionColor() {
        return this.actionColor;
    }

    getUnits() {
        let units = '';
        (this.units) && (units = this.units);
        return units;
    }

    getAction() {
        let upper = '';
        (this.action) && (upper = this.action);
        return upper;
    }

    setValue(value) {
        if (value < this.getMinExtreme()) {
            this._value = this.getMinExtreme();
        } else if (this.getMaxExtreme() < value) {
            this._value = this.getMaxExtreme();
        } else {
            this._value = value;
        }
    }

    getValue() {
        return this._value;
    }

    isFixed() {
        return (this.fixed || !this.getStateValue());
    }

    getMinOff() {
        if (this.getHighColor()) return this.getValue();
        return this.getMinExtreme();
    }

    getMaxOff() {
        if (this.getLowColor()) return this.getValue();
        return this.getMaxExtreme();
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
        return (this.getDistance(e, this.getValue()) < 2 * this.getThickness())
    }

    getMouseCoords(e) {
        const svg = this.renderRoot.querySelector('svg');
        const pt = svg.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        const svgPoint = pt.matrixTransform(svg.getScreenCTM().inverse());
        return [svgPoint.x, svgPoint.y]
    }

    /****************************** interactive logic *******************************/

    down(e) {
        if (this.isNearPointer(e) && !this.isFixed()) {
            this.raiseChangeFlag();
            this.move(e);
        }
    }

    async up(e) {
        if (this.getChangeFlag()) {
            this.dispatchEvent(new CustomEvent('change', { detail: this.getValue() }));
            if (this.wait) {
                await this.waitForEntity(this.getEntityId(), (entityId) => this.wait(entityId, this.getValue()));
            }
            this.lowerChangeFlag();
            this.requestUpdate();
        }
    }

    shouldUp(newValue) {
        return (newValue < this.getMinExtreme() || this.getMaxExtreme() < newValue); 
    }

    move(e) {
        if (this.getChangeFlag()) {
            const mouseCoords = this.getMouseCoords(e);
            const xFromCenter = mouseCoords[0] - 1;
            const yFromCenter = mouseCoords[1] - 1;
            let angle = Math.atan2(-xFromCenter, yFromCenter) % (2 * Math.PI);
            (angle < 0) && (angle = angle + 2 * Math.PI);
            const newValue = this.getNewValue(angle);
            this.setValue(newValue);
            (this.shouldUp(newValue)) && (this.up(e));
        }
    }

    /******************************* html logic ************************************/

    getIcon() {
        if (this.icon) {
            return html`<ha-svg-icon .path="${this.icon}" style=${styleMap(this.getTextStyles())}></ha-svg-icon>`
        }
    }

    getRange() {
        if (!this.getStateValue()) return html`<var class="one"> OFF </var>`;
        if (typeof this.getValue() === 'number') {
            const target = this.getValue().toFixed(0);
            const units = this.getUnits();
            return html`<var class="one">${target}</var><sup class="one">${units}</sup>`
        }
    }

    getLowerText() {
        const units = this.getUnits();
        const value = this.getSensor().toFixed(1);
        return html`<div class="lower" style=${styleMap(this.getTextStyles())}> ${this.getIcon()}  ${value} ${units}</div>`
    }

    getUpperText() {
        let upper = this.getAction();
        (upper === 'Off') && (upper = html`&thinsp;`);
        return html`<div class="upper" style=${styleMap(this.getTextStyles())}>${upper}</div>`;
    }

    arc(startValue, stopValue, color, opacity) {
        if (!color || (stopValue < startValue)) return;
        const startAngle = this.getAngle(startValue);
        const stopAngle = this.getAngle(stopValue);
        const ns = "http://www.w3.org/2000/svg";
        const path = document.createElementNS(ns, "path");
        path.setAttribute("d", this.arcD(startAngle, stopAngle));
        path.setAttribute("stroke", rgba(color, opacity));
        path.setAttribute("stroke-width", 2 * this.getThickness())
        path.setAttribute("class", "arc");
        return path;
    }

    dot(show, value, r, color, opacity) {
        if (!show || !color) return;
        const ns = "http://www.w3.org/2000/svg";
        const dot1 = document.createElementNS(ns, "circle");
        const coords = this.getCoords(value);
        dot1.setAttribute("cx", coords[0]);
        dot1.setAttribute("cy", coords[1]);
        dot1.setAttribute("r", r);
        dot1.setAttribute("fill", rgba(color, opacity));
        return dot1;        
    }

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
                    ${this.arc(this.getMinOff(), this.getMaxOff(), OFF, .25)}
                    ${this.arc(this.getMinExtreme(), this.getValue(), this.getHighColor(), .5)}
                    ${this.arc(this.getSensor(), this.getValue(), this.getHighColor(), 1)}
                    ${this.arc(this.getValue(), this.getMaxExtreme(), this.getLowColor(), .5)}
                    ${this.arc(this.getValue(), this.getSensor(), this.getLowColor(), 1)}
                    ${this.dot(this.getSensor() <= this.getValue(), this.getValue(), this.getThickness(), this.getHighColor(), 1)}
                    ${this.dot(this.getValue() <= this.getSensor(), this.getValue(), this.getThickness(), this.getLowColor(), 1)}
                    ${this.dot(!this.isFixed(), this.getValue(), this.getIris() * this.getThickness(), WHITE, 1)}
                    ${this.dot(true, this.getSensor(), this.getTempDotSize(), OFF, 1)}
                </svg>
            `
        }
    }

    /********************************** style logic *******************************************/

    getBGStyles() {
        const styles = {};        
        const color = this.getActionColor();
        if (color) {
            styles['background'] = `radial-gradient(circle at center, ${rgba(color, .2)} 0, ${rgba(color, 0)} 60%)`;
        }
        return styles;
    }

    getTextStyles() {
        const styles = {};
        if (this.getActionColor()) {
            styles['color'] = rgba(this.getActionColor(), 1);
        }
        return styles;
    }

    static styles = [sharedStyles, styles];

}

customElements.define("double-circular-slider", DoubleCircularSlider);