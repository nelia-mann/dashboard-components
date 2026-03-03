import { css } from 'lit';

export default css`

    :host {
        width: var(--light-component-width, 180px);
        height: var(--light-component-height, 25px);
        padding: var(--light-component-padding, 8px);
        margin: var(--light-component-margin, 10px);
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
    }

`;