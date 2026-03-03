import { css } from 'lit';

export default css`

    :host {
        display: flex;
        flex-flow: var(--control-select-flex-flow, column nowrap);
        justify-content: var(--control-select-justify-content, space-around);
        align-items: var(--control-select-align-items, center);
        margin-left: var(--control-select-margin-left, 10px);
        margin-top: var(--control-select-margin-top, 0px);
        width: var(--control-select-width, 100%);
        height: var(--control-select-height, 100%);
    }

    .icon-window {
        width: var(--control-select-icon-window-width, 30px);
        height: var(--control-select-icon-window-width, 30px);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: var(--control-select-icon-window-margin, 10px);
    }

    .icon {
        width: var(--control-select-icon-size, 20px);
        height: var(--control-select-icon-size, 20px);
        margin: 0px;
        padding: 0px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
    }

    ha-svg-icon {
        --mdc-icon-size: 100%;
    }

`;