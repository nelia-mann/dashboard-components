import { html } from 'lit';
import { HaMainComponent } from '../../shared-resources/base-classes/ha-main-component.js';
import { keyed } from 'lit/directives/keyed.js';
import { repeat } from 'lit-html/directives/repeat.js';
import {
    getState,
    hasClimateChanges,
    getEntityIdsWithLabel,
    addAreaStructure,
    filterEntityIdsForLabel
} from '../../shared-resources/util/hass-util.js';
import styles from './main.styles.js';
import layoutStyles from './layout-styles.js';
import sharedStyles from '../../shared-resources/styles/shared-styles.js';
import "../../shared-resources/climate-components/climate-button/climate-button.js";
import "../area-panel/area-panel.js";

export class ClimateCard extends HaMainComponent {

    _LABEL = "climate";
    _GENERALID = "general";
    _INCLUDEINIDS = ["living_room", "small_guest_room", "bedroom"];
    _KEYS = ["min", "max", "temp", "mode", "heatpump", "thermostat", "dominanthp", "tie_main"];
    _CLIMATEKEYS = ["temp", "mode", "heatpump"];
    _DOMID = "dominanthp";

    static properties = {
        ...super.properties,
        _areaId: { state: true }
    }

    /*************************** lifecycle **************************************/


    hasChanges(oldHass, newHass, entityId) {
        return hasClimateChanges(oldHass, newHass, entityId);
    }

    getTriggers() {
        return ['_areaId']
    }

/************************************* Setting Structures ****************************/

    setStructures() {
        this.setEntityIds();
        this.setStates();
        this.setAreaStructure();
        this.setClimateStructure();
        this.initializeArea();
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

    setAreaStructure() {
        addAreaStructure(this.getHass(), this.getStructure(), this.getEntityIds());
    }

    setClimateStructure() {
        let generalIds = this.getStructure()[this._GENERALID].entityIds;
        const filteredIds = [...filterEntityIdsForLabel(this.getHass(), generalIds, this._DOMID)];
        const domId = filteredIds[0];
        generalIds.delete(domId);
        delete this.getStructure()[this._GENERALID];
        Object.entries(this.getStructure()).forEach(([areaId, dictionary]) => {
            dictionary.entityIds.add(domId);
            dictionary.structure.climate = { structure: {}, entityIds: dictionary.entityIds };
            this.addKeyStructure(dictionary.structure.climate);
            this.addClimateIds(dictionary.structure.climate);
            if (this._INCLUDEINIDS.includes(areaId)) {
                dictionary.entityIds = dictionary.entityIds.union(generalIds);
                dictionary.structure.general = { structure: {}, entityIds: generalIds }
                this.addKeyStructure(dictionary.structure.general);
            }
        })
    }

    addKeyStructure(dictionary) {
        this._KEYS.forEach((key) => {
            const filteredIds = [... filterEntityIdsForLabel(this.getHass(), dictionary.entityIds, key)];
            if (filteredIds.length > 0) {
                if (filteredIds.length === 1) {
                    dictionary.structure[key] = filteredIds[0];
                } else {
                    dictionary.structure[key] = filteredIds;
                }
            }
        })
    }

    addClimateIds(dictionary) {
        let climateIds = new Set();
        this._CLIMATEKEYS.forEach((key) => {
            const filteredIds = filterEntityIdsForLabel(this.getHass(), dictionary.entityIds, key)
            climateIds = climateIds.union(filteredIds);
        })
        dictionary.climateIds = climateIds;
    }

    initializeArea() {
        const areaIds = Object.keys(this.getStructure());
        this.setAreaId(areaIds[0]);
    }

    /************************* Floor Selection Structure ***********************************************/

    setAreaId(areaId) {
        this._areaId = areaId;
    }

    getAreaId() {
        return this._areaId;
    }

    getLabel() {
        return this._LABEL;
    }

    isArea(areaId) {
        return areaId === this.getAreaId();
    }

    getAreaName(areaId) {
        return this.getStructure()[areaId].name;
    }

    getAreaClimate(areaId) {
        return this.getStructure()[areaId].structure.climate;
    }

    getAreaClimateEIs(areaId) {
        return this.getAreaClimate(areaId).climateIds;
    }

    getAreaClimateStructure(areaId) {
        return this.getAreaClimate(areaId).structure;
    }

    getAreaStructure() {
        return this.getStructure()[this.getAreaId()].structure;
    }

    getAreaEIs() {
        return this.getStructure()[this.getAreaId()].entityIds;
    }

    getThisAreaName() {
        return this.getStructure()[this.getAreaId()].name;
    }

    /********************************* interactive logic **********************************/

    onClick(areaId) {
        this.setAreaId(areaId);
    }

    /************************* style and html ***********************************/

    areaButton(areaId) {
        return html`
            <climate-button
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .isSelected = ${this.isArea(areaId)}
                .entityIds = ${this.getAreaClimateEIs(areaId)}
                .structure = ${this.getAreaClimateStructure(areaId)}
                .title = ${this.getAreaName(areaId)}
                @select = ${() => this.onClick(areaId)}
            ></climate-button>
        `
    }

    // generates the list of floor buttons.
    areaButtons() {
        const areaIds = Object.keys(this.getStructure());
        return repeat(areaIds, (areaId) => areaId, areaId => this.areaButton(areaId));
    }

    // generates panel content, based on currently selected floor.
    content() {
        return keyed(this.getAreaId(), html`
            <area-climate-panel
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .entityIds = ${this.getAreaEIs()}
                .structure = ${this.getAreaStructure()}
                .title = ${this.getThisAreaName()}
                .callService = ${this._hass.callService}
            ></area-climate-panel>
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
                        ${this.areaButtons()}
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
            columns: 27,
            min_rows: 8,
            max_rows: 8
        }
    }

}