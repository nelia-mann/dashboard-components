import { css } from 'lit';

export default css`

    :host {
        margin-top: var(--led-margin-top, 10px);
        margin-right: var(--led-margin-right, 10px);
        padding-left: var(--led-padding-left, 10px);
        height: var(--led-height, 100%);
        width: var(--led-width, 640px);
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        align-items: center;
    }

    .large-heading {
        height: var(--led-large-heading-height, 40px);
        font-size: var(--led-large-heading-font-size, 100%);
        font-weight: var(--led-large-heading-font-weight, 700);
    }

`;