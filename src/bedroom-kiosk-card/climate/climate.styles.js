import { css } from 'lit';

export default css`

    :host {
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;
        align-items: center;
        height: var(--climate-height, 485px);
        width: var(--climate-width, 900px);
    }

`;