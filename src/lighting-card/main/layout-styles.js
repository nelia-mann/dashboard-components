import { css } from 'lit';

export default css`

    :host {

        --small-heading-font-size: var(--large-font);
        --small-heading-font-weight: 700;
        --sub-info-font-size: var(--normal-font);
        --sub-info-font-weight: 400;

        --ha-card-padding: 15px;
        --ha-card-height: var(--ipad-max-height);
        --ha-card-width: var(--ipad-max-width);

        --button-row-height: 60px;
        --button-row-width: 100%;

        --light-button-width: 200px;
        --light-button-padding: 5px;
        --light-button-heading-margin-top: 7px;
        --light-button-heading-margin-bottom: -7px;
        --light-button-sub-info-margin-top: 1px;
        --light-button-sub-info-margin-bottom: 10px;
        --light-button-heading-font-size: var(--small-heading-font-size);
        --light-button-heading-font-weight: var(--small-heading-font-weight);
        --light-button-sub-info-font-size: var(--sub-info-font-size);
        --light-button-sub-info-font-weight: var(--sub-info-font-weight);

        --floor-panel-width: 100%;
        --floor-panel-height: calc(var(--ha-card-height) - var(--button-row-height) - 2 * var(--ha-card-padding) - 50px);
        --floor-panel-flex-flow: column wrap;
        --floor-panel-justify-content: flex-start;
        --floor-panel-align-items: flex-start;

        --area-panel-margin-left: 10px;
        --area-panel-margin-right: 10px;
        --area-panel-margin-top: 20px;
        --area-heading-font-size: var(--large-font);
        --area-heading-font-weight: 700;

        --light-component-width: 250px;
        --light-component-height: 35px;
        --light-component-padding: 10px;
        --light-component-margin: 15px;

        --dialog-padding: 20px;
        --modal-header-height: 40px;
        --modal-header-margin-top: -10px;
        --modal-header-margin: 20px;
        --close-modal-icon-size: 40px;

        --simple-light-icons-margin-right: 10px;
        --simple-light-icons-margin-left: 0px;
        --simple-light-icon-size: 25px;
        --simple-light-font-size: var(--sub-info-font-size);
        --simple-light-font-weight: var(--sub-info-font-weight);
        --simple-light-align-items: center;
        --simple-light-justify-content: flex-start;

        --light-group-flex-flow: row nowrap;
        --light-group-justify-content: space-around;
        --light-group-align-items: center;

        --light-select-flex-flow: column nowrap;
        --light-select-align-items: flex-start;
        --light-select-justify-content: center;
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

        --wheel-width: 270px;
        --dot-width: 20px;

        --control-select-flex-flow: column nowrap;
        --control-select-justify-content: space-around;
        --control-select-align-items: center;
        --control-select-margin-left: 10px;
        --control-select-icon-window-width: 42px;
        --control-select-icon-window-margin: 10px;
        --control-select-icon-size: 20px;
        --control-select-outline-offset: -2px;

        --light-control-padding: 20px;
        --light-control-margin-left: 20px;
        --light-control-margin-right: 10px;

        --brightness-slider-width: var(--wheel-width);
        --brightness-slider-height: var(--wheel-width);

        --colortemp-slider-width: var(--wheel-width);
        --colortemp-slider-height: var(--wheel-width);

        --slider-margin: 5%;
        --slider-width: 40px;
        --slider-text-padding: 10px;
        --slider-text-offset: 6%;
        --slider-level-offset: 10%;
        --slider-level-height: 2%;

        --theme-select-flex-flow: column wrap;
        --theme-select-align-items: center;
        --theme-select-justify-content: flex-start;
        --theme-select-padding: 20px;
        --theme-select-margin-left: 20px;
        --theme-select-margin-right: 10px;
        --theme-select-height: 500px;
        --theme-select-width: 600px;

        --theme-button-padding-top: 4px;
        --theme-button-padding-bottom: 4px;
        --theme-button-margin: 7px;
        --theme-button-width: 120px;
        --theme-button-height: 30px;
        --theme-button-font-size: var(--sub-info-font-size);
        --theme-button-font-weight: var(--sub-info-font-weight);

    }
    `;