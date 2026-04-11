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
        --area-panel-height: calc(var(--ipad-max-height) - var(--button-row-height) - 3 * var(--ha-card-padding));
        --area-panel-flex-flow: row nowrap;
        --area-panel-justify-content: space-around;
        --area-panel-align-items: flex-start;

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

        --aux-panel-width: calc(var(--hp-panel-width) + var(--offset-slider-width) + var(--hp-panel-padding) + 2 * var(--slider-padding));
        --aux-panel-height: var(--hp-panel-height);
        --aux-panel-flex-flow: column nowrap;
        --aux-panel-justify-content: space-between;
        --aux-panel-align-items: center;
        --aux-panel-padding: var(--hp-panel-padding);
        --aux-panel-padding-top: 0px;
        --aux-panel-heading-font-size: var(--hp-panel-heading-font-size);
        --aux-panel-heading-font-weight: var(--hp-panel-heading-font-weight);
        --aux-panel-heading-height: var(--hp-panel-heading-height);
        --aux-panel-main-height: calc(var(--aux-panel-height) - var(--aux-panel-heading-height));
        --aux-panel-main-width: 100%;

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
        --tie-button-width: 140px;

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

        --slider-margin: 10px;
        --slider-width: 100%;

        --aux-basement-panel-width: calc(var(--ha-card-width) - var(--hp-panel-width) - 2 * var(--hp-panel-padding) - 2 * var(--ha-card-padding));
        --aux-basement-panel-height: calc(var(--aux-basement-panel-main-height) + var(--aux-basement-panel-heading-height) + var(--hp-panel-padding));
        --aux-basement-panel-margin-left: var(--hp-panel-padding);
        --aux-basement-panel-heading-font-size: var(--climate-panel-heading-font-size);
        --aux-basement-panel-heading-font-weight: var(--climate-panel-heading-font-weight);
        --aux-basement-panel-heading-height: 40px;

        --hp-panel-mini-padding: 10px;
        --thermostat-mini-width: 225px;
        --thermostat-mini-height: var(--thermostat-mini-width);
        --aux-panel-heading-mini-font-size: var(--large-font);
        --aux-panel-heading-mini-height: 30px;
        --aux-slider-mini-target-width: 65px;
        --aux-slider-mini-padding: var(--hp-panel-mini-padding);
        --tie-button-mini-width: 60px;
        --aux-mode-control-mini-button-width: 40px;
        --aux-mode-control-mini-button-margin-correction-r: -8px;
        --aux-mode-control-mini-button-margin-correction-l: -8px;

        --adjust-pair-mini-width: 75px;
        --adjust-pair-mini-margin-top: -25px;
        --plus-minus-mini-circle-size: 30px;
        --solo-mini-font-size: var(--Huge-font);
        --mini-center-text-height: 50px;
        --circular-slider-mini-height: calc(100% - 2 * var(--hp-panel-mini-padding));

        --iso-panel-padding: var(--hp-panel-mini-padding);
        --iso-panel-padding-top: 0px;
        --iso-panel-height: calc(var(--thermostat-mini-height) + var(--iso-mode-control-height) + var(--iso-panel-heading-height) + var(--iso-panel-padding));
        --iso-panel-width: var(--thermostat-mini-width);
        --iso-panel-flex-flow: column nowrap;
        --iso-panel-justify-content: flex-start;
        --iso-panel-align-items: center;

        --iso-panel-heading-font-size: var(--aux-panel-heading-mini-font-size);
        --iso-panel-heading-font-weight: var(--aux-panel-heading-font-weight);
        --iso-panel-heading-height: var(--aux-panel-heading-mini-height);

        --iso-mode-control-width: 100%;
        --iso-mode-control-height: var(--aux-mode-control-height);
        --iso-mode-control-flex-flow: row nowrap;
        --iso-mode-control-justify-content: space-between;
        --iso-mode-control-align-items: center;
        --iso-mode-control-button-width: 60px;
        --iso-mode-control-button-height: 100%;
        --iso-mode-control-button-outline-offset: var(--button-outline-offset);
        --iso-mode-control-button-margin-correction-arrow-l: -6px;
        --iso-mode-control-margin-top: var(--hp-panel-mini-padding);

        --hydrostat-width: var(--thermostat-mini-width);
        --hydrostat-height: var(--thermostat-mini-height);

        --aux-basement-panel-main-width: calc(100% - 2 * var(--hp-panel-padding));
        --aux-basement-panel-main-height: calc(2 * var(--iso-panel-height) + 2 * var(--hp-panel-padding) + 5px);
        --aux-basement-panel-elements-width: 100%;
        --aux-basement-panel-elements-height: calc(var(--iso-panel-height) + var(--hp-panel-mini-padding));
        --aux-basement-panel-elements-top-justify-content: center;
        --aux-basement-panel-elements-bottom-justify-content: space-between;

    }
    `;