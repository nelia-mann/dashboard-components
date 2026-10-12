import { css } from 'lit';

export default css`

    :host {

        --ipad-max-height: 900px;
        --ipad-max-width: 1250px;
        --small-heading-font-size: var(--large-font);
        --small-heading-font-weight:  700;
        --sub-info-font-size: var(--normal-font);
        --sub-info-font-weight: 400;

/* calls to ha variables */

        --ha-card-background: transparent;
        --ha-card-border-width: 0px;

/* general settings */

        --padding: 15px; /* padding in and around large thermostats */
        --mpadding: 10px; /* padding in and around small thermostats */
        --b-outline-offset: -3px; /* button outline offset */
        --t-width: 440px; /* used for large thermostats */
        --mt-width: 270px; /* used for small thermostats */

/***************************************** main ***********************************************************************/

/* main -- ha-card */

        --hc-padding: 0px;
        --hc-height: var(--ipad-max-height);
        --hc-width: var(--ipad-max-width);

/* main -- button-row */

        --br-height: 60px;
        --br-width: 100%;

/************************************** area-panel ********************************************************************/

/* area-panel --host */

        --ap-width: 100%;
        --ap-height: calc(var(--hc-height) - var(--br-height) - var(--padding));

/*********************************** climate-button *******************************************************************/

/* climate-button -- host */

        --cb-width: 200px;
        --cb-padding: 5px;

/* climate-button -- button */

        --cb-outline-offset: var(--b-outline-offset);

/* climate-button -- small-heading */

        --cbh-margin-top: 7px;
        --cbh-margin-bottom: -7px;
        --cbh-font-weight: var(--small-heading-font-weight);
        --cbh-font-size: var(--small-heading-font-size);

/* climate-button -- sub-info */

        --cbsi-margin-bottom: 10px;
        --cbsi-margin-top: 1px;
        --cbsi-font-weight: var(--sub-info-font-weight);
        --cbsi-font-size: var(--sub-info-font-size);

/********************************** heatpump-panel ********************************************************************/

/* heatpump-panel -- host */

        --hpp-width: calc(var(--t-width) + 2 * var(--padding));
        --hpp-height: calc(var(--t-width) + var(--mc-height) + var(--hpph-height) + 2 * var(--padding));
        --hpp-padding: var(--padding);
        --hpp-padding-top: 0px;

/* heatpump-panel -- heading */

        --hpph-font-size: var(--Large-font);
        --hpph-font-weight: 550;
        --hpph-height: 40px;

/*********************************** mode-controls ********************************************************************/

/* mode-controls -- host */

        --mc-width: 100%;
        --mc-height: 40px;
        --mc-margin-top: var(--padding);

/* mode-controls -- button */

        --mcb-width: calc((var(--t-width) - 4 * var(--padding)) / 5);
        --mcb-height: 100%;
        --mcb-outline-offset: var(--b-outline-offset);

/* mode-controls -- center */

        --mcbc-margin-left: -10px;
        --mcbc-margin-right: -14px;

/************************************* thermostat *********************************************************************/

/* thermostat -- host */

        --th-width: var(--t-width);
        --th-height: var(--t-width);
        --th-bottom-padding: 0px;
        --th-margin-top: 0px;
        --th-margin-bottom: 0px;

/* thermostat -- button-row */

        --thbr-width: 100%;

/********************************* circular-slider ********************************************************************/

/* circular-slider -- host */

        --cs-height: calc(100% - 2 * var(--padding));
        --cs-top-margin: 0px;

/* circular-slider -- center */

        --csc-text-weight: 400;
        --csc-text-height: 80px;

/* circular-slider -- var */

        --csr-font-size: var(--Huge-font);

/* circular-slider -- var -- one */        

        --css-font-size: var(--HUGE-font);

/* circular-slider -- upper */        

        --csu-font-size: var(--large-font);
        --csu-font-weight: 500;

/* circular-slider -- lower */

        --csl-font-size: var(--large-font);
        --csl-font-weight: 400;

/* circular-slider -- sup */

        --cssu-offset: -0.7em;
        --cssu-factor: 2.5;

/********************************** adjust-buttons ********************************************************************/

/* adjust-buttons -- host */

        --ab-width: 110px;
        --ab-margin-top: -40px;

/* adjust-buttons -- circle */

        --abc-size: 40px;

/* adjust-buttons -- ha-svg-icon */

        --abci-size: 60%;

/********************************* aux-thermostat-panel ***************************************************************/

/* aux-thermostat-panel -- host */

        --auxp-width: calc(var(--t-width) + var(--os-width) + 3 * var(--padding));
        --auxp-height: var(--hpp-height);
        --auxp-padding: var(--padding);
        --auxp-padding-top: 0px;

/* aux-thermostat-panel -- heading */

        --auxph-font-size: var(--hpph-font-size);
        --auxph-font-weight: var(--hpph-font-weight);
        --auxph-height: var(--hpph-height);

/* aux-thermostat-panel -- main */

        --auxpm-height: calc(var(--auxp-height) - var(--auxph-height) - var(--padding));
        --auxpm-width: 100%;

/* aux-thermostat-panel -- thermostat */

        --auxpt-height: 100%; /* set by height of aux-panel main */
        --auxpt-width: var(--t-width);
        --auxpt-flex-flow: column nowrap;
        --auxpt-justify-content: space-between;
        --auxpt-align-items: center;

/*********************************** aux-mode-controls ****************************************************************/

/* aux-mode-controls -- host */

        --auxmc-width: 100%; /* set by width of aux-panel thermostat */
        --auxmc-height: var(--mc-height);
        --auxmc-flex-flow: var(--mc-flex-flow);
        --auxmc-justify-content: space-between;
        --auxmc-align-items: var(--mc-align-items);

/* aux-mode-controls -- button */        

        --auxmcb-width: var(--mc-button-width);
        --auxmcb-height: var(--mc-button-height);
        --auxmcb-outline-offset: var(--button-outline-offset);

/* aux-mode-controls -- bigbutton */

        --auxmcbb-width: calc(var(--t-width) - 3 * var(--mcb-width) - 3 * var(--padding));
        --auxmcbb-height: var(--mc-button-height);
        --auxmcbb-font-weight: var(--small-heading-font-weight);
        --auxmcbb-font-size: var(--sub-info-font-size);

/* aux-mode-controls -- exclamation */

        --auxmce-margin-right: -6px;
        --auxmce-margin-left: 0px;

/* aux-mode-controls -- center */

        --auxmcc-margin-left: -10px;

/************************************* offset-slider ******************************************************************/

/* offset-slider -- host */

        --os-width: 75px;
        --os-padding: var(--padding);
        --os-padding-top: 0px;
        --os-height: 100%; /* set by height of aux-panel main */

/* offset-slider -- value */

        --osv-height: 45px;
        --osv-font-size: var(--normal-font);
        --osv-font-weight: 700;

/* offset-slider -- bar */

        --osb-height: calc(100% - var(--osv-height));

/***************************************** slider *********************************************************************/

        --oss-justify-content: flex-start;
        --oss-flex-flow: column nowrap;
        --oss-margin: 5%;
        --oss-width: 45px;
        --oss-text-padding: 5px;
        --oss-text-offset: 5%;
        --oss-text-width: 45px;
        --oss-level-offset: 10%;
        --oss-level-height: 2%;

/************************************* aux-basement-panel *************************************************************/

/* aux-basement-panel -- host */

        --auxbp-width: calc(var(--ap-width) - var(--hpp-width) - var(--padding));
        --auxbp-height: var(--ap-height);
        --auxbp-margin-left: var(--padding);
        --auxbp-padding: var(--padding);
        --auxbp-padding-top: 0px;
        --auxbp-padding-bottom: var(--padding);

/* aux-basement-panel -- heading */

        --auxbph-font-size: var(--climate-panel-heading-font-size);
        --auxbph-font-weight: var(--climate-panel-heading-font-weight);
        --auxbph-height: var(--hpph-height);

/* aux-basement-panel -- main */

        --auxbpm-width: 100%;
        --auxbpm-height: calc(var(--auxbp-height) - var(--auxbph-height) - 2 * var(--padding));
        --auxbp-margin-top: vr(--padding);

/* aux-basement-panel -- elements */

        --auxbpe-width: 100%;
        --auxbpe-height: calc(50% - var(--padding) / 2);

/* aux-basement-panel -- elements-top */

        --auxbpet-justify-content: space-between;

/* aux-basement-panel -- elements-bottom */

        --auxbpeb-justify-content: space-around;

/************************* aux-thermostat-panel (in aux-basement-panel) ***********************************************/      

/* aux-thermostat-panel -- host */

        --mauxp-width: calc(var(--mt-width) + var(--mos-width) + 3 * var(--mpadding));
        --mauxp-height: calc(var(--mt-width) + var(--mauxmc-height) + var(--mauxph-height) + 2 * var(--mpadding));
        --mauxp-padding: var(--mpadding);
        --mauxp-padding-top: 0px;

/* aux-thermostat-panel -- heading */

        --mauxph-height: 30px;
        --mauxph-font-size: var(--large-font);
        --mauxph-font-weight: 700;

/* aux-thermostat-panel -- main */

        --mauxpm-height: calc(var(--mauxp-height) - var(--mauxph-height) - var(--mpadding));
        --mauxpm-width: 100%; /* references host width */

/* aux-thermostat-panel -- thermostat */

        --mauxpt-height: calc(var(--mt-width) + var(--mauxmc-height) + var(--mpadding));
        --mauxpt-width: var(--mt-width);
        --mauxpt-flex-flow: column nowrap;
        --mauxpt-justify-content: space-between;
        --mauxpt-align-items: center;

/*************************** aux-mode-controls (in aux-basement-panel) ************************************************/

/* aux-mode-controls -- host */

        --mauxmc-width: 100% /* references aux-thermostat-panel -- panel */;
        --mauxmc-height: 40px;
        --mauxmc-flex-flow: row nowrap;
        --mauxmc-justify-content: space-between;
        --mauxmc-align-items: center;

/* aux-mode-controls -- button */

        --mauxmcb-width: calc((var(--mauxmc-width) - var(--mauxmcbb-width) - 3 * var(--mpadding)) / 3);
        --mauxmcb-height: var(--mcb-height);
        --mauxmcb-outline-offset: var(--b-outline-offset);

/* aux-mode-controls -- bigbutton */

        --mauxmcbb-width: 70px;
        --mauxmcbb-height: var(--mcb-height);
        --mauxmcbb-font-weight: 500;
        --mauxmcbb-font-size: var(--normal-font);

/* aux-mode-controls -- exclamation */

        --mauxmce-margin-right: -6px;
        --mauxmce-margin-left: -10px;

/* aux-mode-controls -- center */

        --mauxmcc-margin-left: -6px;

/************************** thermostat (in basement panel) ************************************************************/

/* thermostat -- host */

        --mth-width: var(--mt-width);
        --mth-height: var(--mt-width);
        --mth-bottom-padding: 0px;
        --mth-margin-top: 0px;
        --mth-margin-bottom: 0px;

/* thermostat -- button-row */

        --mthbr-width: 100%;

/********************* circular-slider (in basement panel) ************************************************************/

/* circular-slider -- host */

        --mcs-height: calc(100% - 2 * var(--padding));
        --mcs-top-margin: 0px;

/* circular-slider -- center */

        --mcsc-text-weight: 400;
        --mcsc-text-height: 60px;

/* circular-slider -- var */

        --mcsr-font-size: var(--Huge-font);

/* circular-slider -- var -- one */        

        --mcss-font-size: var(--HUGE-font);

/* circular-slider -- upper */        

        --mcsu-font-size: var(--large-font);
        --mcsu-font-weight: 500;

/* circular-slider -- lower */

        --mcsl-font-size: var(--large-font);
        --mcsl-font-weight: 400;

/* circular-slider -- sup */

        --mcssu-offset: -0.7em;
        --mcssu-factor: 2.5;

/************************ adjust-buttons (in basement panel) **********************************************************/

/* adjust-buttons -- host */

        --mab-width: 90px;
        --mab-margin-top: -40px;

/* adjust-buttons -- circle */

        --mabc-size: 35px;

/* adjust-buttons -- ha-svg-icon */

        --mabci-size: 60%;

/************************* offset-slider (in basement panel) **********************************************************/

/* offset-slider -- host */

        --mos-width: 60px;
        --mslider-padding: 10px;
        --mos-padding: var(--mpadding);
        --mos-padding-top: 0px;
        --mos-height: 100%; /* set by height of aux-panel main */

/* offset-slider -- value */

        --mosv-height: 40px;
        --mosv-font-size: var(--normal-font);
        --mosv-font-weight: 700;

/* offset-slider -- bar */

        --mosb-height: calc(100% - var(--mosv-height));

/*************************** slider (in basement panel) ***************************************************************/

        --moss-justify-content: flex-start;
        --moss-flex-flow: column nowrap;
        --moss-margin: 5%;
        --moss-width: 40px;
        --moss-text-padding: 5px;
        --moss-text-offset: 5%;
        --moss-text-width: 45px;
        --moss-level-offset: 10%;
        --moss-level-height: 2%;

/********************************** iso-hydrostat-panel ***************************************************************/

/* iso-hydrostat-panel -- host */

        --ip-padding: var(--mpadding);
        --ip-padding-top: 0px;
        --ip-height: var(--mauxp-height);
        --ip-width: calc(var(--mt-width) + 2 * var(--mpadding));

/* iso-hydrostat-panel -- heading */

        --iph-font-size: var(--large-font);
        --iph-font-weight: 700;
        --iph-height: var(--mauxph-height);

/* iso-hydrostat-panel -- hygrostat */

        --iphy-height: calc(var(--ip-height) - var(--iph-height) - var(--mpadding));
        --iphy-width: 100%;
        --iphy-flex-flow: column nowrap;
        --iphy-justify-content: space-between;
        --iphy-align-items: center;

/*********************************** iso-mode-controls ****************************************************************/

/* iso-mode-controls -- host */

        --imc-width: 100%;
        --imc-height: var(--mauxmc-height);
        --imc-margin-top: var(--mpadding);
        --imc-flex-flow: row nowrap;
        --imc-justify-content: space-between;
        --imc-align-items: center;

/* iso-mode-controls -- button */

        --imcb-width: 60px;
        --imcb-height: var(--mc-button-height);
        --imcb-outline-offset: var(--button-outline-offset);

/* iso-mode-controls -- center */

        --imcc-margin-left: -6px;

/**************************************** hydrostat *******************************************************************/

        --hydrostat-width: var(--mt-width);
        --hydrostat-height: var(--mt-width);

    }
    `;