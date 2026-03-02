import { css } from 'lit';

export default css`

    :host {
        display: flex;
        flex-flow: var(--control-select-flex-flow, column nowrap);
        justify-content: var(--control-select-justify-content, space-around);
        align-items: var(--control-select-align-items, center);
        margin-left: var(--control-select-margin-left, 10px);
    }

    .icon {
        width: var(--control-select-icon-width, 30px);
        height: var(--control-select-icon-width, 30px);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: var(--control-select-icon-margin, 10px);
    }

    ha-svg-icon {
        --mdc-icon-size: var(--control-select-icon-size, 20px);
    }

`;