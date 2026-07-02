import { css } from 'lit';

export default css`

    :host {
        height: var(--player-panel-height, 280px);
        width: var(--player-panel-width, 180px);
        position: relative;
    }

    .player {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        align-items: center;
        padding: var(--player-panel-padding, 10px);
        overflow: hidden;
        background-size: contain;
    }

    .initials {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        font-size: var(--player-BGInits-size, 100%);
    }

    .speakerTiles{
        width: calc(100% - 2 * var(--player-speakers-margin, 5%));
        display: flex;
        flex-flow: row wrap;
        justify-content: space-around;
        align-items: flex-start;
    }

`;