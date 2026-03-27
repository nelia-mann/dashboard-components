import { css } from 'lit';

export default css`

    :host {
        width: 350px;
        height: 100%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        align-items: center;
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
        justify-content: center;
        align-items: center;
        width: 100%;
    }


`;