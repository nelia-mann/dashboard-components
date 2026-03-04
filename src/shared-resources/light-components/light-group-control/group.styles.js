    import { css } from 'lit';

export default css`

    :host {
        height: var(--light-group-height);
        width: var(--light-group-width);
        display: flex;
        flex-flow: var(--light-group-flex-flow, row nowrap);
        justify-content: var(--light-group-justify-content, space-around);
        align-items: var(--light-group-align-items, center);
    }

`;