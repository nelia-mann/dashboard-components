import { html } from 'lit';
import { HaMainComponent } from '../../shared-resources/base-classes/ha-main-component.js';
import {
    addClimateDivisionStructure,
    addClimateButtonStructure,
    hasClimateChanges
} from '../../shared-resources/util/hass-climate-util.js';
import {
    hasLightChanges,
    addSpecialLightStructure,
    addLightButtonStructure
} from '../../shared-resources/util/hass-lighting-util.js';
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
                addLightButtonStructure(this.getHass(), typeDictionary)
                break;
            case 'climate':
                addClimateButtonStructure(this.getHass(), typeDictionary)
                break;
        }
    }

    setTypeStructure(typeDictionary) {
        switch (typeDictionary.name) {
            case 'climate':
                addClimateDivisionStructure(this.getHass(), typeDictionary);
                break;
            case 'lighting':
                addSpecialLightStructure(this.getHass(), typeDictionary);
                break;
        }
    }

    initializeChoice() {
        this.setType('lighting');
    }

    /************************* Type Selection Structure ***********************************************/


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