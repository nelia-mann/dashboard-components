const OFF = [158, 158, 158]; // color in rgb (gray)
const OFFENTITY = [68, 115, 158]; // color in rgb (steel blue)

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

export {
    interpolateRGB,
    rgba,
    OFF,
    OFFENTITY
}