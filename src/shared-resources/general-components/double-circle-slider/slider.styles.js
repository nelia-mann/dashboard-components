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
        height: 80px;
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
    }

    var {
        font-size: 300%;
        font-style: normal !important;
        font-weight: 400;
    }

    var.one {
        font-size: 400%;
    }

    .upper {
        margin-bottom: 0px;
        font-size: 150%;
    }

    .lower {
        margin-top: 0px;
        font-size: 150%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
    }

    sup {
        font-size: 150%;
        position: relative;
        top: -0.4em;
        line-height: 0;
    }

    sup.one {
        font-size: 200%;
    }

`