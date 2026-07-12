import { css } from 'lit';

export default css`

    :host {
        width: var(--track-slider-overall-width, 90%);
        height: var(--track-slider-overall-height, 50px);
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;
        align-items: center;
    }

    .track {
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
    }

    .value {
        width: 10%;
        height: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
    }

    input {
        width: var(--track-slider-input-width, 80%);
        accent-color: rgba(0, 0, 0, .6);
    }


`;