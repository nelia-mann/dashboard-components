import { css } from 'lit';

export default css`

    :host {

        --ha-card-padding: 15px;
        --ha-card-height: 500px;
        --ha-card-width: 800px;

        --button-row-height: 50px;
        --button-row-width: 100%;

        --climate-button-width: 160px;
        --climate-button-padding: 5px;
        --climate-button-heading-margin-top: 7px;
        --climate-button-heading-margin-bottom: -7px;
        --climate-button-sub-info-margin-bottom: 10px;
        --climate-button-sub-info-margin-top: 1px;

        --area-panel-width: 100%;
        --area-panel-height, 400px;
        --area-panel-flex-flow: row nowrap;
        --area-panel-justify-content: space-around;
        --area-panel-align-items: center;

        --climate-panel-width: 350px;
        --climate-panel-height: 100%;
        --climate-panel-flex-flow: column nowrap;
        --climate-panel-justify-content: space-between;
        --climate-panel-align-items: center;

        --mode-control-width: 95%;
        --mode-control-height: 50px;
        --mode-control-flex-flow: row nowrap;
        --mode-control-justify-content: space-around;
        --mode-control-align-items: flex-start;

        --mode-control-button-width: 55px;
        --mode-control-button-height: 40px;
        --mode-control-button-margin-correction-l: -10px;
        --mode-control-button-margin-correction-r: -14px;

        --thermostat-height: 350px;
        --thermostat-width: 100%;

        --circular-slider-height: 92%;
        --circular-slider-top-margin: 15px;

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

    }
    `;