import { css } from 'lit';

export default css`

    :host {
        width: var(--volume-slider-overall-width, 90%);
        height: var(--volume-slider-overall-height, 40px);
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-around;
        align-items: center;
    }

    input {
        width: var(--volume-slider-input-width, 70%);
        accent-color: rgba(0, 0, 0, .6);
    }

    .mute {
        border-radius: 50%;
        height: var(--mute-button-height, 30px);
        width: var(--mute-button-height, 30px);
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;        
    }


`;