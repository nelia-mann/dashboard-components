import { HaSubComponent } from './ha-subcomponent.js';
import {
    interpolateRGB,
    rgba,
    OFFLIGHT,
    ONLIGHT,
    HALFLIGHT,
    STEPS,
    ONLIGHTHS
} from '../util/color-util.js';

/* Assumes a "states" object and a "structure" object.  The structure object is a dictionary with keys:

main: gives the entity Id for the primary light

theme: gives the entity Id for the theme of the primary light (may not exist)

group: gives a dictionary corresponding to members of the associated light group (if there is no group, this is emtpy).
            Inside this, the keys are the entityIds for the members, and the values are themselves "structure" objects
            in the same form (with keys main, theme)

*/

const MAXTEMP = 9000;
const MINTEMP = 1500;
const MINSAFETEMP = 2000;

export class HaLightingComponent extends HaSubComponent {

    getMainId() {
        return this.getStructure().main;
    }

    getThisStructure(lightId) {
        if (lightId && lightId !== this.getMainId()) {
            return this.getGroup()[lightId].structure;
        }
        return this.getStructure();
    }

    isGroup(entityId) {
        return !!(this.getThisStructure(entityId).group)
    }

    getGroup() {
        return this.getStructure().group;
    }

    getThemeId(lightId) {
        return this.getThisStructure(lightId).theme;
    }

    getLightState(lightId) {
        if (lightId) {
            return this.getState(lightId);
        }
        return this.getState(this.getMainId());
    }

    getThemeState(lightId) {
        if (lightId) {
            return this.getState(this.getThemeId(lightId))
        }
        return this.getState(this.getThemeId(this.getMainId()))
    }

    getThemeStateState(lightId) {
        return this.getThemeState(lightId).state;
    }

    getAttributes(lightId) {
        return this.getLightState(lightId).attributes;
    }

    getName(lightId) {
        return this.getAttributes(lightId).friendly_name;
    }

    isOn(lightId) {
        return this.getLightState(lightId).state === 'on';
    }

    getRGB(lightId) {
        return this.getAttributes(lightId).rgb_color;
    }

    getBrightnessPct(lightId) {
        let brightnessPct = 100;
        let brightness = this.getAttributes(lightId).brightness;
        (brightness) && (brightnessPct = brightness * 100 / 255);
        return brightnessPct;
    }

    getColorModes(lightId) {
        const colorModes = this.getAttributes(lightId).supported_color_modes;
        if (colorModes) {
            return colorModes;
        }
        else return [];
    }

    hasBrightness(lightId) {
        return (Object.keys(this.getAttributes(lightId)).includes('brightness'));
    }

    hasCTColor(lightId) {
        return (Object.keys(this.getAttributes(lightId)).includes('color_temp_kelvin'));
    }

    hasHSColor(lightId) {
        return (Object.keys(this.getAttributes(lightId)).includes('hs_color'));
    }

    hasTheme(lightId) {
        return Object.keys(this.getThisStructure(lightId)).includes('theme');
    }

    getThemeOptions(lightId) {
        return this.getAttributes(this.getThemeId(lightId)).options;
    }

    getTheseEntityIds(lightId) {
        let id;
        (lightId) ? (id = lightId) : (id = this.getMainId());
        let array = [id];
        (this.hasTheme(id)) && array.push(this.getThemeId());
        return new Set(array);
    }

    /********************************** color methods ***********************************************/

    getHalfRGB(lightId) {
        const rgb = this.getRGB(lightId);
        return [rgb[0] / 2, rgb[1] / 2, rgb[2] / 2];
    }

    getColor(lightId) {
        let rgb = OFFLIGHT;
        if (this.isOn(lightId)) {
            if (this.getRGB(lightId)) {
                rgb = interpolateRGB(this.getHalfRGB(lightId), this.getRGB(lightId), this.getBrightnessPct(lightId) / 100);
            } else {
                rgb = interpolateRGB(HALFLIGHT, ONLIGHT, this.getBrightnessPct(lightId) / 100);
            }
        }
        return rgba(rgb, 1)
    }

    getHSColor(lightId) {
        let hsColor = ONLIGHTHS;
        let hsColorAttr = this.getAttributes(lightId).hs_color;
        (hsColorAttr) && (hsColor = hsColorAttr);
        return hsColor;
    }

    getMinTemp(lightId) {
        let min = MINTEMP;
        const minAttr = this.getAttributes(lightId).min_color_temp_kelvin;
        (minAttr) && (min = minAttr);
        return min;
    }

    getMaxTemp(lightId) {
        let max = MAXTEMP;
        const maxAttr = this.getAttributes(lightId).max_color_temp_kelvin;
        (maxAttr) && (max = maxAttr);
        return max;
    }

    getColorTemp(lightId) {
        let temp = MINSAFETEMP;
        const tempAttr = this.getAttributes(lightId).color_temp_kelvin;
        (tempAttr) && (temp = tempAttr);
        return temp;
    }

    hsGradient() {
        let output = 'radial-gradient(circle at center, white 0%, transparent 100%), '
        output = output + 'conic-gradient( from 0deg'
        const steps = STEPS;
        for (let step = 0; step <= steps; step++) {
            const angle = Math.round(step * 360 / steps);
            output = output + `, hsl(${angle}, 100%, 50%)`
        }
        output = output + `)`;
        return output;
    }

    getTempRed(temp) {
        let red;
        if (temp <= 6600) {
            red = 255;
        } else {
            red = (temp / 100) - 60;
            red = Math.round(329.698727446 * (red ** (-0.1332047592)));
        }
        (red < 0) && (red = 0);
        (red > 255) && (red = 255);
        return red;
    }

    getTempGreen(temp) {
        let green;
        if (temp <= 6600) {
            green = temp / 100;
            green = Math.round((99.4708025861) * Math.log(green) - 161.1195681661);
        } else {
            green = (temp / 100) - 60;
            green = Math.round(288.1221695283 * (green ** (-0.0755148492)));
        }
        (green < 0) && (green = 0);
        (green > 255) && (green = 255);
        return green;
    }

    getTempBlue(temp) {
        let blue;
        if (temp > 6600) {
            blue = 255;
        } else {
            if (temp <= 1900) {
                blue = 0;
            } else {
                blue = (temp / 100) - 10;
                blue = Math.round(138.5177312231 * Math.log(blue) - 305.0447927307);
            }
        }
        (blue < 0) && (blue = 0);
        (blue > 255) && (blue = 255);
        return blue;
    }

    getTempColor(temp) {
        return [this.getTempRed(temp), this.getTempGreen(temp), this.getTempBlue(temp)]
    }

    tempBorder() {
        return rgba(this.getTempColor(MINTEMP), 1);
    }

    tempGradientGeneral(minTemp, maxTemp, mode, alpha) {
        let output = `linear-gradient(${mode}`;
        const steps = STEPS;
        for (let step = 0; step <= steps; step++) {
            const temp = (minTemp * (steps - step) + maxTemp * step) / steps;
            const rgb = this.getTempColor(temp);
            const result = rgba(rgb, alpha);
            const percent = Math.round(step * 100 / steps);
            output = output + `, ` + result + ` ${percent}%`;
        }
        output = output + `)`;
        return output;
    }

    tempGradientFull() {
        return this.tempGradientGeneral(MINTEMP, MAXTEMP, 'to right', 1);
    }

}