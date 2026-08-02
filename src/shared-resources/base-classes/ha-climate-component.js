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
        return this.getStructure()[key];
    }

    getNumberState(key) {
        if (this.getEntityId(key)) {
            return Number(this.getStateState(this.getEntityId(key)));
        }
    }

    getNumberAttribute(key, attribute) {
        const value = this.getAttribute(this.getEntityId(key), attribute);
        if (typeof value === 'number') return value;
    }

    /*********************** thermostat / hygrostat items ********************************/

    getMainEntityId() {
        if (this.getEntityId('hp')) return this.getEntityId('hp');
        if (this.getEntityId('thermostat')) return this.getEntityId('thermostat');
        if (this.getEntityId('hygrostat')) return this.getEntityId('hygrostat');
    }

    getThisName() {
        return this.getName(this.getMainEntityId());
    }

    getTarget() {
        if (this.getEntityId('hygrostat')) return this.getAttribute(this.getMainEntityId(), 'humidity');
        return this.getAttribute(this.getMainEntityId(), 'temperature');
    }

    getMinExtreme() {
        if (this.getEntityId('hygrostat')) return this.getAttribute(this.getMainEntityId(), 'min_humidity');
        return this.getAttribute(this.getMainEntityId(), 'min_temp');
    }

    getMaxExtreme() {
        if (this.getEntityId('hygrostat')) return this.getAttribute(this.getMainEntityId(), 'max_humidity');
        return this.getAttribute(this.getMainEntityId(), 'max_temp');
    }

    getSeparation() {
        if (this.getEntityId('hygrostat')) return 1;
        return this.getAttribute(this.getMainEntityId(), 'target_temp_step');
    }

    getSensor() {
        if (this.getEntityId('hygrostat')) return this.getAttribute(this.getMainEntityId(), 'current_humidity');
        return this.getAttribute(this.getMainEntityId(), 'current_temperature');
    }

    getSensorUnits() {
        if (this.getEntityId('hygrostat')) return '%';
        return '\u00B0' + 'F';
    }

    getSensorDisplay() {
        const value = this.getSensor().toFixed(1).toString();
        const units = this.getSensorUnits();
        return value + ' ' + units;
    }

    getMode() {
        return this.getStateState(this.getMainEntityId());
    }

    getModes() {
        if (this.getEntityId('hygrostat')) return ['off', 'on'];
        const modes = [...this.getAttribute(this.getMainEntityId(), 'hvac_modes')];
        let index;
        if (modes.includes('heat_cool')) {
            index = modes.indexOf('auto');
            if (index > -1) {
                modes.splice(index, 1)
            }
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

    getActionDefault() {
        if (this.getMode() === 'off') return 'off';
        if (this.getTarget() > this.getSensor()) {
            return 'heating';
        } else return 'idle';
    }

    getAction() {
        let str;
        if (this.getEntityId('hygrostat')) {
            (str = this.getAttribute(this.getEntityId('hygrostat'), 'action'))
        } else {
            str = this.getAttribute(this.getMainEntityId(), 'hvac_action');
            if (!str) (str = this.getActionDefault());
        }
        (str === 'fan' || str === 'drying') && (str = 'venting');
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /************************ safe items *************************************/

    getSafeMin() {
        return this.getNumberState('safe_min');
    }

    getSafeMax() {
        return this.getNumberState('safe_max');
    }

    isSafe() {
        return (this.getStateState(this.getEntityId('safe_mode')) === 'on');
    }

    /******************************** rank and tie items ********************************/

    getRank() {
        return Number(this.getStateState(this.getEntityId('rank')));
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
        return this.getStateState(this.getEntityId('tie_main'));
    }

    getTieId() {
        return this.getEntityId('tie_main');
    }

    getTieOptions() {
        return this.getAttribute(this.getEntityId('tie_main'), 'options');
    }

    getTieAction() {
        let str = this.getAttribute(this.getEntityId('tie'), 'hvac_action');
        (str === 'fan') && (str = 'venting');
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    getTieMode() {
        return this.getStateState(this.getEntityId('tie'));
    }

    /***************************** offset ****************************************/

    getOffsetId() {
        return this.getEntityId('offset');
    }

    getOffset() {
        return this.getNumberState('offset');
    }

    getMinOffset() {
        return this.getNumberAttribute('offset', 'min');
    }

    getMaxOffset() {
        return this.getNumberAttribute('offset', 'max');
    }

}
