import { html } from 'lit';
import { repeat } from 'lit-html/directives/repeat.js';
import { HaMainComponent } from '../../shared-resources/base-classes/ha-main-component.js';
import styles from './main.styles.js';
import layoutStyles from './layout-styles.js';
import sharedStyles from '../../shared-resources/styles/shared-styles.js';


export class BasementKioskCard extends HaMainComponent {

    _LABEL = "basement_kiosk";
    _LIGHTLABELS = {
        basic_lighting: "basic lighting",
        leds: "LED Lighting"
    };
    _OPTIONLABELS = { lighting: "lighting" };

    static properties = {
        ...super.properties,
        _option: { state: true },
    }

    constructor() {
        super();
        this._option = "lighting";
    }

    /******************************* lifecycle *****************************/

    hasChanges(oldHass, newHass, entityId) {
        return false;
    }

    getTriggers() {
        return ["_option"]
    }

    /******************************* Setting Structures ***********************/

    setOption(option) {
        this._option = option;
    }

    setStructures() {
    }


    /***************************** getter logic ***************************/


    /************************** interactive logic ***************************/

    /******************************* html/style logic ************************/

    static styles = [styles, layoutStyles, sharedStyles];

    render() {
        if (true) {
            return html`
                <ha-card>
                    <div class="content"> Placeholder </div>
                </ha-card>
            `
        }
    }

    getCardSize() {
        return 10;
    }

    getGridOptions() {
        return {
            rows: 14,
            columns: 30,
            min_rows: 14,
            max_rows: 14
        }
    }

}