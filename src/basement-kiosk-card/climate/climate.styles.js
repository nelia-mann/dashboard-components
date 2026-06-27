import { css } from 'lit';

export default css`

    :host {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        height: var(--climate-height, 485px);
        width: var(--climate-width, 900px);
    }

`;