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
        width: var(--thermostat-width, 80%);
        height: var(--thermostat-height, 350px);
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: center;
        position: relative;
    }

    .button-row {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        width: var(--adjust-button-row-width, 66%);
    }

`;