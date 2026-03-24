import { css } from 'lit';

export default css`

    :host {
        height: 100%;
        width: var(--climate-button-width, 160px);
        padding: var(--cliamte-button-padding, 5px);
        border: none;
    }

    .button {
        height: 100%;
        width: 100%;
        display: flex;
        border: none;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        outline-offset: var(--button-outline-offset, -3px);
        outline: none;
    }

    .small-heading {
        margin-top: var(--climate-button-heading-margin-top, 7px);
        margin-bottom: var(--climate-button-heading-margin-bottom, -7px);
    }

    .sub-info {
        margin-bottom: var(--climate-button-sub-info-margin-bottom, 10px);
        margin-top: var(--climate-button-sub-info-margin-top, 1px);
    }

`;