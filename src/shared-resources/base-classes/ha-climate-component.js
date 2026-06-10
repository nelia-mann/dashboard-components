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

    getTieEntityId() {
        if (this.getStructure().tie) {
            return this.getStructure().tie.structure['hp'];
        }
    }

    getTieState() {
        if (this.getTieEntityId()) {
            const state = this.getStates()[this.getTieEntityId('hp')];
            return state.state;
        }
    }

    getTieAttribute(attribute) {
        if (this.getTieEntityId()) {
            const state = this.getStates()[this.getTieEntityId('hp')];
            return state.attributes[attribute];
        }        
    }

    /************************* hp items ***********************************/

    getHPMode() {
        return this.getState('hp');
    }

    getHPModes() {
        const modes = [...this.getAttribute('hp', 'hvac_modes')];
        let index = modes.indexOf('heat_cool');
        if (index > -1) {
            modes.splice(index, 1)
        }
        index = modes.indexOf('dry');
        if (index > -1) {
            modes.splice(index, 1)
        }
        index = modes.indexOf('fan_only');
        if (index > -1) {
            modes.splice(index, 1)
        }
        return modes;
    }

    /*********************** hygrostat items ******************************/



    /*********************** min/max items ********************************/

    getTarget() {
        if (this.getEntityId('hp')) return this.getNumberAttribute('hp', 'temperature');
        if (this.getEntityId('thermostat')) return this.getNumberAttribute('thermostat', 'temperature');
        if (this.getEntityId('hygrostat')) return this.getNumberAttribute('hygrostat', 'humidity');
    }

    getMinExtreme() {
        if (this.getEntityId('hp')) return this.getNumberAttribute('hp', 'min_temp');
        if (this.getEntityId('thermostat')) return this.getNumberAttribute('thermostat', 'min_temp');
        if (this.getEntityId('hygrostat')) return this.getNumberAttribute('hygrostat', 'min_humidity');
    }

    getMaxExtreme() {
        if (this.getEntityId('hp')) return this.getNumberAttribute('hp', 'max_temp');
        if (this.getEntityId('thermostat')) return this.getNumberAttribute('thermostat', 'max_temp');
        if (this.getEntityId('hygrostat')) return this.getNumberAttribute('hygrostat', 'max_humidity');
    }

    getSeparation() {
        let value;
        if (this.getEntityId('hp')) (value = this.getNumberAttribute('hp', 'target_temp_step'));
        if (this.getEntityId('thermostat')) (value = this.getNumberAttribute('thermostat', 'target_temp_step'));
        if (!value) {
            return 1;
        } else return value;
    }

    getSafeMin() {
        return this.getNumberState('safe_min');
    }

    getSafeMax() {
        return this.getNumberState('safe_max');
    }

    /******************** sensor items *************************************/

    getSensor() {
        if (this.getEntityId('hp')) return this.getNumberAttribute('hp', 'current_temperature');
        if (this.getEntityId('thermostat')) return this.getNumberAttribute('thermostat', 'current_temperature');
        if (this.getEntityId('hygrostat')) return this.getNumberAttribute('hygrostat', 'current_humidity');
    }

    getSensorUnits() {
        if ((this.getEntityId('hp')) || (this.getEntityId('thermostat'))) return '\u00B0' + 'F';
        if (this.getEntityId('hygrostat')) return '%';
    }

    getSensorDisplay() {
        const value = this.getSensor().toFixed(1).toString();
        const units = this.getSensorUnits();
        return value + ' ' + units;
    }

    /************************ mode and action items ************************/

    getMode() {
        if (this.getEntityId('hp')) return this.getState('hp');
        if (this.getEntityId('thermostat')) return this.getState('thermostat');
        if (this.getEntityId('hygrostat')) return this.getState('hygrostat');
    }

    isSafe() {
        return (this.getState('safe_mode') === 'on');
    }

    getModeId() {
        return this.getEntityId('mode');
    }

    getModes() {
        if (this.getEntityId('hp')) return this.getHPModes();
        if (this.getEntityId('thermostat')) return this.getAttribute('thermostat', 'hvac_modes');
        if (this.getEntityId('hygrostat')) return ['off', 'on'];
    }

    getActionForMatter() {
        if (this.getMode() === 'off') return 'off';
        if (this.getTarget() > this.getSensor()) {
            return 'heating';
        } else return 'idle';
    }

    getAction() {
        let str;
        if (this.getEntityId('hp')) (str = this.getAttribute('hp', 'hvac_action'));
        if (this.getEntityId('thermostat')) (str = this.getAttribute('thermostat', 'hvac_action'));
        if (this.getEntityId('hygrostat')) (str = this.getAttribute('hygrostat', 'action'));
        (str === 'fan' || str === 'drying') && (str = 'venting');
        if (!str) (str = this.getActionForMatter());
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    getTieMode() {
        return this.getTieState();
    }

    getTieAction() {
        let str = this.getTieAttribute('hvac_action');
        (str === 'fan') && (str = 'venting');
        return str.charAt(0).toUpperCase() + str.slice(1);
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

    getOffsetId() {
        return this.getEntityId('offset');
    }

    /***************************** offset ****************************************/

    getOffset() {
        return this.getNumberState('offset');
    }

    getMinOffset() {
        return this.getNumberAttribute('offset', 'min');
    }

    getMaxOffset() {
        return this.getNumberAttribute('offset', 'max');
    }

    /****************************** name *****************************************/

    getName() {
        if (this.getEntityId('hp')) return this.getAttribute('hp', 'friendly_name');
        if (this.getEntityId('thermostat')) return this.getAttribute('thermostat', 'friendly_name');
        if (this.getEntityId('hygrostat')) return this.getAttribute('hygrostat', 'friendly_name');
    }

}
