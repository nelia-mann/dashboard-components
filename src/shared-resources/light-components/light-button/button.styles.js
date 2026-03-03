import { css } from 'lit';

export default css`

    :host {
        height: 100%;
        width: var(--light-button-width, 160px);
        padding: var(--light-button-padding, 5px);
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
    }

    .small-heading {
        margin-top: var(--light-button-heading-margin-top, 7px);
        margin-bottom: var(--light-button-heading-margin-bottom, -7px);
    }

    .sub-info {
        margin-bottom: var(--light-button-sub-info-margin-bottom, 10px);
        margin-top: var(--light-button-sub-info-margin-top, 1px);
    }

`;