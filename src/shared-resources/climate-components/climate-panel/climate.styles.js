import { css } from 'lit';

export default css`

    :host {
        width: var(--climate-panel-width, 350px);
        height: var(--climate-panel-height, 100%);
        display: flex;
        flex-flow: var(--climate-panel-flex-flow, column nowrap);
        justify-content: var(--climate-panel-justify-content, space-between);
        align-items: var(--climate-panel-align-items, center);
    }

    .thermostat {
        width: 100%;
        height: 350px;
    }

`;