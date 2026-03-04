import { css } from 'lit';

export default css`

    :host {

        --ha-card-padding: 0px;
        --ha-card-padding-top: 0px;
        --ha-card-height: 585px;
        --ha-card-width: 920px;
        --ha-card-border-width: 0px;

        --button-row-height: 50px;
        --button-row-width: var(--ha-card-width);

        --light-button-width: 160px;
        --light-button-padding: 5px;
        --light-button-heading-margin-top: 7px;
        --light-button-heading-margin-bottom: -7px;
        --light-button-sub-info-margin-top: 1px;
        --light-button-sub-info-margin-bottom: 10px;

        --lighting-button-spacing: 15px;
        --lighting-height: calc(var(--ha-card-height) - var(--button-row-height) - var(--lighting-button-spacing));
        --lighting-width: var(--ha-card-width);

        --led-margin-top: 0px;
        --led-margin-right: 00px;
        --led-padding-left: 10px;
        --led-height: var(--lighting-height);
        --led-width: 640px;
        --led-large-heading-height: 40px;

        --floor-panel-width: 260px;
        --floor-panel-height: 100%;
        --floor-panel-flex-flow: column nowrap;
        --floor-panel-justify-content: flex-start;
        --floor-panel-align-items: flex-start;

        --area-panel-margin-left: 10px;
        --area-panel-margin-right: 10px;
        --area-panel-margin-top: 10px;

        --light-component-width: 180px;
        --light-component-height: 18px;
        --light-component-padding: 8px;
        --light-component-margin: 8px;

        --simple-light-icons-margin-right: 10px;
        --simple-light-icons-margin-left: 0px;
        --simple-light-icon-size: 20px;

        --light-group-flex-flow: column wrap;
        --light-group-justify-content: center;
        --light-group-align-items: flex-start;
        --light-group-height: calc(var(--led-height) - var(--led-large-heading-height));
        --light-group-width: 100%;

        --light-select-flex-flow: column nowrap;
        --light-select-align-items: flex-start;
        --light-select-justify-content: center;
        --light-select-innerlight-width: 140px;
        --light-select-innerlight-height: 20px;
        --light-select-innerlight-padding: 8px;
        --light-select-innerlight-margin: 5px;
        --light-select-innerlight-flex-flow: row nowrap;
        --light-select-icon-margin-right: 10px;
        --light-select-icon-margin-left: 10px;
        --light-select-icon-size: 20px;

        --control-select-flex-flow: row wrap;
        --control-select-justify-content: space-around;
        --control-select-align-items: center;
        --control-select-width: 150px;
        --control-select-height: 100px;
        --control-select-margin-left: 10px;
        --control-select-margin-top: 40px;
        --control-select-icon-window-width: 30px;
        --control-select-icon-window-margin: 10px;
        --control-select-icon-size: 20px;

        --light-control-padding: 10px;
        --light-control-margin-left: 20px;
        --light-control-margin-right: 10px;
        --light-control-minsize: 300px;

        --wheel-width: 400px;
        --dot-width: 20px;

        --brightness-slider-width: 210px;
        --brightness-slider-height: 400px;

        --colortemp-slider-width: 210px;
        --colortemp-slider-height: 400px;

        --slider-margin: 5%;
        --slider-width: 60px;
        --slider-text-padding: 10px;
        --slider-text-offset: 3%;
        --slider-level-offset: 10%;
        --slider-level-height: 2%;

        --theme-select-flex-flow: column wrap;
        --theme-select-align-items: center;
        --theme-select-justify-content: flex-start;
        --theme-select-topbottom-padding: 40px;
        --theme-select-height: calc(var(--light-group-height) - var(--theme-select-topbottom-padding));
        --theme-select-width:  420px;

        --theme-button-padding-top: 3px;
        --theme-button-padding-bottom: 3px;
        --theme-button-margin: 7px;
        --theme-button-width: 90px;
    }
    `