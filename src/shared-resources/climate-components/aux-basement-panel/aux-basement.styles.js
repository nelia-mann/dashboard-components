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

        --aux-panel-width: 250px;
        --aux-panel-height: 320px;
        --aux-panel-heading-font-size: var(--large-font);
        --aux-mode-control-width: 98%;
        --aux-mode-control-height: 35px;
        --aux-mode-control-button-width: 45px;
        --aux-mode-control-button-height: 100%;
        --tie-button-width: 70px;
        --tie-button-height: var(--aux-mode-control-button-height);

        --thermostat-height: 220px;
        --thermostat-width: 90%;
        --center-text-height: 65px;

        --adjust-pair-width: 85px;
        --adjust-pair-margin-top: -25px;
        --plus-minus-circle-size: 35px;
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