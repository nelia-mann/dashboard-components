import { css } from 'lit';

export default css`

    :host {
        padding-top: var(--theme-button-padding-top, 1px);
        padding-bottom: var(--theme-button-padding-bottom, 1px);
        margin: var(--theme-button-margin, 5px);
        width: var(--theme-button-width, 90px);
    }

    .option {
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
    }

`;