import { css } from 'lit';

export default css`

    :host {
        width: var(--offset-slider-width, 210px);
        height: var(--offset-slider-height, 210px);
        margin-bottom: var(--offset-slider-margin-bottom, 0px);
        padding: var(--offset-slider-padding, 15px);
        padding-left: var(--offset-slider-padding-left, 15px);
        padding-top: var(--offset-slider-padding-top, 0px);
        --slider-justify-content: flex-start;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;

    }

    .value {
        height: 13%;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: flex-start;
        font-weight: 700;
        font-size: 125%;
    }

    .bar {
        height: 84.5%;
    }

`;