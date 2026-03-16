import {
    interpolateRGB,
    rgba,
    getTempColor,
    tempGradient,
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