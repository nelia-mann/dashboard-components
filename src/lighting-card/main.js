import { html, css } from 'lit';
import { HaMainComponent } from '../shared-resources/base-classes/ha-main-component.js';
import { keyed } from 'lit/directives/keyed.js';
import { repeat } from 'lit-html/directives/repeat.js';
import {
    getHassFloors,
    filterEntityIdsForFloor,
    getHassFloorName
} from '../shared-resources/util/hass-area-floor-util.js';
import {
    hasLightChanges,
    addSpecialLightStructure,
    addLightButtonStructure
} from '../shared-resources/util/lighting-util/hass-lighting-util.js';
import layoutStyles from './layout-styles.js';
import sharedStyles from '../shared-resources/styles/shared-styles.js';
import "./floor-panel.js";
import "../shared-resources/light-components/light-button.js";

export class LightingCard extends HaMainComponent {

    _LABEL = "lighting";

    static properties = {
        ...super.properties,
        _floorId: { state: true }
    }

/********************************************** lifecycle *************************************************************/

    hasChanges(oldHass, newHass, entityId) {
        return hasLightChanges(oldHass, newHass, entityId);
    }

    getTriggers() {
        return ['_floorId']
    }

/********************************************** setting structures ****************************************************/

    setStructure() {
        console.log(this.getEntityIds());
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

/*********************************** floor selection structure ********************************************************/

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

/********************************************** interactive logic *****************************************************/

    onClick(floorId) {
        this.setFloorId(floorId);
    }

/********************************************** html logic ************************************************************/

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
            />`);
    }

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

/********************************************** style logic ***********************************************************/

    // pull styles
    static styles = [sharedStyles, layoutStyles, css`
    
        ha-card {
            padding: var(--ha-card-padding, 10px);
            padding-top: var(--ha-card-padding-top, 5px);
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-between;
            align-items: center;
            height: var(--ha-card-height, 570px);
            width: var(--ha-card-width, 900px);
        }

        .button-row {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-around;
            align-items: center;
            width: var(--button-row-width, 100%);
            height: var(--button-row-height, 50px);
        }        

    `];

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