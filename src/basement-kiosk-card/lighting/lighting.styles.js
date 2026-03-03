import { css } from 'lit';

export default css`

    :host {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        height: var(--lighting-height, 485px);
        width: var(--lighting-width, 900px);
    }

`;