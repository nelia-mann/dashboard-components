import { css } from 'lit';

export default css`

    :host {
        width: var(--aux-basement-panel-width, 620px);
        height: var(--aux-basement-panel-height, 100%);
        margin-left: var(--aux-basement-panel-margin-left, 0px);
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: center;

        --hp-panel-padding: var(--hp-panel-mini-padding);
        --thermostat-width: var(--thermostat-mini-width);
        --thermostat-height: var(--thermostat-mini-height);

        --aux-panel-width: calc(var(--thermostat-width) + var(--offset-slider-width) + 2 * var(--slider-padding) + var(--hp-panel-padding));
        --aux-panel-height: calc(var(--thermostat-height) + var(--aux-mode-control-height) + var(--aux-panel-heading-height) + var(--hp-panel-padding));
        --aux-panel-padding: var(--hp-panel-padding);
        --aux-panel-heading-font-size: var(--aux-panel-heading-mini-font-size);
        --aux-panel-heading-height: var(--aux-panel-heading-mini-height);
        --aux-panel-main-height: calc(var(--aux-panel-height) - var(--aux-panel-heading-height));

        --offset-slider-width: calc(var(--aux-slider-mini-target-width) - 2 * var(--aux-slider-mini-padding));
        --slider-padding: var(--aux-slider-mini-padding);
        --tie-button-width: var(--tie-button-mini-width);
        --aux-mode-control-button-width: var(--aux-mode-control-mini-button-width);
        --aux-mode-control-button-margin-correction-r: var(--aux-mode-control-mini-button-margin-correction-r);
        --aux-mode-control-button-margin-correction-l: var(--aux-mode-control-mini-button-margin-correction-l);

        --adjust-pair-width: var(--adjust-pair-mini-width);
        --adjust-pair-margin-top: var(--adjust-pair-mini-margin-top);
        --plus-minus-circle-size: var(--plus-minus-mini-circle-size);

        --solo-font-size: var(--solo-mini-font-size);
        --center-text-height: var(--mini-center-text-height);

        --circular-slider-height: var(--circular-slider-mini-height);

    }

    .heading {
        font-size: var(--aux-basement-panel-heading-font-size, var(--Large-font));
        font-weight: var(--aux-basement-panel-heading-font-weight, 550);
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: flex-start;
        width: 100%;
        height: var(--aux-basement-panel-heading-height, 50px);
    }

    .main {
        display: flex;
        width: var(--aux-basement-panel-main-width, 100%);
        height: var(--aux-basement-panel-main-height, 700px);
        flex-flow: column nowrap;
        justify-content: space-between;
        align-items: center;
    }

    .elements {
        display: flex;
        width: var(--aux-basement-panel-elements-width, 100%);
        height: var(--aux-basement-panel-elements-height, 700px);
        flex-flow: row nowrap;
    }

    .top {
        justify-content: var(--aux-basement-panel-elements-top-justify-content);
    }

    .bottom {
        justify-content: var(--aux-basement-panel-elements-bottom-justify-content);
    }


`;