import { html } from 'lit';
import { HaMainComponent } from '../../shared-resources/base-classes/ha-main-component.js';
import {
    isSoloLight,
    hasLightChanges,
    hasClimateChanges,
    addLightStructure
} from '../../shared-resources/util/hass-util.js';
import styles from './main.styles.js';
import layoutStyles from './layout-styles.js';
import sharedStyles from '../../shared-resources/styles/shared-styles.js';
import "../../shared-resources/light-components/light-button/light-button.js";
import "../../shared-resources/climate-components/climate-button/climate-button.js";
import "../lighting/lighting.js";
import "../climate/climate.js";


export class BedroomKioskCard extends HaMainComponent {

    _LABEL = "bedroom_kiosk"

    _TYPELABELS = ["climate", "lighting"];

    _CLIMATEBUTTONKEYS = ["sensor", "mode", "heatpump"];

    _CLIMATEKEYS = ["min",
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

    _CLIMATEDIVISIONS = ["primary", "secondary"];

    _LIGHTCATEGORIES = ["basic_lighting", "special_lights"];

    static properties = {
        ...super.properties,
        _type: { state: true }
    }

    /*************************** lifecycle **************************************/


    hasChanges(oldHass, newHass, entityId) {
        if (this.hasLabel(entityId, 'lighting')) {
            return hasLightChanges(oldHass, newHass, entityId);
        } else if (this.hasLabel(entityId, 'climate')) {
            return hasClimateChanges(oldHass, newHass, entityId);
        }
        return false;
    }

    getTriggers() {
        return ['_type']
    }

/************************************* Setting Structures ****************************/

    setStructures() {
        this.setEntityIds();
        this.setStates();
        this.setStructure();
        this.initializeType();
    }

    setEntityIds() {
        this.entityIds = this.getEntityIdsWithLabel(this.getLabel());
    }

    setStructure() {
        this.getTypes().forEach((typeLabel) => {
            const theseIds = this.filterEntityIdsForLabel(this.getEntityIds(), typeLabel);
            const typeDictionary = {
                name: typeLabel,
                structure: {},
                entityIds: theseIds
            }
            this.addButtonInfo(typeDictionary);
            this.setTypeStructure(typeDictionary);
            this.getStructure()[typeLabel] = typeDictionary;
        })
    }

    addButtonInfo(typeDictionary) {
        switch (typeDictionary.name) {
            case 'lighting':
                const ids = typeDictionary.entityIds;
                const soloLightIds = [...ids].filter((entityId) => isSoloLight(this.getHass(), entityId));
                typeDictionary.buttonInfo = new Set(soloLightIds);
                break;
            case 'climate':
                const primaryIds = this.filterEntityIdsForLabel(typeDictionary.entityIds, "primary");
                let buttonIds = new Set();
                this.getClimateButtonKeys().forEach((key) => {
                    const newButtonIds = this.filterEntityIdsForLabel(primaryIds, key);
                    buttonIds = buttonIds.union(newButtonIds);
                })
                typeDictionary.buttonInfo = { structure: {}, entityIds: buttonIds };
                this.setClimateKeyStructure(typeDictionary.buttonInfo);
                break;
        }
    }

    setTypeStructure(typeDictionary) {
        switch (typeDictionary.name) {
            case 'climate':
                this.setClimateDivisionStructure(typeDictionary);
                break;
            case 'lighting':
                this.setSpecialLightStructure(typeDictionary);
                break;
        }
    }

    setClimateDivisionStructure(dictionary) {
        this.getClimateDivisions().forEach((division) => {
            const entityIds = this.filterEntityIdsForLabel(dictionary.entityIds, division);
            if (entityIds.size > 0) {
                dictionary.structure[division] = { structure: {}, entityIds: entityIds };
                if (division !== 'primary') {
                this.setClimateTieStructure(dictionary.structure[division]);
                }
                this.setClimateKeyStructure(dictionary.structure[division]);
            }
        })
    }

    setClimateTieStructure(dictionary) {
        if (Object.keys(dictionary.structure).length === 0) {
            const entityIds = this.filterEntityIdsForLabel(dictionary.entityIds, "tied");
            if (entityIds.size > 0) {
                dictionary.structure.tied = { structure: {}, entityIds: entityIds };
                this.setClimateKeyStructure(dictionary.structure.tied);
                const tieIds = this.filterEntityIdsForLabel(dictionary.entityIds, "tie");
                dictionary.structure.tie = { structure: {}, entityIds: tieIds };
                this.setClimateKeyStructure(dictionary.structure.tie);
            }
        }
    }

    setClimateKeyStructure(dictionary) {
        if (Object.keys(dictionary.structure).length === 0) {
            this.getClimateKeys().forEach((key) => {
                const entityIds = [...this.filterEntityIdsForLabel(dictionary.entityIds, key)];
                if (entityIds.length === 1) {
                    dictionary.structure[key] = entityIds[0];
                }
            })
        }
    }

    setSpecialLightStructure(lightDictionary) {
        this.getLightCategories().forEach((categoryLabel) => {
            const ids = this.filterEntityIdsForLabel(lightDictionary.entityIds, categoryLabel);
            const categoryDictionary = {
                structure: {},
                entityIds: ids
            }
            if (categoryLabel === 'basic_lighting') {
                this.setAreaStructure(categoryDictionary);
            } else {
                this.setLightStructure(categoryDictionary);
            }
            lightDictionary.structure[categoryLabel] = categoryDictionary;
        })
    }

    setLightStructure(lightDict) {
        addLightStructure(this.getHass(), lightDict);
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

    initializeType() {
        this.setType('lighting');
    }

    /************************* Type Selection Structure ***********************************************/

    getLabel() {
        return this._LABEL;
    }

    getTypes() {
        return this._TYPELABELS;
    }

    getType() {
        return this._type;
    }

    setType(type) {
        this._type = type;
    }

    isType(type) {
        return this.getType() === type;
    }

    getLightDictionary() {
        return this.getStructure()['lighting'];
    }

    getSoloLightIds() {
        return this.getLightDictionary()['buttonInfo'];
    }

    getLightIds() {
        return this.getLightDictionary()['entityIds'];
    }

    getLightStructure() {
        return this.getLightDictionary()['structure'];
    }

    getClimateButtonKeys() {
        return this._CLIMATEBUTTONKEYS;
    }

    getClimateKeys() {
        return this._CLIMATEKEYS;
    }

    getClimateDictionary() {
        return this.getStructure()['climate'];
    }

    getClimateButtonDictionary() {
        return this.getClimateDictionary()['buttonInfo'];
    }

    getClimateButtonIds() {
        return this.getClimateButtonDictionary()['entityIds'];
    }

    getClimateButtonStructure() {
        return this.getClimateButtonDictionary()['structure'];
    }

    getClimateIds() {
        return this.getClimateDictionary()['entityIds'];
    }

    getClimateStructure() {
        return this.getClimateDictionary()['structure'];
    }

    getClimateDivisions() {
        return this._CLIMATEDIVISIONS;
    }

    getLightCategories() {
        return this._LIGHTCATEGORIES;
    }

    /********************************* interactive logic **********************************/

    onClick(type) {
        this.setType(type);
    }

    /************************* style and html ***********************************/

    lightingButton() {
        return html`
            <lighting-button
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .isSelected = ${this.isType('lighting')}
                .entityIds = ${this.getSoloLightIds()}
                .title = ${'Lighting'}
                @select = ${() => this.onClick('lighting')}
            ></lighting-button>
        `
    }

    climateButton() {
        return html`
            <climate-button
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .isSelected = ${this.isType('climate')}
                .entityIds = ${this.getClimateButtonIds()}
                .structure = ${this.getClimateButtonStructure()}
                .title = ${'Climate'}
                @select = ${() => this.onClick('climate')}
            ></climate-button>
        `
    }

    buttonRow() {
        return [this.lightingButton(), this.climateButton()];
    }

    lightingPanel() {
        return html`
            <lighting-bedroom-panel
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .entityIds = ${this.getLightIds()}
                .structure = ${this.getLightStructure()}
                .callService = ${this._hass.callService}
            ></lighting-bedroom-panel>
            `
    }

    climatePanel() {
        return html`
            <climate-bedroom-panel
                .changedEntityIds = ${this.getCEIs()}
                .states = ${this.getStates()}
                .entityIds = ${this.getClimateIds()}
                .structure = ${this.getClimateStructure()}
                .callService = ${this._hass.callService}
            ></climate-bedroom-panel>
            `
    }

    content() {
        switch (this.getType()) {
            case 'lighting':
                return this.lightingPanel();
            case 'climate':
                return this.climatePanel();
        }
        return html``;
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
                        ${this.buttonRow()}
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