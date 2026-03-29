import { css } from 'lit';

export default css`

    :host {
        margin-left: var(--area-panel-margin-left, 10px);
        margin-right: var(--area-panel-margin-right, 10px);
        margin-top: var(--area-panel-margin-top, 20px);
    }

    .heading {
        font-size: var(--area-heading-font-size, 100%);
        font-weight: var(--area-heading-font-weight, 700);
    }

`;