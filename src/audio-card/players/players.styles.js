import { css } from 'lit';

export default css`

    :host {
        height: 100%;
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
    }

    .main {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-around;
        align-items: flex-start;
        height: 100%;
        width: var(--main-player-panel-width, 75%);        
    }

    .side {
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: center;
        height: 100%;
        width: var(--side-player-panel-width, 25%);
    }

    .empty {
        height: var(--player-panel-height, 300px);
        width: var(--player-panel-width, 200px);
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: center;
    }

`;