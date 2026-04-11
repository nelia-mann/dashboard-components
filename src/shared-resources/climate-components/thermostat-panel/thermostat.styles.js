import { css } from 'lit';

export default css`

    :host {
        width: var(--thermostat-width, 80%);
        height: var(--thermostat-height, 350px);
        padding-bottom: var(--thermostat-bottom-padding, 0px);
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        position: relative;
        margin-top: var(--thermostat-margin-top, 0px);
        margin-bottom: var(--thermostat-margin-bottom, 0px);
    }

    .button-row {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        width: var(--adjust-button-row-width, 85%);
    }

`;