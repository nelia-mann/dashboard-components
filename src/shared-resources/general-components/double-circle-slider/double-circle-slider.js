import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { HaSubComponent } from '../../base-classes/ha-subcomponent.js';
import { OFF, rgba } from './../../util/color-util.js';
import styles from './slider.styles.js';
import sharedStyles from '../../styles/shared-styles.js';

export class DoubleCircularSlider extends HaSubComponent {

    offsetAngle = 30;
    thickness = .07;


    /************************** lifecycle *****************************/

    /****************************** getter and setter logic *************************/

    getValue() {
        return this.structure.value;
    }

    getMinExtreme() {
        return this.structure.minExtreme;
    }

    getMaxExtreme() {
        return this.structure.maxExtreme;
    }

    getMinValue() {
        return this.structure.minValue;
    }

    getMaxValue() {
        return this.structure.maxValue;
    }

    getMinColor() {
        return this.structure.minColor;
    }

    getMaxColor() {
        return this.structure.maxColor;
    }

    /****************************** interactive logic *******************************/

    /******************************* geometric logic *******************************/

    arcD(th1, th2, toggle) {
        const radius = 1 - this.thickness
        const x1 = -radius * Math.sin(th1) + 1;
        const y1 = radius * Math.cos(th1) + 1;
        const x2 = -radius * Math.sin(th2) + 1;
        const y2 = radius * Math.cos(th2) + 1;
        return `M ${x1} ${y1} A ${radius} ${radius} 0 ${toggle} 1 ${x2} ${y2}`
    }

    getAngle(value) {
        const range = this.getMaxExtreme() - this.getMinExtreme();
        const angleRange = 360 - (2 * this.offsetAngle);
        const scale = angleRange / range;
        return (this.offsetAngle + scale * (value - this.getMinExtreme())) * Math.PI / 180;
    }

    getCoords(value) {
        const radius = 1 - this.thickness
        const angle = this.getAngle(value);
        const x = -radius * Math.sin(angle) + 1;
        const y = radius * Math.cos(angle) + 1;
        return [x, y]
    }

    /**************************** style/html logic ***************************/

    arc(startAngle, stopAngle, stroke, toggle) {
        const ns = "http://www.w3.org/2000/svg";
        const path = document.createElementNS(ns, "path");
        path.setAttribute("d", this.arcD(startAngle, stopAngle, toggle));
        path.setAttribute("stroke", stroke);
        path.setAttribute("stroke-width", 2 * this.thickness)
        path.setAttribute("class", "arc");
        return path;
    }

    minArc() {
        if (!this.getMinValue()) return null;
        const start = this.getAngle(this.getMinExtreme());
        const end = this.getAngle(this.getMinValue());
        return this.arc(start, end, rgba(this.getMinColor(), .5), 0)
    }

    minDifference() {
        if (!this.getMinValue() || this.getValue() > this.getMinValue()) return null;
        const start = this.getAngle(this.getValue());
        const end = this.getAngle(this.getMinValue());
        return this.arc(start, end, rgba(this.getMinColor(), 1), 0)
    }

    maxArc() {
        if (!this.getMaxValue()) return null;
        const start = this.getAngle(this.getMaxValue());
        const end = this.getAngle(this.getMaxExtreme());
        return this.arc(start, end, rgba(this.getMaxColor(), .5), 0)
    }

    maxDifference() {
        if (!this.getMaxValue() || this.getValue() < this.getMaxValue()) return null;
        const start = this.getAngle(this.getMaxValue());
        const end = this.getAngle(this.getValue());
        return this.arc(start, end, rgba(this.getMaxColor(), 1), 0)
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
            return this.dot(this.getMinValue(), .8 * this.thickness, "white")
        } else {
            return this.dot(this.getMinValue(), this.thickness, rgba(this.getMinColor(), 1))
        }
    }

    maxDot(inner) {
        if (!this.getMaxValue()) return null;
        if (inner) {
            return this.dot(this.getMaxValue(), .8 * this.thickness, "white")
        } else {
            return this.dot(this.getMaxValue(), this.thickness, rgba(this.getMaxColor(), 1))
        }
    }

    static styles = [sharedStyles, styles];

    render() {
        if (this.isInitialized()) {
            const offset = this.getAngle(this.getMinExtreme());
            return html`
                <svg width="100%" height="100%" viewBox="0 0 2 2">
                    ${this.arc(offset, -1 * offset, rgba(OFF, .5), 1)}
                    ${this.minArc()}
                    ${this.minDifference()}
                    ${this.minDot(false)}
                    ${this.minDot(true)}
                    ${this.maxArc()}
                    ${this.maxDifference()}
                    ${this.maxDot(false)}
                    ${this.maxDot(true)}
                    ${this.dot(this.getValue(), 0.02, rgba(OFF, 1))}
                </svg>
            `
        }
    }

}

customElements.define("double-circular-slider", DoubleCircularSlider);