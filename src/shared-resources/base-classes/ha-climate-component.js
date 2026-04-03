import { HaSubComponent } from './ha-subcomponent.js';

export class HaClimateComponent extends HaSubComponent {

/* assumes a "states" object, and a "structure" object.  The "structure" object is a dictionary whose values are
entity ids, and whose keys are in the set:

min: minimum temp setting.  (input_number, includes attributes step, min, and max)

max: maximum temp settting.  (input_number, includes attributes step, min, and max)

temp: current temperature.  (sensor value, includes attribute unit_of_measurement)

mode: current climate mode.  (input_select, with options "heat", "cool", "heat-cool", and "off")

heatpump: heatpump.  (select, with options "heat", "cool", "off")

rank: current ranking for climate priority.  (input_number, an integer from 1 to 4.)

script: the script to reset heatpump ranking.  (takes as a variable the heatpump we want to be first.)

action: the current action of the climate entity

*/


    /********************* basics (protection for lack of key existence) *************/

    getEntityId(key) {
        if (this.getStructure().tied) {
            return this.getStructure().tied.structure[key];
        } else {
            return this.getStructure()[key];
        }
    }

    getState(key) {
        if (this.getEntityId(key)) {
            const state = this.getStates()[this.getEntityId(key)];
            return state.state;
        }
    }

    getNumberState(key) {
        if (this.getEntityId(key)) {
            const state = this.getStates()[this.getEntityId(key)];
            return Number(state.state);
        }
    }

    getAttribute(key, attribute) {
        if (this.getEntityId(key)) {
            const state = this.getStates()[this.getEntityId(key)];
            return state.attributes[attribute];
        }
    }

    getNumberAttribute(key, attribute) {
        if (this.getEntityId(key)) {
            const state = this.getStates()[this.getEntityId(key)];
            return Number(state.attributes[attribute]);
        }
    }

    getTieEntityId(key) {
        if (this.getStructure().tie) {
            return this.getStructure().tie.structure[key];
        }
    }

    getTieState(key) {
        if (this.getTieEntityId(key)) {
            const state = this.getStates()[this.getTieEntityId(key)];
            return state.state;
        }
    }

    /*********************** min/max items ********************************/

    getMinId() {
        return this.getEntityId('min');
    }

    getMin() {
        return this.getNumberState('min');
    }

    getMinStep() {
        return this.getNumberAttribute('min', 'step');
    }

    getMaxId() {
        return this.getEntityId('max');
    }

    getMax() {
        return this.getNumberState('max');
    }

    getMaxStep() {
        return this.getNumberAttribute('max', 'step');
    }

    getMinExtreme() {
        const minmin = this.getNumberAttribute('min', 'min');
        const maxmin = this.getNumberAttribute('max', 'min');
        if (minmin && maxmin) {
            return Math.min(minmin, maxmin);
        } else if (minmin) {
            return minmin;
        } else if (maxmin) {
            return maxmin;
        }
    }

    getMaxExtreme() {
        const minmax = this.getNumberAttribute('min', 'max');
        const maxmax = this.getNumberAttribute('max', 'max');
        if (minmax && maxmax) {
            return Math.max(minmax, maxmax);
        } else if (minmax) {
            return minmax;
        } else if (maxmax) {
            return maxmax;
        }
    }

    getSeparation() {
        let minStep = this.getMinStep();
        let maxStep = this.getMaxStep();
        if (minStep && maxStep) {
            return this.getMinStep() + this.getMaxStep();
        } else return 0;
    }

    /******************** sensor items *************************************/

    getSensor() {
        return this.getNumberState('sensor');
    }

    getSensorId() {
        return this.getEntityId('sensor');
    }

    getSensorUnits() {
        return this.getAttribute('sensor', 'unit_of_measurement');
    }

    getSensorDisplay() {
        const value = this.getSensor().toFixed(1).toString();
        const units = this.getSensorUnits();
        return value + ' ' + units;
    }

    /******************* temp items *******************************/

    getTemp() {
        return this.getNumberState('sensor');
    }

    getTempId() {
        return this.getEntityId('sensor');
    }

    getUnits() {
        return this.getAttribute('sensor', 'unit_of_measurement');
    }

    getTempDisplay() {
        const temp = this.getTemp().toFixed(1).toString();
        const units = this.getUnits();
        return temp + ' ' + units;
    }

    /************************ mode and action items ************************/

    getMode() {
        return this.getState('mode');
    }

    getModeId() {
        return this.getEntityId('mode');
    }

    getModes() {
        return this.getAttribute('mode', 'options');
    }

    getHPstate() {
        return this.getState('heatpump');
    }

    getHPId() {
        return this.getEntityId('heatpump');
    }

    getActionFromHP(hpState, mode) {
        let action = "off";
        switch (hpState) {
            case 'heat':
                action = "Heating";
                break;
            case 'cool':
                action = "Cooling";
                break;
            case 'off':
                if (mode !== "off") {
                    action = "Idle";
                } else { action = "Off" };
                break;
        }
        return action;
    }

    getActionDirect() {
        let result = this.getState('action');
        if (result) {
            return result.charAt(0).toUpperCase() + result.slice(1);
        }
    }

    getActionId() {
        return this.getEntityId('action');
    }

    getAction() {
        if (this.getActionDirect()) {
            return this.getActionDirect();
        } else return this.getActionFromHP(this.getHPstate(), this.getMode());
    }

    getTieMode() {
        return this.getTieState('mode');
    }

    getTieAction() {
        return this.getActionFromHP(this.getTieState('heatpump'), this.getTieMode());
    }

    /******************************** rank and tie items ********************************/

    getRank() {
        return Number(this.getState('rank'));
    }

    isDominant() {
        return this.getRank() === 1;
    }

    getRankId() {
        return this.getEntityId('rank');
    }

    getScriptId() {
        return this.getEntityId('script');
    }

    getTie() {
        return this.getState('tie_main');
    }

    getTieId() {
        return this.getEntityId('tie_main');
    }

    getTieOptions() {
        return this.getAttribute('tie_main', 'options');
    }

}
