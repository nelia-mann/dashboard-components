import { html } from 'lit';
import { HaMainComponent } from '../../shared-resources/base-classes/ha-main-component.js';
import { keyed } from 'lit/directives/keyed.js';
import { repeat } from 'lit-html/directives/repeat.js';
import {
    addClimateDivisionStructure,
    addClimateButtonStructure,
    hasClimateChanges
} from '../../shared-resources/util/hass-climate-util.js';
import styles from './main.styles.js';
import layoutStyles from './layout-styles.js';
import sharedStyles from '../../shared-resources/styles/shared-styles.js';
import "../../shared-resources/climate-components/climate-button.js";
import "../area-panel/area-panel.js";

export class ClimateCard extends HaMainComponent {

    _LABEL = "climate";
    _REGIONS = ["living_room", "guest_room", "bedroom", "office"];

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

    setStructure() {
        this.getRegions().forEach((region) => {
            const entityIds = this.filterEntityIdsForLabel(this.getEntityIds(), region);
            this.getStructure()[region] = { structure: {}, entityIds: entityIds };
            addClimateDivisionStructure(this.getHass(), this.getStructure()[region]);
            addClimateButtonStructure(this.getHass(), this.getStructure()[region]);
        })
    }

    getMode(structure) {
        return this.getState(structure.mode);
    }

    getRank(structure) {
        return Number(this.getState(structure.rank));
    }

    initializeChoice() {
        const regions = Object.keys(this.getStructure());
        let first = regions[0];
        regions.forEach((region) => {
            if (region === first) return;
            const firstPrimaryStructure = this.getStructure()[first].structure.primary.structure;
            const firstMode = this.getMode(firstPrimaryStructure);
            const firstRank = this.getRank(firstPrimaryStructure);
            const primaryStructure = this.getStructure()[region].structure.primary.structure;
            const mode = this.getMode(primaryStructure);
            const rank = this.getRank(primaryStructure);
            if (mode !== 'off' && (rank < firstRank) || firstMode == 'off') {
                first = region;
            }
        })
        this.setRegion(first);
    }

    /************************* Floor Selection Structure ***********************************************/

    getRegions() {
        return this._REGIONS;
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
        return this.getStructure()[region].buttonInfo;
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