import { html, css } from 'lit';
import { HaClimateComponent } from '../base-classes/ha-climate-component.js';
import sharedStyles from '../styles/shared-styles.js';
import './aux-mode-controls.js';
import './iso-hydrostat-panel.js';

export class AuxBasementPanel extends HaClimateComponent {

/********************************************** getter & setter logic *************************************************/

    getFireplace() {
        return this.getStructure().fireplace;
    }

    getFireplaceStructure() {
        return this.getFireplace().structure;
    }

    getFireplaceEIs() {
        return this.getFireplace().entityIds;
    }

    getFan() {
        return this.getStructure().fan;
    }

    getFanStructure() {
        return this.getFan().structure;
    }

    getFanEIs() {
        return this.getFan().entityIds;
    }

    getRegionName() {
        return this.regionName;
    }

    getLaundryHeat() {
        return this.getStructure().laundry_heater;
    }

    getLaundryHeatStructure() {
        return this.getLaundryHeat().structure;
    }

    getLaundryHeatEIs() {
        return this.getLaundryHeat().entityIds;
    }


/********************************************** html logic ************************************************************/

    fireplace() {
        if (this.getFireplace()) {
            return html`<div> placeholder </div>`
            return html`<aux-thermostat-panel 
                    class="outlined"
                    .changedEntityIds = ${this.getCEIs()}
                    .states = ${this.getStates()}
                    .entityIds = ${this.getFireplaceEIs()}
                    .structure = ${this.getFireplaceStructure()}
                    .regionName = ${this.getRegionName()}
                    .callService = ${this.callService}
                />`;
        }
    }

    laundryFan() {
        if (this.getFan()) {
            return html`<iso-hydrostat-panel 
                    class="outlined"
                    .changedEntityIds = ${this.getCEIs()}
                    .states = ${this.getStates()}
                    .entityIds = ${this.getFanEIs()}
                    .structure = ${this.getFanStructure()}
                    .callService = ${this.callService}
                />`;
        }
    }

    laundryThermostat() {
        if (this.getLaundryHeat()) {
            return html`<aux-thermostat-panel 
                    class="outlined"
                    .changedEntityIds = ${this.getCEIs()}
                    .states = ${this.getStates()}
                    .entityIds = ${this.getLaundryHeatEIs()}
                    .structure = ${this.getLaundryHeatStructure()}
                    .regionName = ${this.getRegionName()}
                    .callService = ${this.callService}
                />`;
        }
    }

    render() {
        if (this.isInitialized()) {
            return html`
                <div class="heading"> ${"Auxiliary Elements"} </div>
                <div class="main">
                    <div class="elements bottom">
                        ${this.laundryThermostat()}
                        ${this.laundryFan()}
                    </div>
                    <div class="elements top">
                        ${this.fireplace()}
                    </div>
                </div>
            `;
        }
    }

/********************************************** style logic ***********************************************************/

