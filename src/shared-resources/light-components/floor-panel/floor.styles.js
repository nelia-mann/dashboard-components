import { css } from 'lit';

export default css`

    :host {
        width: var(--floor-panel-width, 100%);
        height: var(--floor-panel-height, 400px);
        display: flex;
        flex-flow: var(--floor-panel-flex-flow, column wrap);
        justify-content: var(--floor-panel-justify-content, flex-start);
        align-items: var(--floor-panel-align-items, flex-start);
    }

`;