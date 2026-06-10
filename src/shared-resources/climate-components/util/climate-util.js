import { OFF, COOL, HOT, WHITE, FAN, rgba } from './../../util/color-util.js';

function climateGradient() {
    let output = `linear-gradient(to left, `;
    output = output + rgba(COOL, .5) + `0%, `;
    output = output + rgba(WHITE, .5) + `50%, `;
    output = output + rgba(HOT, .5) + `100%)`;
    return output;
}

function climateGradientUp() {
    let output = `linear-gradient(to top, `;
    output = output + rgba(COOL, .5) + `0%, `;
    output = output + rgba(WHITE, .5) + `50%, `;
    output = output + rgba(HOT, .5) + `100%)`;
    return output;
}

function getModeStyles(mode, action, outline) {
    let styles = {};
    switch (mode) {
        case 'off':
            styles['background-color'] = rgba(OFF, 0.5);
            (outline) && (styles['outline'] = `solid ${rgba(OFF, 1.0)}`);
            break;
        case 'heat':
            styles['background-color'] = rgba(HOT, 0.5);
            (outline) && (styles['outline'] = `solid ${rgba(HOT, 1.0)}`);
            break;
        case 'safe_min':
            styles['background-color'] = rgba(HOT, 0.5);
            (outline) && (styles['outline'] = `solid ${rgba(HOT, 1.0)}`);
            break;
        case 'cool':
            styles['background-color'] = rgba(COOL, 0.5);
            (outline) && (styles['outline'] = `solid ${rgba(COOL, 1.0)}`)
            break;
        case 'heat-cool':
            styles['background'] = climateGradient();
            (outline && action === 'Heating') && (styles['outline'] = `solid ${rgba(HOT, 1.0)}`);
            (outline && action === 'Cooling') && (styles['outline'] = `solid ${rgba(COOL, 1.0)}`);
            (outline && ['Off', 'Idle'].includes(action)) && (styles['outline'] = `solid ${rgba(OFF, 1.0)}`);
            break;
        case 'auto':
            styles['background'] = climateGradient();
            (outline && action === 'Heating') && (styles['outline'] = `solid ${rgba(HOT, 1.0)}`);
            (outline && action === 'Cooling') && (styles['outline'] = `solid ${rgba(COOL, 1.0)}`);
            (outline && ['Off', 'Idle'].includes(action)) && (styles['outline'] = `solid ${rgba(OFF, 1.0)}`);
            break;            
        case 'on':
            styles['background-color'] = rgba(FAN, 0.5);
            (outline) && (styles['outline'] = `solid ${rgba(FAN, 1.0)}`);
            break;
        case 'fan_only':
            styles['background-color'] = rgba(FAN, 0.5);
            (outline) && (styles['outline'] = `solid ${rgba(FAN, 1.0)}`);
            break;
        case 'safe_max':
            styles['background-color'] = rgba(FAN, 0.5);
            (outline) && (styles['outline'] = `solid ${rgba(FAN, 1.0)}`);
            break;
    }
    return styles;
}

export { getModeStyles, climateGradientUp }