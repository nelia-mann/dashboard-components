import { css } from 'lit';

export default css`

    :host {

        --small-heading-font-size: var(--large-font);
        --small-heading-font-weight:  700;
        --sub-info-font-size: var(--normal-font);
        --sub-info-font-weight: 400;

        --ha-card-padding: 15px;
        --ha-card-height: var(--ipad-max-height);
        --ha-card-width: var(--ipad-max-width);

        --button-row-height: 60px;
        --button-row-width: 100%;

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

        --area-panel-width: 100%;
        --area-panel-height: 790px;
        --area-panel-flex-flow: row nowrap;
        --area-panel-justify-content: space-between;
        --area-panel-align-items: flex-start;

        --climate-panel-width: 380px;
        --climate-panel-height: 470px;
        --climate-panel-flex-flow: column nowrap;
        --climate-panel-justify-content: space-between;
        --climate-panel-align-items: center;
        --climate-panel-heading-font-size: var(--Large-font);
        --climate-panel-heading-font-weight: 550;

        --aux-panel-width: 450px;
        --aux-panel-height: var(--climate-panel-height);
        --aux-panel-flex-flow: column nowrap;
        --aux-panel-justify-content: space-between;
        --aux-panel-align-items: center;
        --aux-panel-heading-font-size: var(--climate-panel-heading-font-size);
        --aux-panel-heading-font-weight: var(--climate-panel-heading-font-weight);

        --aux-basement-panel-width: 620px;
        --aux-basement-panel-height: 750px;
        --aux-basement-panel-heading-font-size: var(--climate-panel-heading-font-size);
        --aux-basement-panel-heading-font-weight: var(--climate-panel-heading-font-weight);

        --mode-control-width: 95%;
        --mode-control-height: 50px;
        --mode-control-flex-flow: row nowrap;
        --mode-control-justify-content: space-around;
        --mode-control-align-items: flex-start;
        --mode-control-button-width: 55px;
        --mode-control-button-height: 40px;
        --mode-control-button-margin-correction-l: -10px;
        --mode-control-button-margin-correction-r: -14px;
        --mode-control-button-outline-offset: var(--button-outline-offset);

        --aux-mode-control-width: 100%;
        --aux-mode-control-height: var(--mode-control-height);
        --aux-mode-control-margin-bottom: 0px;
        --aux-mode-control-flex-flow: var(--mode-control-flex-flow);
        --aux-mode-control-justify-content: var(--mode-control-justify-content);
        --aux-mode-control-align-items: var(--mode-control-align-items);
        --aux-mode-control-button-width: var(--mode-control-button-width);
        --aux-mode-control-button-height: var(--mode-control-button-height);
        --aux-mode-control-button-margin-correction-r: -6px;
        --aux-mode-control-button-margin-correction-arrow-l: -10px;
        --aux-mode-control-button-outline-offset: var(--button-outline-offset);
        --aux-mode-control-font-size: var(--sub-info-font-size);
        --aux-mode-control-font-weight: var(--small-heading-font-weight);
        --tie-button-width: 120px;

        --thermostat-height: 350px;
        --thermostat-width: calc(0.95 * var(--thermostat-height));
        --thermostat-bottom-padding: 15px;
        --thermostat-margin-top: -15px;

        --circular-slider-height: 96%;
        --circular-slider-top-margin: 10px;

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

        --offset-slider-width: 55px;
        --offset-slider-padding: 10px;
        --offset-slider-padding-top: 0px;
        --offset-slider-padding-left: 10px;
        --offset-slider-height: calc(100% - 20px);
        --offset-slider-margin-bottom: 10px;

        --slider-margin: 5%;
        --slider-width: 100%;


    }
    `;