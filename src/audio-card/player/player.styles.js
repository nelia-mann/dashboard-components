import { css } from 'lit';

export default css`

    :host {
        height: var(--player-panel-height, 280px);
        width: var(--player-panel-width, 180px);
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: flex-start;
        padding: var(--player-panel-padding, 10px);
    }

    .art {
        width: var(--player-art-width, 100px);
        height: var(--player-art-height, 100px);
        object-fit: cover;
    }

    .speakerTiles{
    }

`;