    static styles = [sharedStyles, css`

        :host {
            width: var(--auxbp-width, 620px);
            height: var(--auxbp-height, 100%);
            margin-left: var(--auxbp-margin-left, 0px);
            padding: var(--auxbp-padding, 15px);
            padding-top: var(--auxbp-padding-top, 0px);
            padding-bottom: var(--auxbp-padding-bottom, 0px);
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-between;
            align-items: center;

/********************************* aux-thermostat-panel ***************************************************************/

/* aux-thermstat-panel -- host */

            --auxp-width: var(--mauxp-width);
            --auxp-height: var(--mauxp-height);
            --auxp-padding: var(--mauxp-padding);
            --auxp-padding-top: var(--mauxp-padding-top);

/* aux-thermostat-panel -- heading */

            --auxph-height: var(--mauxph-height);
            --auxph-font-size: var(--mauxph-font-size);
            --auxph-font-weight: var(--mauxph-font-weight); 

/* aux-thermostat-panel -- main */

            --auxpm-height: var(--mauxpm-height);
            --auxpm-width: var(--mauxpm-width);

/* aux-thermostat-panel -- thermostat */ 

            --auxpt-height: var(--mauxpt-height);
            --auxpt-width: var(--mauxpt-width);
            --auxpt-flex-flow: var(--mauxpt-flex-flow);
            --auxpt-justify-content: var(--mauxpt-justify-content);
            --auxpt-align-items: var(--mauxpt-align-items);

/**************************************** aux-mode-controls ***********************************************************/

/* aux-mode-controls -- host */

            --auxmc-width: var(--mauxmc-width);
            --auxmc-height: var(--mauxmc-height);
            --auxmc-flex-flow: var(--mauxmc-flex-flow);
            --auxmc-justify-content: var(--mauxmc-justify-content);
            --auxmc-align-items: var(--mauxmc-align-items);

/* aux-mode-controls -- button */

            --auxmcb-width: var(--mauxmcb-width);
            --auxmcb-height: var(--mauxmcb-height);
            --auxmcb-outline-offset: var(--mauxmcb-outline-offset);

/* aux-mode-controls -- bigbutton */

            --auxmcbb-width: var(--mauxmcbb-width);
            --auxmcbb-height: var(--mauxmcbb-height);
            --auxmcbb-font-weight: var(--mauxmcbb-font-weight);
            --auxmcbb-font-size: var(--mauxmcbb-font-size);

/* aux-mode-controls -- exclamation */

            --auxmce-margin-right: var(--mauxmce-margin-right);
            --auxmce-margin-left: var(--mauxmce-margin-left);

/* aux-mode-controls -- center */

            --auxmcc-margin-left: var(--mauxmcc-margin-left);

/************************************* thermostat *********************************************************************/

/* thermostat -- host */

            --th-width: var(--mth-width);
            --th-height: var(--mth-height);
            --th-bottom-padding: var(--mth-bottom-padding);
            --th-margin-top: var(--mth-margin-top);
            --th-margin-bottom: var(--mth-margin-bottom);

/* thermostat -- button-row */

            --thbr-width: var(--mthbr-width);

/********************************* circular-slider ********************************************************************/

/* circular-slider -- host */

            --cs-height: var(--mcs-height);
            --cs-top-margin: var(--mcs-top-margin);

/* circular-slider -- center */

            --csc-text-weight: var(--mcsc-text-weight);
            --csc-text-height: var(--mcsc-text-height);

/* circular-slider -- var */

            --csr-font-size: var(--mcsr-font-size);

/* circular-slider -- var -- one */        

            --css-font-size: var(--mcss-font-size);

/* circular-slider -- upper */        

            --csu-font-size: var(--mcsu-font-size);
            --csu-font-weight: var(--mcsu-font-weight);

/* circular-slider -- lower */

            --csl-font-size: var(--mcsl-font-size);
            --csl-font-weight: var(--mcsl-font-weight);

/* circular-slider -- sup */

            --cssu-offset: var(--mcssu-offset);
            --cssu-factor: var(--mcssu-factor);

/********************************** adjust-buttons ********************************************************************/

/* adjust-buttons -- host */

        --ab-width: var(--mab-width);
        --ab-margin-top: var(--mab-margin-top);

/* adjust-buttons -- circle */

        --abc-size: var(--mabc-size);

/* adjust-buttons -- ha-svg-icon */

        --abci-size: var(--mabci-size);

/************************************* offset-slider ******************************************************************/

/* offset-slider -- host */

            --os-width: var(--mos-width);
            --slider-padding: var(--mslider-padding);
            --os-padding: var(--mos-padding);
            --os-padding-top: var(--mos-padding-top);
            --os-height: var(--mos-height);

/* offset-slider -- value */

            --osv-height: var(--mosv-height);
            --osv-font-size: var(--mosv-font-size);
            --osv-font-weight: var(--mosv-font-weight);

/* offset-slider -- bar */

            --osb-height: var(--mosb-height);

/***************************************** slider *********************************************************************/

            --oss-justify-content: var(--moss-justify-content);
            --oss-flex-flow: var(--moss-flex-flow);
            --oss-margin: var(--moss-margin);
            --oss-width: var(--moss-width);
            --oss-text-padding: var(--moss-text-padding);
            --oss-text-offset: var(--moss-text-padding);
            --oss-text-width: var(--moss-text-width);
            --oss-level-offset: var(--moss-level-offset);
            --oss-level-height: var(--moss-level-height);

/**********************************************************************************************************************/

        .heading {
            height: var(--auxbph-height, 50px);
            font-size: var(--auxbph-font-size, var(--Large-font));
            font-weight: var(--auxbph-font-weight, 550);
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: flex-start;
            width: 100%;
        }

        .main {
            display: flex;
            width: var(--auxbpm-width, 100%);
            height: var(--auxbpm-height, 700px);
            flex-flow: column nowrap;
            justify-content: space-between;
            align-items: center;
            margin-top: var(--auxbp-margin-top, 0px);
        }

        .elements {
            display: flex;
            width: var(--auxbpe-width, 100%);
            height: var(--auxbpe-height, 700px);
            flex-flow: row nowrap;
        }

        .top {
            justify-content: var(--auxbpet-justify-content, space-between);
        }

        .bottom {
            justify-content: var(--auxbpeb-justify-content, space-between);
        }

    `];

}

customElements.define("aux-basement-panel", AuxBasementPanel);
