import {
    interpolateRGB,
    rgba,
    OFFLIGHT,
    ONLIGHT,
    HALFLIGHT,
    ONLIGHTHS,
    STEPS,
} from '../../util/color-util.js';
import { isOn, getAttributes } from '../../util/state-util.js';

const MINTEMPSAFE = 2000;
const MAXTEMP = 9000;
const MINTEMP = 1500;

function getColorModes(lightState) {
    const attribute = getAttributes(lightState).supported_color_modes;
    if (attribute) {
        return attribute;
    } else {
        return [];
    }
}

function getRGB(lightState) {
    return (getAttributes(lightState).rgb_color);
}

function getBrightness(lightState) {
    return (getAttributes(lightState).brightness);
}

function getBrightnessPct(lightState) {
    let brightnessPct = 100;
    let brightness = getAttributes(lightState).brightness;
    (brightness) && (brightnessPct = brightness * 100 / 255);
    return brightnessPct;
}

function getHSColor(lightState) {
    let hsColor = ONLIGHTHS;
    let hsColorAttr = getAttributes(lightState).hs_color;
    (hsColorAttr) && (hsColor = hsColorAttr);
    return hsColor;
}

function getHalfRGB(lightState) {
    const rgb = getRGB(lightState);
    return [rgb[0] / 2, rgb[1] / 2, rgb[2] / 2];
}

function getColor(lightState) {
    let rgb = OFFLIGHT;
    if (isOn(lightState)) {
        if (getRGB(lightState)) {
            rgb = interpolateRGB(getHalfRGB(lightState), getRGB(lightState), getBrightnessPct(lightState) / 100);
        } else {
            rgb = interpolateRGB(HALFLIGHT, ONLIGHT, getBrightnessPct(lightState) / 100);
        }
    }
    return rgba(rgb, 1)
}

function getMinTemp(lightState) {
    let min = MINTEMP;
    const minAttr = getAttributes(lightState).min_color_temp_kelvin;
    (minAttr) && (min = minAttr);
    return min;
}

function getMaxTemp(lightState) {
    let max = MAXTEMP;
    const maxAttr = getAttributes(lightState).max_color_temp_kelvin;
    (maxAttr) && (max = maxAttr);
    return max;
}

function getColorTemp(lightState) {
    let temp = MINTEMPSAFE;
    const tempAttr = getAttributes(lightState).color_temp_kelvin;
    (tempAttr) && (temp = tempAttr);
    return temp;
}

function getTempRed(temp) {
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

function getTempGreen(temp) {
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

function getTempBlue(temp) {
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

function getTempColor(temp) {
    return [getTempRed(temp), getTempGreen(temp), getTempBlue(temp)]
}

function tempGradientGeneral(minTemp, maxTemp, mode, alpha) {
    let output = `linear-gradient(${mode}`;
    const steps = STEPS;
    for (let step = 0; step <= steps; step++) {
        const temp = (minTemp * (steps - step) + maxTemp * step) / steps;
        const rgb = getTempColor(temp);
        const result = rgba(rgb, alpha);
        const percent = Math.round(step * 100 / steps);
        output = output + `, ` + result + ` ${percent}%`;
    }
    output = output + `)`;
    return output;
}

function tempGradient(minTemp, maxTemp) {
    return tempGradientGeneral(minTemp, maxTemp, 'to top', 1);
}

function tempGradientFull() {
    return tempGradient(MINTEMP, MAXTEMP);
}

function tempBorder() {
    return rgba(getTempColor(MINTEMP), 1);
}

function hsGradient() {
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

export {
    getColorModes,
    getBrightness,
    getBrightnessPct,
    getMinTemp,
    getMaxTemp,
    getColorTemp,
    tempGradient,
    tempGradientFull,
    tempBorder,
    hsGradient,
    getColor,
    getHSColor
}