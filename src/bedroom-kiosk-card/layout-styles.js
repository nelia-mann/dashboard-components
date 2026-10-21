import { css } from 'lit';

export default css`

    :host {

        --small-heading-font-size: var(--large-font);
        --small-heading-font-weight:  700;
        --sub-info-font-size: var(--normal-font);
        --sub-info-font-weight: 400;

        --panel-height: calc(var(--smallfire-max-height) - var(--br-height) - var(--padding));
        --panel-width: 100%;
        --padding: 15px;
        --t-width: 310px;
        --b-outline-offset: -3px;
        --button-width: 180px;
     
        --ha-card-border-width: 0px;
        --ha-card-background: transparent;

/******************************************** main ********************************************************************/

/* main -- host */

        --hc-padding: 0px;
        --hc-height: var(--smallfire-max-height);
        --hc-width: var(--smallfire-max-width);

/* main -- button-row */

        --br-height: 55px;
        --br-width: 100%;

/**************************************** lighting-button *************************************************************/

/* lighting-button -- host */

        --lb-width: var(--button-width);
        --lb-padding: 0px;

/* lighting-button -- button */

        --lb-outline-offset: var(--b-outline-offset);

/* lighting-button -- small-heading */

        --lbh-margin-top: 7px;
        --lbh-margin-bottom: -7px;
        --lbh-font-size: var(--small-heading-font-size);
        --lbh-font-weight: var(--small-heading-font-weight);

/* lighting-button -- sub-info */

        --lbsi-margin-top: 1px;
        --lbsi-margin-bottom: 10px;
        --lbsi-font-size: var(--sub-info-font-size);
        --lbsi-font-weight: var(--sub-info-font-weight);

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

        --l-height: var(--panel-height);
        --l-width: var(--panel-width);

/******************************************** area-panel **************************************************************/

/* area-panel -- host */

        --ap-margin-left: 0px;
        --ap-margin-right: 0px;
        --ap-margin-top: 0px;
        --ap-width: 100%;
        --ap-padding: var(--padding);

/* area-panel -- heading */

        --aph-font-size: var(--large-font);
        --aph-font-weight: 700;
        --aph-margin-bottom: var(--padding);

/****************************************** light-component ***********************************************************/

/* light-component -- host */

        --lc-width: 220px;
        --lc-height: 50px;
        --lc-padding: var(--mpadding);
        --lc-margin: 0px;

/* light-component -- light-element */

        --lcl-font-size: var(--sub-info-font-size);
        --lcl-font-weight: var(--sub-info-font-weight);
        --lcl-align-items: center;
        --lcl-justify-content: flex-start;

/* light-component -- icon */

        --lci-margin-right: var(--mpadding);
        --lci-icons-margin-left: 0px;
        --lci-width: 25px;

/***************************************** light-group-control ********************************************************/

/* light-group-control -- host */

        --lg-width: 100%;
        --lg-padding: var(--padding);
        --lg-padding-bottom: 0px;
        --lg-margin-top: var(--padding);
        --lg-margin-bottom: var(--padding);

/****************************************** light-group-select ********************************************************/

/* light-group-select -- host */

        --lgs-flex-flow: column nowrap;
        --lgs-align-items: center;
        --lgs-justify-content: center;

/* light-group-select -- members */

        --lgsm-flex-flow: row wrap;
        --lgsm-justify-content: space-around;
        --lgsm-align-items: center;
        --lgsm-width: 100%;

/* light-group-select -- light-inner */

        --lgsli-width: var(--lc-width);
        --lgsli-height: var(--lc-height);
        --lgsli-padding: var(--mpadding);
        --lgsli-margin: 0px;
        --lgsli-flex-flow: row nowrap;
        --lgsli-outline-offset: var(--b-outline-offset);

/* light-group-select -- small-heading */

        --lgssh-font-size: var(--small-heading-font-size);
        --lgssh-font-weight: var(--small-heading-font-weight);
        --lgssh-width: 270px;

/* light-group-select -- sub-info */

        --lgssi-font-size: var(--lcl-font-size);
        --lgssi-font-weight: var(--lcl-font-size);
        --lcssi-margin-bottom: var(--padding);

/* light-group-select -- icon */

        --lgsi-margin-right: 10px;
        --lgsi-margin-left: 0px;
        --lgsi-width: var(--lci-width);

/* light-group-select -- top-row */

        --lgstr-margin-bottom: var(--padding);

/*************************************** light-control-select *********************************************************/

/* light-control-select -- host */

        --lcs-margin: var(--padding);
        --lcs-padding: var(--padding);
        --lcs-padding-right: 0px;
        --lcs-margin-top: 0px;
        --lcs-margin-bottom: 0px;
        --lcs-height: calc(var(--lcsiw-width) + 2 * var(--padding));

/* light-control-select -- icon-window */

        --lcsiw-width: 42px;
        --lcsiw-margin-right: var(--padding);
        --lcsiw-outline-offset: var(--b-outline-offset);

/* light-control-select -- icon

        --lcsi-width: 20px;

/******************************************* light-control ************************************************************/

        --lc-padding: var(--padding);
        --lc-margin-left: var(--padding);
        --lc-margin-right: var(--padding);
        --lc-margin-bottom: var(--padding);

/**************************************** brightness-slider ***********************************************************/

        --bs-width: 440px;
        --bs-height: 90px;

/************************************************ slider **************************************************************/

        --slider-flex-flow: column nowrap;
        --slider-margin: 3%;
        --slider-margin-right: 10%;
        --slider-width: 20px;
        --slider-text-padding: 10px;
        --slider-text-offset: 6%;
        --slider-text-width: 20px;
        --slider-level-offset: 10%;
        --slider-level-height: 1.5%;

/*********************************************** climate **************************************************************/

        --c-height: var(--panel-height);
        --c-width: var(--panel-width);

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