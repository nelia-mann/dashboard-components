import { html } from 'lit';
import { HaMainComponent } from '../../shared-resources/base-classes/ha-main-component.js';
import { keyed } from 'lit/directives/keyed.js';
import { repeat } from 'lit-html/directives/repeat.js';
import {
    getHassFloors,
    filterEntityIdsForFloor,
    getHassFloorName
} from '../../shared-resources/util/hass-area-floor-util.js';
import {
    hasLightChanges,
    addSpecialLightStructure,
    addLightButtonStructure
} from '../../shared-resources/util/hass-lighting-util.js';
import styles from './main.styles.js';
import layoutStyles from './layout-styles.js';
import sharedStyles from '../../shared-resources/styles/shared-styles.js';
import "../floor-panel/floor-panel.js";
import "../../shared-resources/light-components/light-button/light-button.js";

export class LightingCard extends HaMainComponent {

    _LABEL = "lighting";

    static properties = {
        ...super.properties,
        _floorId: { state: true }
    }

    /*************************** lifecycle **************************************/


    hasChanges(oldHass, newHass, entityId) {
        return hasLightChanges(oldHass, newHass, entityId);
    }

    getTriggers() {
        return ['_floorId']
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
                addLightButtonStructure(this.getHass(), floorDictionary)
                addSpecialLightStructure(this.getHass(), floorDictionary);
                this.getStructure()[floorId] = floorDictionary;
            }
        })
    }

    initializeChoice() {
        const floorIds = Object.keys(this.getStructure());
        this.setFloorId(floorIds[0]);
    }

    /************************* Floor Selection Structure ***********************************************/

    setFloorId(floorId) {
        this._floorId = floorId;
    }

    getFloorStructure(floorId) {
        return this.getStructure()[floorId].structure;
    }

    getFloorName(floorId) {
        return this.getStructure()[floorId].name;
    }

    getSoloLightIds(floorId) {
        return this.getStructure()[floorId].buttonInfo;
    }

    getFloorId() {
        return this._floorId
    }

    isFloor(floorId) {
        return this.getFloorId() === floorId;
    }

    getThisFloorStructure() {
        return this.getFloorStructure(this.getFloorId());
    }

    getThisFloorEntityIds() {
        return this.structure[this.getFloorId()].entityIds;
    }

    /********************************* interactive logic **********************************/

    onClick(floorId) {
        this.setFloorId(floorId);
    }

    /************************* style and html ***********************************/

    floorButton(floorId) {
        return html`
            <lighting-button
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .isSelected = ${this.isFloor(floorId)}
                .entityIds = ${this.getSoloLightIds(floorId)}
                .title = ${this.getFloorName(floorId)}
                @select = ${() => this.onClick(floorId)}
            ></lighting-button>
        `
    }

    // generates the list of floor buttons.
    floorButtons() {
        const floorIds = Object.keys(this.getStructure());
        return repeat(floorIds, (floorId) => floorId, floorId => this.floorButton(floorId));
    }

    // generates panel content, based on currently selected floor.
    content() {
        return keyed(this.getFloorId(), html`
            <floor-panel
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .structure = ${this.getThisFloorStructure()}
                .entityIds = ${this.getThisFloorEntityIds()}
                .callService=${this._hass.callService}
            ></floor-panel>
        `);
    }

    // pull styles
    static styles = [sharedStyles, layoutStyles, styles];

    // return html
    render() {
        if (this.isInitialized()) {
            return html`
                <ha-card>
                    ${this.content()}
                    <div class="button-row">
                        ${this.floorButtons()}
                    </div>
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