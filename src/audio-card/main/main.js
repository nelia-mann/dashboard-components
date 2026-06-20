import { html } from 'lit';
import { HaMainComponent } from '../../shared-resources/base-classes/ha-main-component.js';
import {
    getHassFloors,
    filterEntityIdsForFloor,
    getHassFloorName,
    getUniqueAreaIds,
    filterEntityIdsForArea,
    getHassAreaName,
} from '../../shared-resources/util/hass-area-floor-util.js';
import {
    hasAudioChanges
} from '../../shared-resources/util/hass-audio-util.js';
import styles from './main.styles.js';
import layoutStyles from './layout-styles.js';
import sharedStyles from '../../shared-resources/styles/shared-styles.js';
import '../../shared-resources/audio-components/library-panel/library-panel.js';
import '../players/players-panel.js';

export class AudioCard extends HaMainComponent {

    _LABEL = "audio";

    static properties = {
        ...super.properties,
    }

    /*************************** lifecycle **************************************/


    hasChanges(oldHass, newHass, entityId) {
        return hasAudioChanges(oldHass, newHass, entityId);
    }

/************************************* Setting Structures ****************************/

    setStructure() {
        const floors = getHassFloors(this.getHass());
        const floorIds = Object.keys(floors).sort((key1, key2) => {
            const level1 = floors[key1].level;
            const level2 = floors[key2].level;
            return (level2 - level1)
        })
        let sortedList = [];
        floorIds.forEach((floorId) => {
            const filteredIds = [...filterEntityIdsForFloor(this.getHass(), this.getEntityIds(), floorId)].sort();
            sortedList = [...sortedList, ...filteredIds];
            this.getStructure().sorted = sortedList;
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
                    <players-panel
                        .changedEntityIds=${this.getCEIs()}
                        .entityIds=${this.getEntityIds()}
                        .states=${this.getStates()}
                        .structure=${this.getStructure()}
                        .callService=${this.getHass().callService}
                    ></players-panel>
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