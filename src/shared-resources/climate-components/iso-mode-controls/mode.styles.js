import { css } from 'lit';

export default css`

    :host {
        width: var(--iso-mode-control-width, 100%);
        height: var(--iso-mode-control-height, 50px);
        margin-top: var(--iso-mode-control-margin-top, 0px);
        display: flex;
        flex-flow: var(--iso-mode-control-flex-flow, row nowrap);
        justify-content: var(--iso-mode-control-justify-content, space-around);
        align-items: var(--aux-iso-control-align-items, center);
    }

    .button {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        width: var(--iso-mode-control-button-width, 60px);
        height: var(--iso-mode-control-button-height, 100%);
        outline-offset: var(--iso-mode-control-button-outline-offset, -3px);
        outline: none;
    }

    .center {
        margin-left: var(--iso-mode-control-button-margin-correction-arrow-l, -6px);
    }

`;