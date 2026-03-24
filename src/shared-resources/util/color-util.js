const ONLIGHT = [255, 193, 7]; // color in rgb (yellow)
const HALFLIGHT = [127, 97, 3]; // should be black-ish yellow
const OFF = [158, 158, 158]; // color in rgb (gray)
const OFFLIGHT = [68, 115, 158]; // color in rgb (steel blue)
const INDIGO = [41, 0, 255]; // blue color
const COOL = [33, 150, 243];
const HOT = [255, 111, 34];
const WHITE = [255, 255, 255];

const ONLIGHTHS = [45, 100];

const STEPS = 10;

function setScale(a, b, t) {
    let result = a;
    if (t > 1) {
        result = b;
    } else if (t < 0) {
        result = a
    } else {
        result = a + ((b - a) * t )
    }
    return result;
}

function rgba(rgbArray, opacity) {
    return `rgba(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]}, ${opacity})`
}

function interpolateRGB(rgbA, rgbB, t) {
    const red = setScale(rgbA[0], rgbB[0], t);
    const green = setScale(rgbA[1], rgbB[1], t);
    const blue = setScale(rgbA[2], rgbB[2], t);
    return [red, green, blue]
}

function rgbp(rgbArray, paleness) {
    const array = interpolateRGB(WHITE, rgbArray, paleness);
    return `rgb(${array[0]}, ${array[1]}, ${array[2]})`
}

export {
    interpolateRGB,
    rgba,
    rgbp,
    STEPS,
    OFF,
    ONLIGHT,
    HALFLIGHT,
    OFFLIGHT,
    INDIGO,
    ONLIGHTHS,
    COOL,
    HOT,
    WHITE
}