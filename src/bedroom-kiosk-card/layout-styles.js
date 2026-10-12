import { css } from 'lit';

export default css`

    :host {

        --small-heading-font-size: var(--large-font);
        --small-heading-font-weight:  700;
        --sub-info-font-size: var(--normal-font);
        --sub-info-font-weight: 400;

        --panel-height: calc(var(--smallfire-max-height) - var(--button-row-height) - var(--padding));
        --panel-width: 100%;
        --padding: 15px;
        --t-width: 310px;
        --b-outline-offset: -3px;
        --button-width: 180px;

        --ha-card-background: transparent;        
        --ha-card-border-width: 0px;

/******************************************** main ********************************************************************/

        --ha-card-padding: 0px;
        --ha-card-height: var(--smallfire-max-height);
        --ha-card-width: var(--smallfire-max-width);

        --button-row-height: 50px;
        --button-row-width: 100%;

/**************************************** lighting-button *************************************************************/

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

/****************************************** climate-button ************************************************************/

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

/********************************************* lighting ***************************************************************/

        --lighting-height: var(--panel-height);
        --lighting-width: var(--panel-width);

/******************************************** area-panel **************************************************************/

        --area-panel-basic-width: 100%;
        --area-panel-basic-height: 120px;
        --area-panel-basic-padding: 15px;
        --area-panel-basic-justify-content: space-around;
        --area-panel-basic-align-items: center;
        --area-heading-font-size: var(--large-font);
        --area-heading-font-weight: 700;

/****************************************** light-component ***********************************************************/

        --light-component-width: 210px;
        --light-component-height: 35px;
        --light-component-padding: 10px;
        --light-component-margin: 15px;

        --simple-light-icons-margin-right: 10px;
        --simple-light-icons-margin-left: 0px;
        --simple-light-icon-size: 25px;
        --simple-light-font-size: var(--sub-info-font-size);
        --simple-light-font-weight: var(--sub-info-font-weight);
        --simple-light-align-items: center;
        --simple-light-justify-content: flex-start;

/***************************************** light-group-control ********************************************************/

        --light-group-flex-flow: column nowrap;
        --light-group-justify-content: space-around;
        --light-group-align-items: center;
        --light-group-width: 100%;
        --light-group-margin-top: 15px;

        --light-group-control-padding-top: 20px;
        --light-group-control-padding-bottom: 20px;

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
        --light-inner-heading-font-size: var(--small-heading-font-size);
        --light-inner-heading-font-weight: var(--small-heading-font-weight);
        --light-inner-font-size: var(--sub-info-font-size);
        --light-inner-font-weight: var(--sub-info-font-size);

/****************************************** control-select ************************************************************/

        --control-select-flex-flow: row nowrap;
        --control-select-justify-content: space-around;
        --control-select-align-items: center;
        --control-select-margin-left: 10px;
        --control-select-margin-top: 10px;
        --control-select-icon-window-width: 42px;
        --control-select-icon-window-margin: 10px;
        --control-select-icon-size: 20px;
        --control-select-outline-offset: -2px;

/******************************************** light-control ***********************************************************/

        --light-control-padding: 15px;
        --light-control-margin-left: 20px;
        --light-control-margin-right: 20px;
        --light-control-margin: 15px;

/******************************************* brightness-slider ********************************************************/

        --brightness-slider-width: 400px;
        --brightness-slider-height: 100px;

/************************************************ slider **************************************************************/

        --slider-orientation: column nowrap;
        --slider-margin: 5%;
        --slider-width: 15px;
        --slider-text-padding: 10px;
        --slider-text-offset: 6%;
        --slider-text-width: 20px;
        --slider-level-offset: 10%;
        --slider-level-height: 2%;

/*********************************************** climate **************************************************************/

        --climate-height: var(--panel-height);
        --climate-width: var(--panel-width);

/******************************************** heatpump-panel **********************************************************/ 

/* heatpump-panel -- host */

        --hpp-width: calc(var(--t-width) + 2 * var(--padding));
        --hpp-height: calc(var(--t-width) + var(--mc-height) + var(--hpph-height) + 2 * var(--padding));
        --hpp-padding: var(--padding);
        --hpp-padding-top: 0px;

/* heatpump-panel -- heading */

        --hpph-font-size: var(--Large-font);
        --hpph-font-weight: 550;
        --hpph-height: 40px;

/********************************************* mode-control ***********************************************************/ 

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

/******************************************** thermostat-panel ********************************************************/

/* thermostat -- host */

        --th-width: var(--t-width);
        --th-height: var(--t-width);
        --th-bottom-padding: 0px;
        --th-margin-top: 0px;
        --th-margin-bottom: 0px;

/* thermostat -- button-row */

        --thbr-width: 100%;

/**************************************** double-circular-slider ******************************************************/

/* double-circular-slider -- host */

        --cs-height: calc(100% - 2 * var(--padding));
        --cs-top-margin: 0px;

/* double-circular-slider -- center */

        --csc-text-height: 80px;
        --csc-text-weight: 400;

/* double-circular-slider -- var */

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

/******************************************* adjust-buttons ***********************************************************/

/* adjust-buttons -- host */

        --ab-width: 110px;
        --ab-margin-top: -40px;

/* adjust-buttons -- circle */

        --abc-size: 40px;

/* adjust-buttons -- ha-svg-icon */

        --abci-size: 60%;

/***************************************** aux-thermostat-panel *******************************************************/

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

/****************************************** aux-mode-control **********************************************************/

/* aux-mode-controls -- host */

        --auxmc-width: 100%; /* set by width of aux-panel thermostat */
        --auxmc-height: var(--mc-height);
        --auxmc-flex-flow: var(--mc-flex-flow);
        --auxmc-justify-content: space-between;
        --auxmc-align-items: var(--mc-align-items);

/* aux-mode-controls -- button */        

        --auxmcb-width: var(--mc-button-width);
        --auxmcb-height: var(--mc-button-height);
        --auxmcb-outline-offset: var(--b-outline-offset);

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

/************************************** slider (in offset-slider) *****************************************************/

        --oss-margin: 5%;
        --oss-width: 50px;
        --oss-text-padding: 5px;
        --oss-text-offset: 5%;
        --oss-text-width: 50px;
        --oss-level-offset: 10%;
        --oss-level-height:  2%;


    }
    `;