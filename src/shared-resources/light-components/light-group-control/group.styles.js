    import { css } from 'lit';

export default css`

    :host {
        height: var(--light-group-height, 100%);
        width: var(--light-group-width, 100%);
        display: flex;
        flex-flow: var(--light-group-flex-flow, row nowrap);
        justify-content: var(--light-group-justify-content, space-around);
        align-items: var(--light-group-align-items, center);
    }

    .test {
        height: 200px;
        width: 300px;
        outline: solid;
    }



`;