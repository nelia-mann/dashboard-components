import { css } from 'lit';

export default css`

    :host {

        --small-heading-font-size: var(--large-font);
        --small-heading-font-weight: 700;
        --sub-info-font-size: var(--normal-font);
        --sub-info-font-weight: 400;

        --ha-card-padding: 0px;
        --ha-card-padding-top: 0px;
        --ha-card-height: var(--largegalaxy-max-height);
        --ha-card-width: var(--largegalaxy-max-width);
        --ha-card-border-width: 0px;

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

        --climate-button-width: 200px;
        --climate-button-padding: 5px;
        --climate-button-heading-margin-top: 7px;
        --climate-button-heading-margin-bottom: -7px;
        --climate-button-sub-info-margin-bottom: 10px;
        --climate-button-sub-info-margin-top: 1px;
        --climate-button-heading-font-weight: var(--small-heading-font-weight);
        --climate-button-heading-font-size: var(--small-heading-font-size);
        --climate-button-sub-info-font-weight: var(--sub-info-font-weight);
        --climate-button-sub-info-font-size: var(--sub-info-font-size);

        --lighting-height: 670px;
        --lighting-width: var(--ha-card-width);
        --floor-panel-height: var(--lighting-height);
        --area-heading-font-size: 125%;
        --area-headint-font-weight: 700;

        --light-component-width: 250px;
        --light-component-height: 21px;
        --light-component-padding: 10px;
        --light-component-margin: 9px;

        --simple-light-icons-margin-right: 10px;
        --simple-light-icons-margin-left: 0px;
        --simple-light-icon-size: 25px;
        --simple-light-font-size: 125%;
        --simple-light-font-weight: var(--sub-info-font-weight);
        --simple-light-align-items: center;
        --simple-light-justify-content: flex-start;

        --light-group-control-padding-top: 20px;
        --light-group-control-padding-bottom: var(--light-group-control-padding-top);

        --light-group-height: calc(var(--lighting-height) - 2 * var(--light-group-control-padding-top));
        --light-group-width: 900px;
        --light-group-flex-flow: column nowrap;
        --light-group-justify-content: flex-start;
        --light-group-align-items: center;
        --light-group-margin-top: 0px;

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

        --wheel-width: 360px;
        --dot-width: 30px;

        --control-select-flex-flow: row nowrap;
        --control-select-justify-content: space-around;
        --control-select-align-items: center;
        --control-select-margin-left: 10px;
        --control-select-margin-top: 10px;
        --control-select-icon-window-width: 42px;
        --control-select-icon-window-margin: 10px;
        --control-select-icon-size: 20px;
        --control-select-outline-offset: -2px;

        --light-control-padding: 30px;
        --light-control-margin-left: 20px;
        --light-control-margin-right: 20px;
        --light-control-margin: 35px;

        --brightness-slider-width: 800px;
        --brightness-slider-height: 100px;

        --colortemp-slider-width: var(--brightness-slider-width);
        --colortemp-slider-height: 100px;

        --slider-orientation: column nowrap;
        --slider-margin: 3%;
        --slider-width: 5px;
        --slider-text-padding: 10px;
        --slider-text-offset: 1%;
        --slider-text-width: 20px;
        --slider-level-offset: 10%;
        --slider-level-height: 1%;

        --theme-select-flex-flow: column wrap;
        --theme-select-align-items: center;
        --theme-select-justify-content: flex-start;
        --theme-select-padding: 0px;
        --theme-select-height: 380px;
        --theme-select-width: 800px;

        --theme-button-padding-top: 7px;
        --theme-button-padding-bottom: 7px;
        --theme-button-margin: 7px;
        --theme-button-width: 120px;
        --theme-button-height: 40px;
        --theme-button-font-size: var(--sub-info-font-size);
        --theme-button-font-weight: var(--sub-info-font-weight);

        --climate-height: var(--lighting-height);
        --climate-width: var(--lighting-width);

        --hp-panel-width: 360px;
        --hp-panel-height: calc(var(--thermostat-height) + var(--mode-control-height) + var(--hp-panel-heading-height) + var(--hp-panel-padding));
        --hp-panel-flex-flow: column nowrap;
        --hp-panel-justify-content: flex-start;
        --hp-panel-align-items: center;
        --hp-panel-heading-font-size: var(--Large-font);
        --hp-panel-heading-font-weight: 550;
        --hp-panel-heading-height: 40px;
        --hp-panel-padding: 15px;
        --hp-panel-padding-top: 0px;

        --mode-control-width: 100%;
        --mode-control-height: 40px;
        --mode-control-margin-top: var(--hp-panel-padding);
        --mode-control-flex-flow: row nowrap;
        --mode-control-justify-content: space-between;
        --mode-control-align-items: center;
        --mode-control-button-width: 55px;
        --mode-control-button-height: 100%;
        --mode-control-button-margin-correction-l: -10px;
        --mode-control-button-margin-correction-r: -14px;
        --mode-control-button-outline-offset: var(--button-outline-offset);

        --thermostat-width: var(--hp-panel-width);
        --thermostat-height: var(--hp-panel-width);
        --thermostat-bottom-padding: 0px;
        --thermostat-margin-top: 0px;
        --thermostat-margin-bottom: 0px;

        --circular-slider-height: calc(100% - 2 * var(--hp-panel-padding));
        --circular-slider-top-margin: 0px;
        --adjust-button-row-width: 85%;
        --adjust-pair-width: 110px;
        --adjust-pair-margin-top: -40px;
        --plus-minus-circle-size: 40px;
        --plus-minus-sizes: 60%;
        --range-font-size: var(--Huge-font);
        --solo-font-size: var(--HUGE-font);
        --upper-font-size: var(--large-font);
        --lower-font-size: var(--large-font);
        --superscript-offset: -0.5em;
        --center-text-height: 80px;
        --upper-weight: 500;
        --lower-weight: 400;
        --center-weight: 400;
        --sup-factor: 2.5;

        --aux-basement-panel-width: calc(var(--ha-card-width) - var(--hp-panel-width) - 2 * var(--hp-panel-padding) - 2 * var(--ha-card-padding));
        --aux-basement-panel-height: 100%;
        --aux-basement-panel-margin-left: var(--hp-panel-padding);

        --aux-basement-panel-heading-font-size: var(--climate-panel-heading-font-size);
        --aux-basement-panel-heading-font-weight: var(--climate-panel-heading-font-weight);
        --aux-basement-panel-heading-height: 40px;

        --aux-basement-panel-main-width: calc(100% - 2 * var(--hp-panel-padding));
        --aux-basement-panel-main-height: calc(100% - var(--aux-basement-panel-heading-height) - var(--hp-panel-mini-padding));
        --aux-basement-panel-elements-width: 100%;
        --aux-basement-panel-elements-height: calc(50% - .5 * var(--hp-panel-mini-padding));
        --aux-basement-panel-elements-top-justify-content: center;
        --aux-basement-panel-elements-bottom-justify-content: space-between;

        --aux-panel-height-2: calc(100% - var(--hp-panel-mini-padding));
        --aux-panel-width-2: 410px;

        --aux-panel-flex-flow: column nowrap;
        --aux-panel-justify-content: space-between;
        --aux-panel-align-items: center;
        --aux-panel-padding-top: 0px;
        --aux-panel-heading-font-size: var(--hp-panel-heading-font-size);
        --aux-panel-heading-font-weight: var(--hp-panel-heading-font-weight);
        --aux-panel-heading-height: var(--hp-panel-heading-height);
        --aux-panel-main-height: calc(var(--aux-panel-height) - var(--aux-panel-heading-height));
        --aux-panel-main-width: 100%;

        --aux-thermostat-layout: row nowrap;

        --aux-mode-control-width: 80px;
        --aux-mode-control-height: var(--thermostat-mini-height);
        --aux-mode-control-margin-bottom: 0px;
        --aux-mode-control-flex-flow: column nowrap;
        --aux-mode-control-justify-content: space-between;
        --aux-mode-control-align-items: center;
        --aux-mode-control-mini-button-width: 60px;
        --aux-mode-control-button-height: 50px;
        --aux-mode-control-button-margin-correction-r: -6px;
        --aux-mode-control-button-margin-correction-arrow-l: -10px;
        --aux-mode-control-button-outline-offset: var(--button-outline-offset);
        --aux-mode-control-font-size: var(--sub-info-font-size);
        --aux-mode-control-font-weight: var(--small-heading-font-weight);
        --tie-button-mini-width: 60px;

        --thermostat-mini-width: 260px;
        --thermostat-mini-height: var(--thermostat-mini-width);

        --offset-slider-width: calc(75px - 2 * var(--slider-padding));
        --slider-padding: 10px;
        --offset-slider-padding-left: var(--slider-padding);
        --offset-slider-padding-right: var(--slider-padding);
        --offset-slider-padding-bottom: var(--slider-padding);
        --offset-slider-height: calc(100% - var(--slider-padding));

        --offset-slider-value-height: 45px;
        --offset-slider-value-font-size: var(--normal-font);
        --offset-slider-value-font-weight: 700;
        --offset-slider-bar-height: calc(100% - var(--offset-slider-value-height));

        --slider-width: 100%;
        --slider-width-for-offset: 40px;

        --hp-panel-mini-padding: 10px;
        --aux-panel-heading-mini-font-size: var(--large-font);
        --aux-panel-heading-mini-height: 30px;
        --aux-slider-mini-target-width: 65px;
        --aux-slider-mini-padding: var(--hp-panel-mini-padding);
        --aux-mode-control-mini-button-margin-correction-r: -8px;
        --aux-mode-control-mini-button-margin-correction-l: -8px;

        --adjust-pair-mini-width: 95px;
        --adjust-pair-mini-margin-top: -35px;
        --plus-minus-mini-circle-size: 40px;
        --solo-mini-font-size: var(--Huge-font);
        --mini-center-text-height: 50px;
        --circular-slider-mini-height: calc(100% - 2 * var(--hp-panel-mini-padding));

        --iso-panel-padding: var(--hp-panel-mini-padding);
        --iso-panel-padding-top: 0px;
        --iso-panel-height: calc(100% - var(--hp-panel-mini-padding));
        --iso-panel-width: calc(var(--thermostat-mini-width) + var(--iso-mode-control-width));
        --iso-panel-flex-flow: column wrap;
        --iso-panel-justify-content: flex-start;
        --iso-panel-align-items: center;

        --iso-panel-heading-font-size: var(--aux-panel-heading-mini-font-size);
        --iso-panel-heading-font-weight: var(--aux-panel-heading-font-weight);
        --iso-panel-heading-height: var(--aux-panel-heading-mini-height);

        --iso-mode-control-width: 60px;
        --iso-mode-control-height: var(--aux-mode-control-height);
        --iso-mode-control-flex-flow: column nowrap;
        --iso-mode-control-justify-content: space-around;
        --iso-mode-control-align-items: flex-end;
        --iso-mode-control-button-width: 50px;
        --iso-mode-control-button-height: 50px;
        --iso-mode-control-button-outline-offset: var(--button-outline-offset);
        --iso-mode-control-button-margin-correction-arrow-l: -6px;
        --iso-mode-control-margin-top: 30px;
        --iso-panel-heading-margin-bottom: 5px;
        --aux-iso-control-align-items: flex-end;

        --hydrostat-width: var(--thermostat-mini-width);
        --hydrostat-height: var(--thermostat-mini-height);

    }
    `