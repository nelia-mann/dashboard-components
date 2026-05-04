import { css } from 'lit';

export default css`

    :host {
        margin-left: var(--area-panel-margin-left, 10px);
        margin-right: var(--area-panel-margin-right, 10px);
        margin-top: var(--area-panel-margin-top, 20px);
        width: var(--area-panel-basic-width);
        height: var(--area-panel-basic-height);
        padding: var(--area-panel-basic-padding, 0px);
        display: flex;
        flex-flow: column nowrap;
        justify-content: var(--area-panel-basic-justify-content);
        align-items: var(--area-panel-basic-align-items);
    }

    .heading {
        font-size: var(--area-heading-font-size, 100%);
        font-weight: var(--area-heading-font-weight, 700);
    }

`;