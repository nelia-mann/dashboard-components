import { html, LitElement } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { repeat } from 'lit-html/directives/repeat.js';
import styles from './main.styles.js';
import sharedStyles from './shared-styles.js';
import { rgba } from './color-util.js';
import './light-button.js';

export class MainCard extends LitElement {

    // private properties
    _hass;
    _OPTIONS = ["lighting", "climate"];
    _entityIds = [];
    _floorId = "basement";
    _structure = {};

    // internal reactive states
    static get properties() {
        return {
            _option: { state: true },
        };
    }

    /******************************* lifecycle *****************************/

    constructor() {
        super();
        this._option = "lighting";
    }

    // establish config information for card
    setConfig() {
    }

    // gets the hass, and then creates the light bundles to be passed around.
    set hass(hass) {
        this._hass = hass;
        this.setStructures();
        console.log(this._entityIds)
    }

    /******************************* structure logic ***********************/

    getAreaIds() {
        const areas = this._hass.areas;
        const areaIds = Object.keys(areas).filter((areaId) => {
            return areas[areaId].floor_id === this._floorId;
        })
        return areaIds;
    }

    setEntityIds() {
        const entities = this._hass.entities;
        const areaIds = this.getAreaIds();
        const entityIds = Object.keys(entities).filter((entityId) => {
            const entity = entities[entityId];
            const areaId = entity.area_id;
            return areaIds.includes(areaId)
        })
        this._entityIds = entityIds;
    }

    setStructures() {
        this.setEntityIds();
    }

    /**********************************************************************/

    onClick(option) {
        this._option = option;
    }

    getButtonStyle(option) {
        const rgb = [100, 100, 100]; // placeholder for fancy coloring choice
        let styles = {
            'background-color': rgba(rgb, .5)
        }
        if (this._option === option) {
            styles['outline'] = `solid ${rgba(rgb, 1)}`;
            styles['outline-offset'] = '-4px';
        }
        return styles;
    }

    button(option) {
        return html`<div
            class="button outlined"
            @click=${() => this.onClick(option)}
            style=${styleMap(this.getButtonStyle(option))}
        >
            <div class="small-heading"> ${option} </div>
            <div class="sub-info"> sub-info </div>
        </div>`
    }

    buttonRow() {
        return html`
            <div class="button-row">
                ${repeat(this._OPTIONS, (option) => option, option => this.button(option))}
            </div>
        `
    }

    content() {
        let panel = html``;
        switch (this._option) {
            case "lighting":
                panel = html`<div> Lighting Placeholder </div>`;
                break;
            case "climate":
                panel = html`<div> Climate Placeholder </div>`;
                break;
        }
        return panel;
    }

    static styles = [styles, sharedStyles];

    // return html
    render() {
        return html`
            <ha-card>
                <div class="content">${this.content()}</div>
                ${this.buttonRow()}
            </ha-card>
        `;
    }

    // set card size parameters for ha
    getCardSize() {
        return 8;
    }

    getGridOptions() {
        return {
            rows: 9,
            columns: 24,
            min_rows: 9,
            max_rows: 9
        }
    }

}