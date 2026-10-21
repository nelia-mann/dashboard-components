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
        --control-width: 440px;    

/************************************************** main **************************************************************/

        --hc-padding: 0px;
        --hc-padding-top: 0px;
        --hc-height: var(--largegalaxy-max-height);
        --hc-width: var(--largegalaxy-max-width);

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

        --l-height: calc(var(--hc-height) - var(--br-height) - var(--padding));
        --l-width: var(--hc-width);

/************************************ area-list-panel *****************************************************************/ 

/* area-list-panel -- host */

        --alp-height: 100%;
        --alp-width: calc(2 * var(--ap-width) + 2 * var(--padding));
        --alp-justify-content: space-between;

/********************************************** area-panel ************************************************************/

/* area-panel -- host */

        --ap-margin-left: 0px;
        --ap-margin-right: var(--padding);
        --ap-margin-top: 0px;
        --ap-width: calc(var(--lc-width) + 2 * var(--padding));

/* area-panel -- heading */

        --aph-font-size: var(--large-font);
        --aph-font-weight: 700;

/******************************************** light-component *********************************************************/

/* light-component -- host */

        --lc-width: 250px;
        --lc-height: 50px;
        --lc-padding: var(--mpadding);
        --lc-margin: var(--padding);
        --lc-margin-bottom: 0px;

/* light-component -- light-element */

        --lcl-font-size: var(--sub-info-font-size);
        --lcl-font-weight: var(--sub-info-font-weight);
        --lcl-align-items: center;
        --lcl-justify-content: flex-start;

/* light-component -- icon */

        --lci-margin-right: var(--mpadding);
        --lci-icons-margin-left: 0px;
        --lci-width: 25px;

/******************************************* light-group-control ******************************************************/

/* light-group-control -- host */

        --lg-width: calc(var--fpsp-width) - 2 * var(--padding));
        --lg-height: 100%;
        --lg-padding: var(--padding);
        --lg-padding-bottom: var(--padding);
        --lg-margin-top: var(--padding);
        --lg-margin-bottom: var(--padding);


/* light-group-controls -- controls */

        --lgcc-height: 440px;

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

/*************************************** light-select-control *********************************************************/

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

        --lc-padding: 0px;
        --lc-margin-left: 0px;
        --lc-margin-right: 0px;
        --lc-margin-bottom: 0px;

/****************************************** color-wheel ***************************************************************/

        --cw-width: var(--control-width);
        --cwd-width: 20px;

/**************************************** brightness-slider ***********************************************************/

        --bs-width: calc(var(--control-width) + 6 * var(--padding));
        --bs-height: 120px;

/**************************************** colortemp-slider ************************************************************/

        --cts-width: var(--bs-width);
        --cts-height: var(--bs-height);

/******************************************** slider ******************************************************************/

        --slider-flex-flow: column nowrap;
        --slider-margin: 3%;
        --slider-margin-right: 10%;
        --slider-width: 20px;
        --slider-text-padding: 10px;
        --slider-text-offset: 6%;
        --slider-text-width: 20px;
        --slider-level-offset: 10%;
        --slider-level-height: 1.5%;

/******************************************** theme-select ************************************************************/

        --ts-flex-flow: column wrap;
        --ts-align-items: center;
        --ts-justify-content: flex-start;
        --ts-padding: var(--padding);
        --ts-height: 440px;
        --ts-width: 720px;

/******************************************** theme-button ************************************************************/

/* theme-button -- host */

        --tb-margin: 9px;
        --tb-width: 120px;
        --tb-height: 30px;

/* theme-button -- option */

        --tb-padding-bottom: 0px;
        --tb-padding-top: 0px;
        --tb-font-size: var(--sub-info-font-size);
        --tb-font-weight: var(--sub-info-font-weight);
        --tb-outline-offset: var(--b-outline-offset);

/********************************************** climate ***************************************************************/

        --c-height: var(--l-height);
        --c-width: var(--l-width);

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

        --auxbpet-justify-content: center;

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