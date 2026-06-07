import { html } from 'lit';
import { repeat } from 'lit-html/directives/repeat.js';
import { HaMainComponent } from '../../shared-resources/base-classes/ha-main-component.js';
import {
    getHassFloors,
    filterEntityIdsForFloor,
    getHassFloorName,
    getUniqueAreaIds,
    filterEntityIdsForArea,
    getHassAreaName,
} from '../../shared-resources/util/hass-area-floor-util.js';
import styles from './main.styles.js';
import layoutStyles from './layout-styles.js';
import sharedStyles from '../../shared-resources/styles/shared-styles.js';

export class AudioCard extends HaMainComponent {

    _LABEL = "audio";

    static properties = {
        ...super.properties,
    }

    /*************************** lifecycle **************************************/


    hasChanges(oldHass, newHass, entityId) {
        return false;
    }

/************************************* Setting Structures ****************************/

    setStructure() {
        const floors = getHassFloors(this.getHass());
        Object.keys(floors).forEach((floorId) => {
            const filteredIds = filterEntityIdsForFloor(this.getHass(), this.getEntityIds(), floorId);
            if (filteredIds.size > 0) {
                const floorDictionary = {
                    name: getHassFloorName(this.getHass(), floorId),
                    structure: {},
                    entityIds: filteredIds,
                }
                this.addAreaStructure(floorDictionary);
                this.getStructure()[floorId] = floorDictionary;
            }
        })
    }

    addAreaStructure(floorDictionary) {
        const areaIds = getUniqueAreaIds(this.getHass(), floorDictionary.entityIds);
        areaIds.forEach((areaId) => {
            const filteredIds = filterEntityIdsForArea(this.getHass(), floorDictionary.entityIds, areaId);
            const areaDictionary = {
                name: getHassAreaName(this.getHass(), areaId),
                structure: {},
                entityIds: filteredIds,
            }
            floorDictionary.structure[areaId] = areaDictionary;
        })
    }

    initializeChoice() {
    }

    getTriggers() {
        return [];
    }


    /********************************* interactive logic **********************************/



    /************************* style and html ***********************************/

    getFloorDisplay(floorId) {
        const dictionary = this.getStructure()[floorId];
        return html`<div class="floor"> ${dictionary.name} </div>`
    }

    // generates panel content, based on currently selected floor.
    content() {
        const floorIds = Object.keys(this.getStructure()).sort();
        return html`${repeat(floorIds, (floorId) => floorId, (floorId) => this.getFloorDisplay(floorId))}`
    }

    // pull styles
    static styles = [sharedStyles, layoutStyles, styles];

    // return html
    render() {
        if (this.isInitialized()) {
            return html`
                <ha-card>
                    ${this.content()}
                </ha-card>
            `;
        }
    }

    // set card size parameters for ha
    getCardSize() {
        return 14
    }

    getGridOptions() {
        return {
            rows: 14,
            columns: 36,
            min_rows: 14,
            max_rows: 14
        }
    }

}