import { css } from 'lit';

export default css`

    :host {


        --ipad-max-height: 900px;
        --ipad-max-width: 1250px;    
        --small-heading-font-size: var(--large-font);
        --small-heading-font-weight: 700;
        --sub-info-font-size: var(--normal-font);
        --sub-info-font-weight: 400;

/* calls to ha variables */

        --ha-card-border-width: 0px;
        --ha-card-background: transparent;

/* general settings */

        --padding: 15px;
        --mpadding: 10px;
        --control-width: 500px;
        --b-outline-offset: -3px; /* button outline offset */

/***************************************** main ***********************************************************************/

/* main -- ha-card */

        --hc-padding: 0px;
        --hc-height: var(--ipad-max-height);
        --hc-width: var(--ipad-max-width);

/* main -- button-row */

        --br-height: 55px;
        --br-width: 100%;

/************************************ lighting-button *****************************************************************/

/* lighting-button -- host */

        --lb-width: 200px;
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

/************************************** floor-panel *******************************************************************/

/* floor-panel -- host */

        --fp-width: 100%;
        --fp-height: calc(var(--hc-height) - var(--br-height) - var(--padding));

/* floor-panel -- special-panel */

        --fpsp-width: calc(var(--fp-width) - var(--alp-width));

/************************************ area-list-panel *****************************************************************/ 

/* area-list-panel -- host */

        --alp-height: 100%;
        --alp-width: calc(2 * var(--ap-width) + 2 * var(--padding));

/*************************************** area-panel *******************************************************************/

/* area-panel -- host */

        --ap-margin-left: 0px;
        --ap-margin-right: var(--padding);
        --ap-margin-top: 0px;
        --ap-width: calc(var(--lc-width) + 2 * var(--padding));

/* area-panel -- heading */

        --aph-font-size: var(--large-font);
        --aph-font-weight: 700;

/************************************ light-component *****************************************************************/

/* light-component -- host */

        --lc-width: 250px;
        --lc-height: 50px;
        --lc-padding: var(--mpadding);
        --lc-margin: var(--padding);

/* light-component -- light-element */

        --lcl-font-size: var(--sub-info-font-size);
        --lcl-font-weight: var(--sub-info-font-weight);
        --lcl-align-items: center;
        --lcl-justify-content: flex-start;

/* light-component -- icon */

        --lci-margin-right: var(--mpadding);
        --lci-icons-margin-left: 0px;
        --lci-width: 25px;

/************************************ light-group-control *************************************************************/

/* light-group-control -- host */

        --lg-width: calc(var--fpsp-width) - 2 * var(--padding));
        --lg-padding: var(--padding);
        --lg-padding-bottom: 0px;
        --lg-margin-top: var(--padding);
        --lg-margin-bottom: var(--padding);

/************************************* light-group-select *************************************************************/

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

/************************************** light-control-select **********************************************************/

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

/***************************************** light-control **************************************************************/

        --lc-padding: var(--padding);
        --lc-margin-left: var(--padding);
        --lc-margin-right: var(--padding);
        --lc-margin-bottom: var(--padding);

/****************************************** color-wheel ***************************************************************/

        --cw-width: var(--control-width);
        --cwd-width: 20px;

/**************************************** brightness-slider ***********************************************************/

        --bs-width: var(--control-width);
        --bs-height: 90px;

/**************************************** colortemp-slider ************************************************************/

        --cts-width: var(--control-width);
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

/****************************************** theme-select **************************************************************/

        --ts-flex-flow: column wrap;
        --ts-align-items: center;
        --ts-justify-content: flex-start;
        --ts-padding: calc(var(--padding) - var(--tb-margin));
        --ts-height: var(--control-width);
        --ts-width: 560px;

/****************************************** theme-button **************************************************************/

/* theme-button -- host */

        --tb-margin: 7px;
        --tb-width: 120px;
        --tb-height: 30px;

/* theme-button -- option */

        --tb-padding-bottom: 0px;
        --tb-padding-top: 0px;
        --tb-font-size: var(--sub-info-font-size);
        --tb-font-weight: var(--sub-info-font-weight);
        --tb-outline-offset: var(--b-outline-offset);

    }
    `;