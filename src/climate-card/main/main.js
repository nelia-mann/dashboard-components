import { html } from 'lit';
import { HaMainComponent } from '../../shared-resources/base-classes/ha-main-component.js';
import { keyed } from 'lit/directives/keyed.js';
import { repeat } from 'lit-html/directives/repeat.js';
import {
    getState,
    hasClimateChanges,
    getEntityIdsWithLabel,
    filterEntityIdsForLabel
} from '../../shared-resources/util/hass-util.js';
import styles from './main.styles.js';
import layoutStyles from './layout-styles.js';
import sharedStyles from '../../shared-resources/styles/shared-styles.js';
import "../../shared-resources/climate-components/climate-button/climate-button.js";
import "../area-panel/area-panel.js";

export class ClimateCard extends HaMainComponent {

    _LABEL = "climate";
    _REGIONS = ["living_room", "guest_room", "bedroom", "office"];
    _DIVISIONS = ["primary", "secondary", "aux"];
    _AUXELEMENTS = ["fireplace", "fan", "laundry_heater"];
    _KEYS = ["min",
        "max",
        "sensor",
        "mode",
        "heatpump",
        "action",
        "tie_main",
        "rank",
        "script",
        "switch",
        "name",
        "safe_max",
        "safe_min",
        "offset",
        ];
    _BUTTONKEYS = ["sensor", "mode", "heatpump"];

    static properties = {
        ...super.properties,
        _region: { state: true }
    }

    /*************************** lifecycle **************************************/


    hasChanges(oldHass, newHass, entityId) {
        return hasClimateChanges(oldHass, newHass, entityId);
    }

    getTriggers() {
        return ['_region']
    }

/************************************* Setting Structures ****************************/

