import { css } from 'lit';

export default css`

    :host {
        width: var(--iso-panel-width, 350px);
        height: var(--iso-panel-height, 100%);
        padding: var(--iso-panel-padding, 0px);
        padding-top: var(--iso-panel-padding-top, 0px);
        display: flex;
        flex-flow: var(--iso-panel-flex-flow, column nowrap);
        justify-content: var(--iso-panel-justify-content, flex-start);
        align-items: var(--iso-panel-align-items, center);
    }

    .heading {
        font-size: var(--iso-panel-heading-font-size, large-font);
        font-weight: var(--iso-panel-heading-font-weight, 550);
        height: var(--iso-panel-heading-height, 30px);
        margin-bottom: var(--iso-panel-heading-margin-bottom, 0px);
    }


`;