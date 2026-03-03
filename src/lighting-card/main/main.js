import { html } from 'lit';
import { HaMainComponent } from '../../shared-resources/base-classes/ha-main-component.js';
import { keyed } from 'lit/directives/keyed.js';
import { repeat } from 'lit-html/directives/repeat.js';
import {
    getState,
    addFloorStructure,
    addLightStructure,
    hasThemeChanges,
    hasLightChanges,
    getEntityIdsWithLabel,
    addAreaStructure,
} from '../../shared-resources/util/hass-util.js';
import styles from './main.styles.js';
import layoutStyles from './layout-styles.js';
import sharedStyles from '../../shared-resources/styles/shared-styles.js';
import "../../shared-resources/light-components/floor-panel/floor-panel.js";
import "../../shared-resources/light-components/light-button/light-button.js";

export class LightingCard extends HaMainComponent {

    _LABEL = "lighting";

    static properties = {
        ...super.properties,
        _floorId: { state: true }
    }

    /*************************** lifecycle **************************************/


    hasChanges(oldHass, newHass, entityId) {
        return hasThemeChanges(oldHass, newHass, entityId) || hasLightChanges(oldHass, newHass, entityId);
    }

    getTriggers() {
        return ['_floorId']
    }

/************************************* Setting Structures ****************************/

    setStructures() {
        this.setEntityIds();
        this.setStates();
        this.setFloorStructure();
        this.setAreaStructure();
        this.setLightStructure();
        this.initializeFloor();
    }

    setEntityIds() {
        this.entityIds = getEntityIdsWithLabel(this.getHass(), this.getLabel());
    }

    setStates() {
        let states = {};
        this.getEntityIds().forEach((entityId) => {
            states[entityId] = getState(this.getHass(), entityId);
        })
        this.states = states;
    }

    setFloorStructure() {
        addFloorStructure(this.getHass(), this.getStructure(), this.getEntityIds());
    }

    setAreaStructure() {
        Object.values(this.structure).forEach((floorDictionary) => {
            addAreaStructure(this.getHass(), floorDictionary)
        })
    }

    setLightStructure() {
        Object.values(this.structure).forEach((floorDict) => {
            let floorStructure = floorDict.structure;
            Object.values(floorStructure).forEach((areaDict) => {
                addLightStructure(this.getHass(), areaDict);
            })
        })
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
        return 8;
    }

    getGridOptions() {
        return {
            rows: 8,
            columns: 24,
            min_rows: 8,
            max_rows: 8
        }
    }

}