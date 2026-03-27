import { OFF, COOL, HOT, WHITE, rgba } from './../../util/color-util.js';

function climateGradient() {
    let output = `linear-gradient(to left, `;
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
        case 'safe':
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
    }
    return styles;
}

export { getModeStyles }