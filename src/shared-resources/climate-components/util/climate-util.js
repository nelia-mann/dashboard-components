import { OFF, COOL, HOT, climateGradient, rgba } from './../../util/color-util.js';


function getTemp(structure, states) {
    const entityId = structure.temp;
    const state = states[entityId];
    const value = (Number(state.state).toFixed(1)).toString();
    const unit = state.attributes.unit_of_measurement;
    return value + " " + unit;
}

function getMode(structure, states) {
    const modeId = structure.mode;
    return states[modeId].state;
}

function getAction(structure, states) {
    const hpId = structure.heatpump;
    const hpState = states[hpId].state;
    let action = "off";
    switch (hpState) {
        case 'heat':
            action = "Heating";
            break;
        case 'cool':
            action = "Cooling";
            break;
        case 'off':
            if (getMode(structure, states) !== "off") {
                action = "Idle";
            } else { action = "Off" };
            break;
    }
    return action;
}

function getModeStyles(structure, states, mode, outline) {
    let styles = {};
    switch (mode) {
        case 'off':
            styles['background-color'] = rgba(OFF, 0.5);
            if (outline) {
                styles['outline'] = `solid ${rgba(OFF, 1.0)}`;
                styles['outline-offset'] = '-3px';
            }
            break;
        case 'heat':
            styles['background-color'] = rgba(HOT, 0.5);
            if (outline) {
                styles['outline'] = `solid ${rgba(HOT, 1.0)}`;
                styles['outline-offset'] = '-3px';
            }
            break;
        case 'cool':
            styles['background-color'] = rgba(COOL, 0.5);
            if (outline) {
                styles['outline'] = `solid ${rgba(COOL, 1.0)}`;
                styles['outline-offset'] = '-3px';
            }
            break;
        case 'heat-cool':
            styles['background'] = climateGradient();
            if (outline) {
                switch (getAction(structure, states)) {
                    case 'Heating':
                        styles['outline'] = `solid ${rgba(HOT, 1.0)}`;
                        break;
                    case 'Cooling':
                        styles['outline'] = `solid ${rgba(COOL, 1.0)}`;
                        break;
                    case 'Idle':
                        styles['outline'] = `solid ${rgba(OFF, 1.0)}`;
                        break;
                    case 'Off':
                        styles['outline'] = `solid ${rgba(OFF, 1.0)}`;
                        break;
                }
                styles['outline-offset'] = '-3px';
            }
    }
    return styles;
}

export { getModeStyles, getTemp, getMode, getAction }