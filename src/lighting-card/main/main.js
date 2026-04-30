import { html } from 'lit';
import { HaMainComponent } from '../../shared-resources/base-classes/ha-main-component.js';
import { keyed } from 'lit/directives/keyed.js';
import { repeat } from 'lit-html/directives/repeat.js';
import {
    addLightStructure,
    hasLightChanges,
    isSoloLight
} from '../../shared-resources/util/hass-util.js';
import styles from './main.styles.js';
import layoutStyles from './layout-styles.js';
import sharedStyles from '../../shared-resources/styles/shared-styles.js';
import "../floor-panel/floor-panel.js";
import "../../shared-resources/light-components/light-button/light-button.js";

export class LightingCard extends HaMainComponent {

    _LABEL = "lighting";
    _CATEGORIES = ["basic_lighting", "special_lights"];

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

    setStructures() {
        console.log(this.getHass());
        // this.setEntityIds();
        // this.setStates();
        // this.setStructure();
        // this.initializeFloor();
    }

    setEntityIds() {
        this.entityIds = this.getEntityIdsWithLabel(this.getLabel());
    }

    setStates() {
        let states = {};
        this.getEntityIds().forEach((entityId) => {
            states[entityId] = this.getState(entityId);
        })
        this.states = states;
    }

    setStructure() {
        const floors = this.getHassFloors();
        Object.keys(floors).forEach((floorId) => {
            const filteredIds = this.filterEntityIdsForFloor(this.getEntityIds(), floorId);
            const soloLightIds = [...filteredIds].filter((entityId) => isSoloLight(this.getHass(), entityId));
            if (filteredIds.size > 0) {
                const floorDictionary = {
                    name: this.getHassFloorName(floorId),
                    structure: {},
                    entityIds: filteredIds,
                    soloLightIds: new Set(soloLightIds)
                }
                this.setSpecialStructure(floorDictionary);
                this.getStructure()[floorId] = floorDictionary;
            }
        })

    }

    setSpecialStructure(floorDictionary) {
        this.getCategories().forEach((categoryLabel) => {
            const ids = this.filterEntityIdsForLabel(floorDictionary.entityIds, categoryLabel);
            const categoryDictionary = {
                structure: {},
                entityIds: ids
            }
            if (categoryLabel === 'basic_lighting') {
                this.setAreaStructure(categoryDictionary);
            } else {
                this.setLightStructure(categoryDictionary);
            }
            floorDictionary.structure[categoryLabel] = categoryDictionary;
        })
    }

    setAreaStructure(categoryDictionary) {
        const areaIds = this.getUniqueAreaIds(categoryDictionary.entityIds);
        areaIds.forEach((areaId) => {
            const ids = this.filterEntityIdsForArea(categoryDictionary.entityIds, areaId);
            const areaDictionary = {
                name: this.getHassAreaName(areaId),
                structure: {},
                entityIds: ids
            };
            this.setLightStructure(areaDictionary);
            categoryDictionary.structure[areaId] = areaDictionary;
        })
    }

    setLightStructure(areaDict) {
        addLightStructure(this.getHass(), areaDict);
    }

    initializeFloor() {
        const structure = this.getStructure();
        const floorIds = Object.keys(structure);
        this.setFloorId(floorIds[0]);
    }

    /************************* Floor Selection Structure ***********************************************/

    setFloorId(floorId) {
        this._floorId = floorId;
    }

    getLabel() {
        return this._LABEL;
    }

    getCategories() {
        return this._CATEGORIES;
    }

    getFloorStructure(floorId) {
        return this.getStructure()[floorId].structure;
    }

    getFloorName(floorId) {
        return this.getStructure()[floorId].name;
    }

    getSoloLightIds(floorId) {
        return this.getStructure()[floorId].soloLightIds;
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
                    <div class="button-row">
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