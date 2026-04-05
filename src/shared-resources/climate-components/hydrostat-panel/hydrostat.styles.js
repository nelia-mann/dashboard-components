import { css } from 'lit';

export default css`

    :host {
        width: var(--thermostat-width, 80%);
        height: var(--thermostat-height, 350px);
        padding-bottom: var(--thermostat-bottom-padding, 20px);
        display: flex;
        flex-flow: column nowrap;
        justify-content: var(--climate-panel-justify-content, space-between);
        align-items: center;
        position: relative;
        margin-top: var(--thermostat-margin-top, -10px);
    }

    .button-row {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: center;
        width: var(--adjust-button-row-width, 85%);
    }

`;