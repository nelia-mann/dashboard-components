import { css } from 'lit';

export default css`

    :host {

        --aux-panel-width: 230px;
        --aux-panel-height: 320px;
        --aux-panel-heading-font-size: var(--large-font);
        --aux-mode-control-width: 98%;
        --aux-mode-control-height: 35px;
        --aux-mode-control-button-width: 45px;
        --aux-mode-control-button-height: 100%;
        --tie-button-width: 70px;
        --tie-button-height: var(--aux-mode-control-button-height);

        --thermostat-height: 220px;
        --thermostat-width: calc(0.95 * var(--thermostat-height));
        --center-text-height: 65px;

        width: var(--aux-panel-width, 350px);
        height: var(--aux-panel-height, 100%);
        display: flex;
        flex-flow: var(--aux-panel-flex-flow, column nowrap);
        justify-content: var(--aux-panel-justify-content, space-between);
        align-items: var(--aux-panel-align-items, center);
    }

    .heading {
        font-size: var(--aux-panel-heading-font-size, var(--large-font));
        font-weight: var(--aux-panel-heading-font-weight, 550);
    }


`;