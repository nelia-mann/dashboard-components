import { css } from 'lit';

export default css`

    :host {
        width: var(--aux-mode-control-width, 100%);
        height: var(--aux-mode-control-height, 50px);
        display: flex;
        flex-flow: var(--aux-mode-control-flex-flow, row nowrap);
        justify-content: var(--aux-mode-control-justify-content, space-around);
        align-items: var(--aux-mode-control-align-items, center);
    }

    .button {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        width: var(--aux-mode-control-button-width, 60px);
        height: var(--aux-mode-control-button-height, 100%);
        outline-offset: var(--aux-mode-control-button-outline-offset, -3px);
        outline: none;
    }

    .bigbutton {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        width: var(--tie-button-width, 140px);
        height: var(--aux-mode-control-button-height, 100%);
        outline-offset: var(--button-outline-offset, -3px);
        outline: none;
        font-size: var(--aux-mode-control-font-size, var(--normal-font));
        font-weight: var(--aux-mode-control-font-weight, 500);
    }

    .exclamation {
        margin-right: var(--aux-mode-control-button-margin-correction-r, -2px);
    }


`;