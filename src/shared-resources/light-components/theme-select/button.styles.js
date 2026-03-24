import { css } from 'lit';

export default css`

    :host {
        margin: var(--theme-button-margin, 5px);
        width: var(--theme-button-width, 90px);
    }

    .option {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        padding-top: var(--theme-button-padding-top, 1px);
        padding-bottom: var(--theme-button-padding-bottom, 1px);
        outline-offset: var(--button-outline-offset, -3px);
        outline: none;
    }

`;