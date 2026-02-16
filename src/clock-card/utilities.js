const pad = (value) => {
    let string = String(value);
    if (string.length == 1) {
        string = "0" + string;
    }
    return string;
}

const parseTime = (milliseconds) => {
    let remainder = Math.floor(milliseconds / 1000);
    let hours = Math.floor(remainder / (60 * 60));
    remainder = remainder - hours * (60 * 60);
    const minutes = Math.floor(remainder / 60);
    remainder = remainder - minutes * 60;
    hours = hours % 24;
    const output = pad(hours) + ":" + pad(minutes) + ":" + pad(remainder);
    return output;
}

const reverseParse = (string) => {
    const array = string.split(":");
    const hours = Number(array[0]);
    const minutes = Number(array[1]);
    const seconds = Number(array[2]);
    return (hours * 36000) + (minutes * 60) + (seconds);
}

const parseTimeButton = (str) => {
        const sign = str[0];
        const units = str[str.length - 1];
        let value = Number(str.slice(1, -1));
        if (units === "m") {
            value = value * 60;
        }
        if (sign === "-") {
            value = value * -1
        }
        return value;
}

export { parseTime, reverseParse, parseTimeButton }