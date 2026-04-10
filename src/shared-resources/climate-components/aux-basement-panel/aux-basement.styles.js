import { css } from 'lit';

export default css`

    :host {
        width: var(--aux-basement-panel-width, 620px);
        height: var(--aux-basement-panel-height, 100%);
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;
        align-items: center;

        --aux-panel-justify-content: space-around;

        --aux-panel-width: 320px;
        --aux-panel-height: 320px;
        --aux-panel-heading-font-size: var(--large-font);
        --aux-mode-control-width: 98%;
        --aux-mode-control-height: 40px;
        --aux-mode-control-button-width: 45px;
        --aux-mode-control-button-height: 100%;
        --tie-button-width: 90px;
        --tie-button-height: var(--aux-mode-control-button-height);

        --thermostat-height: 220px;
        --thermostat-width: calc(0.95 * var(--thermostat-height));
        --center-text-height: 65px;

        --adjust-pair-width: 85px;
        --adjust-pair-margin-top: -25px;
        --plus-minus-circle-size: 35px;

        --offset-slider-width: 60px;
        --offset-slider-padding: 10px;
        --offset-slider-height: calc(var(--thermostat-height) + var(--thermostat-bottom-padding) - 2 * var(--offset-slider-padding));
        --offset-slider-margin-top: var(--thermostat-margin-top);

        --slider-value-right: 12px;
        --slider-value-margin-top: 12px;
    }

    .heading {
        font-size: var(--aux-basement-panel-heading-font-size, var(--Large-font));
        font-weight: var(--aux-basement-panel-heading-font-weight, 550);
    }

    .elements {
        display: flex;
        width: 95%;
        height: 700px;
        flex-flow: row wrap;
        justify-content: space-around;
    }


`;