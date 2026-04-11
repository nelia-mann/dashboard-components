import { css } from 'lit';

export default css`

    :host {
        width: var(--area-panel-width, 100%);
        height: var(--area-panel-height, 400px);
        display: flex;
        flex-flow: var(--area-panel-flex-flow, column wrap);
        justify-content: var(--area-panel-justify-content, flex-start);
        align-items: var(--area-panel-align-items, flex-start);
    }

`;