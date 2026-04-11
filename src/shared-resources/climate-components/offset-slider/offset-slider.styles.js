import { css } from 'lit';

export default css`

    :host {
        width: var(--offset-slider-width, 210px);
        height: var(--offset-slider-height, 210px);
        padding-left: var(--offset-slider-padding-left, 0px);
        padding-right: var(--offset-slider-padding-right, 0px);
        padding-bottom: var(--offset-slider-padding-bottom, 0px);
        --slider-justify-content: flex-start;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;

    }

    .value {
        height: var(--offset-slider-value-height, 50px);
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: flex-start;
        font-weight: var(--offset-slider-value-font-weight);
        font-size: var(--offset-slider-value-font-size);
    }

    .bar {
        height: var(--offset-slider-bar-height, 100%);
    }

`;