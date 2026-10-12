import { css } from 'lit';

export default css`

    :host {

        --small-heading-font-size: var(--large-font);
        --small-heading-font-weight: 700;
        --sub-info-font-size: var(--normal-font);
        --sub-info-font-weight: 400;
    
        --ha-card-border-width: 0px;
        --ha-card-background: transparent;

        --padding: 15px; /* padding in and around large thermostats */
        --mpadding: 10px; /* padding in and around small thermostats */
        --b-outline-offset: -3px; /* button outline offset */
        --t-width: 370px; /* used for large thermostats */
        --mt-width: 260px; /* used for small thermostats */
        --button-width: 180px;        

/************************************************** main **************************************************************/

        --ha-card-padding: 0px;
        --ha-card-padding-top: 0px;
        --ha-card-height: var(--largegalaxy-max-height);
        --ha-card-width: var(--largegalaxy-max-width);

        --button-row-height: 50px;
        --button-row-width: 100%;

/********************************************* light-button ***********************************************************/

        --light-button-width: var(--button-width);
        --light-button-padding: 0px;
        --light-button-heading-margin-top: 7px;
        --light-button-heading-margin-bottom: -7px;
        --light-button-sub-info-margin-top: 1px;
        --light-button-sub-info-margin-bottom: 10px;
        --light-button-heading-font-size: var(--small-heading-font-size);
        --light-button-heading-font-weight: var(--small-heading-font-weight);
        --light-button-sub-info-font-size: var(--sub-info-font-size);
        --light-button-sub-info-font-weight: var(--sub-info-font-weight);

/******************************************* climate-button ***********************************************************/

/* climate-button -- host */

        --cb-width: var(--button-width);
        --cb-padding: 0px;

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

/********************************************** lighting **************************************************************/

        --lighting-height: calc(var(--ha-card-height) - var(--button-row-height) - var(--padding));
        --lighting-width: var(--ha-card-width);

/********************************************** area-panel ************************************************************/

        --floor-panel-height: var(--lighting-height);
        --area-heading-font-size: 125%;
        --area-heading-font-weight: 700;

/******************************************** light-component *********************************************************/

        --light-component-width: 280px;
        --light-component-height: 41px;
        --light-component-padding: 2px;
        --light-component-margin: 9px;

        --simple-light-icons-margin-right: 10px;
        --simple-light-icons-margin-left: 0px;
        --simple-light-icon-size: 25px;
        --simple-light-font-size: 125%;
        --simple-light-font-weight: var(--sub-info-font-weight);
        --simple-light-align-items: center;
        --simple-light-justify-content: flex-start;

/******************************************* light-group-control ******************************************************/

        --light-group-control-padding-top: 20px;
        --light-group-control-padding-bottom: var(--light-group-control-padding-top);

        --light-group-height: calc(var(--lighting-height) - 2 * var(--light-group-control-padding-top));
        --light-group-width: 900px;
        --light-group-flex-flow: column nowrap;
        --light-group-justify-content: flex-start;
        --light-group-align-items: center;
        --light-group-margin-top: 0px;

/****************************************** light-group-select ********************************************************/

        --light-select-flex-flow: column nowrap;
        --light-select-align-items: center;
        --light-select-justify-content: center;
        --light-select-members-flex-flow: row wrap;
        --light-select-members-justify-content: space-around;
        --light-select-members-align-items: center;
        --light-select-members-width: 100%;
        --light-select-member-width: 180px;
        --light-select-innerlight-width: 250px;
        --light-select-innerlight-height: 30px;
        --light-select-innerlight-padding: 8px;
        --light-select-innerlight-margin: 10px;
        --light-select-innerlight-flex-flow: row nowrap;
        --light-select-icon-margin-right: 10px;
        --light-select-icon-margin-left: 10px;
        --light-select-icon-size: 20px;
        --light-inner-heading-font-size: 150%;
        --light-inner-heading-font-weight: var(--small-heading-font-weight);
        --light-inner-font-size: 125%;
        --light-inner-font-weight: var(--sub-info-font-size);

/*************************************** light-select-control *********************************************************/

        --control-select-flex-flow: row nowrap;
        --control-select-justify-content: space-around;
        --control-select-align-items: center;
        --control-select-margin-left: 10px;
        --control-select-margin-top: 10px;
        --control-select-icon-window-width: 42px;
        --control-select-icon-window-margin: 10px;
        --control-select-icon-size: 20px;
        --control-select-outline-offset: -2px;

/******************************************* light-control ************************************************************/

        --light-control-padding: 30px;
        --light-control-margin-left: 20px;
        --light-control-margin-right: 20px;
        --light-control-margin: 35px;

/******************************************** color-wheel *************************************************************/

        --wheel-width: 360px;
        --dot-width: 30px;

/****************************************** brightness-slider *********************************************************/

        --brightness-slider-width: 800px;
        --brightness-slider-height: 100px;

/****************************************** colortemp-slider **********************************************************/

        --colortemp-slider-width: var(--brightness-slider-width);
        --colortemp-slider-height: 100px;

/********************************************** slider ****************************************************************/

        --slider-orientation: column nowrap;
        --slider-margin: 3%;
        --slider-width: 5px;
        --slider-text-padding: 10px;
        --slider-text-offset: 1%;
        --slider-text-width: 20px;
        --slider-level-offset: 10%;
        --slider-level-height: 1%;

/******************************************** theme-select ************************************************************/

        --theme-select-flex-flow: column wrap;
        --theme-select-align-items: center;
        --theme-select-justify-content: flex-start;
        --theme-select-padding: 0px;
        --theme-select-height: 380px;
        --theme-select-width: 800px;

/******************************************** theme-button ************************************************************/

        --theme-button-padding-top: 7px;
        --theme-button-padding-bottom: 7px;
        --theme-button-margin: 7px;
        --theme-button-width: 120px;
        --theme-button-height: 40px;
        --theme-button-font-size: var(--sub-info-font-size);
        --theme-button-font-weight: var(--sub-info-font-weight);

/********************************************** climate ***************************************************************/

        --c-height: var(--lighting-height);
        --c-width: var(--lighting-width);

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

/************************************* aux-basement-panel *************************************************************/

/* aux-basement-panel -- host */

        --auxbp-width: calc(var(--c-width) - var(--hpp-width) - var(--padding));
        --auxbp-height: var(--c-height);
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

        --mauxp-width: calc(var(--mt-width) + var(--mos-width) + + var(--mauxmc-width) + 3 * var(--mpadding));
        --mauxp-height: calc(var(--mt-width) + var(--mauxph-height) + var(--mpadding));
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

        --mauxpt-height: var(--mt-width);
        --mauxpt-width: calc(var(--mt-width) + var(--mauxmcbb-width) + var(--mpadding));
        --mauxpt-flex-flow: row nowrap;
        --mauxpt-justify-content: space-between;
        --mauxpt-align-items: center;

/*************************** aux-mode-controls (in aux-basement-panel) ************************************************/

/* aux-mode-controls -- host */

        --mauxmc-width: calc(var(--mauxmcbb-width) + 2 * var(--mpadding));
        --mauxmc-height: var(--mt-width);
        --mauxmc-flex-flow: column nowrap;
        --mauxmc-justify-content: space-between;
        --mauxmc-align-items: center;

/* aux-mode-controls -- button */

        --mauxmcb-width: var(--mauxmcbb-width);
        --mauxmcb-height: var(--mc-height);
        --mauxmcb-outline-offset: var(--b-outline-offset);

/* aux-mode-controls -- bigbutton */

        --mauxmcbb-width: 60px;
        --mauxmcbb-height: var(--mc-height);
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
        --ip-width: calc(var(--mt-width) + 2 * var(--mpadding) + var(--imc-width));

/* iso-hydrostat-panel -- heading */

        --iph-font-size: var(--large-font);
        --iph-font-weight: 700;
        --iph-height: var(--mauxph-height);

/* iso-hydrostat-panel -- hygrostat */

        --iphy-height: calc(var(--ip-height) - var(--iph-height) - var(--mpadding));
        --iphy-width: 100%;
        --iphy-flex-flow: row nowrap;
        --iphy-justify-content: space-between;
        --iphy-align-items: center;

/*********************************** iso-mode-controls ****************************************************************/

/* iso-mode-controls -- host */

        --imc-width: var(--mauxmcbb-width);
        --imc-height: var(--iphy-height);
        --imc-margin-top: 0px;
        --imc-margin-left: var(--mpadding);
        --imc-flex-flow: column nowrap;
        --imc-justify-content: space-between;
        --imc-align-items: center;

/* iso-mode-controls -- button */

        --imcb-width: var(--mauxmcbb-width);
        --imcb-height: var(--mc-height);
        --imcb-outline-offset: var(--b-outline-offset);

/* iso-mode-controls -- center */

        --imcc-margin-left: -6px;

/**************************************** hydrostat *******************************************************************/

        --hydrostat-width: var(--mt-width);
        --hydrostat-height: var(--mt-width);

    }
    `