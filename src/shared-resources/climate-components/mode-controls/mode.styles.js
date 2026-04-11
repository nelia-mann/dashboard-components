import { css } from 'lit';

export default css`

    :host {
        width: var(--mode-control-width, 100%);
        height: var(--mode-control-height, 50px);
        display: flex;
        flex-flow: var(--mode-control-flex-flow, row nowrap);
        justify-content: var(--mode-control-justify-content, space-around);
        align-items: var(--mode-control-align-items, center);
        margin-top: var(--mode-control-margin-top, 0px);
    }

    .button {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        width: var(--mode-control-button-width, 60px);
        height: var(--mode-control-button-height, 100%);
        outline-offset: var(--mode-control-button-outline-offset, -3px);
        outline: none;
    }

    .center{
        margin-left: var(--mode-control-button-margin-correction-l, -10px);
        margin-right: var(--mode-control-button-margin-correction-r, -10px);
    }

`;