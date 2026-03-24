import { HaSubComponent } from './ha-subcomponent.js';

export class HaClimateComponent extends HaSubComponent {

/* assumes a "states" object, and a "structure" object.  The "structure" object is a dictionary whose values are
entity ids, and whose keys are:

min: minimum temp setting.  (input_number, includes attributes step, min, and max)

max: maximum temp settting.  (input_number, includes attributes step, min, and max)

temp: current temperature.  (sensor value, includes attribute unit_of_measurement)

mode: current climate mode.  (input_select, with options "heat", "cool", "heat-cool", and "off")

heatpump: heatpump.  (select, with options "heat", "cool", "off")

rank: current ranking for climate priority.  (input_number, an integer from 1 to 4.)

script: the script to reset heatpump ranking.  (takes as a variable the heatpump we want to be first.)

*/

    getState(key) {
        const entityId = this.getStructure()[key];
        const state = this.getStates()[entityId];
        return state.state;
    }

    getAttribute(key, attribute) {
        const entityId = this.getStructure()[key];
        const state = this.getStates()[entityId];
        return state.attributes[attribute];
    }

    getMin() {
        return Number(this.getState('min'));
    }

    getMinExtreme() {
        return Number(this.getAttribute('min', 'min'));
    }

    getMinId() {
        return this.getStructure()['min'];
    }

    getMinStep() {
        return Number(this.getAttribute('min', 'step'));
    }

    getMax() {
        return Number(this.getState('max'));
    }

    getMaxExtreme() {
        return Number(this.getAttribute('max', 'max'));
    }

    getMaxId() {
        return this.getStructure()['max'];
    }

    getMaxStep() {
        return Number(this.getAttribute('max', 'step'));
    }

    getSeparation() {
        return this.getMinStep() + this.getMaxStep();
    }

    getTemp() {
        return Number(this.getState('temp'));
    }

    getTempId() {
        return this.getStructure()['temp'];
    }

    getUnits() {
        return this.getAttribute('temp', 'unit_of_measurement');
    }

    getTempDisplay() {
        const temp = this.getTemp().toFixed(1).toString();
        const units = this.getUnits();
        return temp + ' ' + units;
    }

    getMode() {
        return this.getState('mode');
    }

    getModeId() {
        return this.getStructure()['mode'];
    }

    getModes() {
        return this.getAttribute('mode', 'options');
    }

    getHPstate() {
        return this.getState('heatpump');
    }

    getHPId() {
        return this.getStructure()['heatpump'];
    }

    getRank() {
        return Number(this.getState('rank'));
    }

    isDominant() {
        return this.getRank() === 1;
    }

    getRankId() {
        return this.getStructure()['rank'];
    }

    getScriptId() {
        return this.getStructure()['script'];
    }

    getAction() {
        let action = "off";
        switch (this.getHPstate()) {
            case 'heat':
                action = "Heating";
                break;
            case 'cool':
                action = "Cooling";
                break;
            case 'off':
                if (this.getMode() !== "off") {
                    action = "Idle";
                } else { action = "Off" };
                break;
        }
        return action;
    }

}
