import { css } from 'lit';

export default css`

    :host {
        height: var(--circular-slider-height, 100%);
        width: var(--circular-slider-height, 100%);
        margin-top: var(--circular-slider-top-margin, 20px);
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        position: relative;
    }

    svg {
        height: 100%;
        width: 100%;
    }

    .arc {
        stroke-linecap: round;
        fill: none;
    }

    .info {
        position: absolute;
        pointer-events: none;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
    }

    .center {
        height: var(--center-text-height, 80px);
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        font-weight: var(--center-weight, 400)
    }

    var {
        font-size: var(--range-font-size, 300%);
        font-style: normal !important;
    }

    var.one {
        font-size: var(--solo-font-size, 400%);
    }

    .upper {
        font-size: var(--upper-font-size, 150%);
        font-weight: var(--upper-weight);
    }

    .lower {
        font-size: var(--lower-font-size, 150%);
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        font-weight: var(--lower-weight);
    }

    sup {
        font-size: calc(var(--range-font-size, 300%) / var(--sup-factor));
        position: relative;
        top: var(--superscript-offset, -0.4em);
        line-height: 0;
    }

    sup.one {
        font-size: calc(var(--solo-font-size, 400%) / var(--sup-factor));
    }

`