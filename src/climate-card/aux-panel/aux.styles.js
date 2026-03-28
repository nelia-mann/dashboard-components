import { css } from 'lit';

export default css`

    :host {
        width: var(--aux-panel-width, 350px);
        height: var(--aux-panel-height, 100%);
        display: flex;
        flex-flow: var(--aux-panel-flex-flow, column nowrap);
        justify-content: var(--aux-panel-justify-content, space-between);
        align-items: var(--aux-panel-align-items, center);
    }

    .button-row {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .heading {
        font-size: var(--aux-panel-heading-font-size, var(--large-font));
        font-weight: var(--aux-panel-heading-font-weight, 550);
    }


`;