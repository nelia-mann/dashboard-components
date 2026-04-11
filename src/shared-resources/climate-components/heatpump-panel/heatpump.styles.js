import { css } from 'lit';

export default css`

    :host {
        width: var(--hp-panel-width, 350px);
        height: var(--hp-panel-height, 100%);
        display: flex;
        flex-flow: var(--hp-panel-flex-flow, column nowrap);
        justify-content: var(--hp-panel-justify-content, space-between);
        align-items: var(--hp-panel-align-items, center);
        padding: var(--hp-panel-padding, 0px);
        padding-top: var(--hp-panel-padding-top, 0px);
    }

    .heading {
        font-size: var(--hp-panel-heading-font-size, var(--large-font));
        font-weight: var(--hp-panel-heading-font-weight, 550);
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: flex-start;
        width: 100%;
        height: var(--hp-panel-heading-height, 50px);
    }

`;