    setStructures() {
        this.setEntityIds();
        this.setStates();
        this.setStructure();
        this.initializeRegion();
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

    setStructure() {
        this.getRegions().forEach((region) => {
            const entityIds = filterEntityIdsForLabel(this.getHass(), this.getEntityIds(), region);
            this.getStructure()[region] = { structure: {}, entityIds: entityIds };
            this.setDivisionStructure(this.getStructure()[region]);
            this.setButtonStructure(this.getStructure()[region]);
        })
    }

    setDivisionStructure(dictionary) {
        this.getDivisions().forEach((division) => {
            const entityIds = filterEntityIdsForLabel(this.getHass(), dictionary.entityIds, division);
            if (entityIds.size > 0) {
                dictionary.structure[division] = { structure: {}, entityIds: entityIds };
                if (division !== 'primary') {
                    this.setAuxStructure(dictionary.structure[division]);
                    this.setTieStructure(dictionary.structure[division]);
                }
                this.setKeyStructure(dictionary.structure[division]);
            }
        })
    }

    setAuxStructure(dictionary) {
        this.getAuxElements().forEach((element) => {
            const entityIds = filterEntityIdsForLabel(this.getHass(), dictionary.entityIds, element);
            if (entityIds.size > 0) {
                dictionary.structure[element] = { structure: {}, entityIds: entityIds };
                this.setTieStructure(dictionary.structure[element]);
                this.setKeyStructure(dictionary.structure[element]);
            }
        })
    }

    setTieStructure(dictionary) {
        if (Object.keys(dictionary.structure).length === 0) {
            const entityIds = filterEntityIdsForLabel(this.getHass(), dictionary.entityIds, "tied");
            if (entityIds.size > 0) {
                dictionary.structure.tied = { structure: {}, entityIds: entityIds };
                this.setKeyStructure(dictionary.structure.tied);
                const tieIds = filterEntityIdsForLabel(this.getHass(), dictionary.entityIds, "tie");
                dictionary.structure.tie = { structure: {}, entityIds: tieIds };
                this.setKeyStructure(dictionary.structure.tie);
            }
        }
    }

    setKeyStructure(dictionary) {
        if (Object.keys(dictionary.structure).length === 0) {
            this.getKeys().forEach((key) => {
                const entityIds = [...filterEntityIdsForLabel(this.getHass(), dictionary.entityIds, key)];
                if (entityIds.length === 1) {
                    dictionary.structure[key] = entityIds[0];
                }
            })
        }
    }

    setButtonStructure(dictionary) {
        const primaryIds = filterEntityIdsForLabel(this.getHass(), dictionary.entityIds, "primary");
        let buttonIds = new Set();
        this.getButtonKeys().forEach((key) => {
            const newButtonIds = filterEntityIdsForLabel(this.getHass(), primaryIds, key);
            buttonIds = buttonIds.union(newButtonIds);
        })
        dictionary.button = { structure: {}, entityIds: buttonIds };
        this.setKeyStructure(dictionary.button);
    }

    initializeRegion() {
        const regions = Object.keys(this.getStructure());
        let first = regions[0];
        regions.forEach((region) => {
            if (region === first) return;
            const firstPrimaryStructure = this.getStructure()[first].structure.primary.structure;
            const firstModeId = firstPrimaryStructure.mode;
            const firstRankId = firstPrimaryStructure.rank;
            const firstMode = this.getStates()[firstModeId].state;
            const firstRank = Number(this.getStates()[firstRankId].state);
            const primaryStructure = this.getStructure()[region].structure.primary.structure;
            const modeId = primaryStructure.mode;
            const rankId = primaryStructure.rank;
            const mode = this.getStates()[modeId].state;
            const rank = Number(this.getStates()[rankId].state);
            if (mode !== 'off' && (rank < firstRank) || firstMode == 'off') {
                first = region;
            }
        })
        this.setRegion(first);
    }

    /************************* Floor Selection Structure ***********************************************/

    getLabel() {
        return this._LABEL;
    }

    getRegions() {
        return this._REGIONS;
    }

    getDivisions() {
        return this._DIVISIONS;
    }

    getAuxElements() {
        return this._AUXELEMENTS;
    }

    getKeys() {
        return this._KEYS;
    }

    getButtonKeys() {
        return this._BUTTONKEYS;
    }

    setRegion(region) {
        this._region = region;
    }

    getRegion() {
        return this._region;
    }

    isRegion(region) {
        return region=== this.getRegion();
    }

    getButton(region) {
        return this.getStructure()[region].button;
    }

    getButtonIds(region) {
        return this.getButton(region).entityIds;
    }

    getButtonStructure(region) {
        return this.getButton(region).structure;
    }

    getRegionStructure() {
        return this.getStructure()[this.getRegion()].structure;
    }

    getRegionEIs() {
        return this.getStructure()[this.getRegion()].entityIds;
    }

    /********************************* interactive logic **********************************/

    onClick(region) {
        this.setRegion(region);
    }

    /************************* style and html ***********************************/

    regionButton(region) {
        return html`
            <climate-button
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .isSelected = ${this.isRegion(region)}
                .entityIds = ${this.getButtonIds(region)}
                .structure = ${this.getButtonStructure(region)}
                .title = ${this.makePretty(region)}
                @select = ${() => this.onClick(region)}
            ></climate-button>
        `
    }

    // generates the list of floor buttons.
    regionButtons() {
        const regions = Object.keys(this.getStructure()).sort();
        return repeat(regions, (region) => region, region => this.regionButton(region));
    }

    // generates panel content, based on currently selected floor.
    content() {
        return keyed(this.getRegion(), html`
            <area-climate-panel
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .entityIds = ${this.getRegionEIs()}
                .structure = ${this.getRegionStructure()}
                .regionName = ${this.getRegion()}
                .callService = ${this.getHass().callService}
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
                        ${this.regionButtons()}
                    </div>
                </ha-card>
            `;
        }
    }

    // set card size parameters for ha
    getCardSize() {
        return 15
    }

    getGridOptions() {
        return {
            rows: 15,
            columns: 36,
            min_rows: 15,
            max_rows: 15
        }
    }

}