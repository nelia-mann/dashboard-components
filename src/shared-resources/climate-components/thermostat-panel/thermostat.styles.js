import { css } from 'lit';

export default css`

    :host {
        width: var(--thermostat-width, 80%);
        height: var(--thermostat-height, 350px);
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: center;
        position: relative;
    }

`;