import { css } from 'lit';

export default css`

    :host {
        display: flex;
        flex-flow: var(--theme-select-flex-flow, column wrap);
        justify-content: var(--theme-select-justify-content, flex-start);
        align-items: var(--theme-select-align-items, center);
        width: var(--theme-select-width, 450px);
        height: var(--theme-select-height, 360px);
    }

`;