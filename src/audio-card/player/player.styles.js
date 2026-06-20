import { css } from 'lit';

export default css`

    :host {
        height: var(--player-panel-height, 300px);
        width: var(--player-panel-width, 200px);
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: center;
    }

`;