import { css } from 'lit';

export default css`

    :host {
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
    }

    .values {
        height: 100%;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: center;
    }

    .slider {
        height: 100%;
        width: var(--slider-width, 40px);
        margin-left: var(--slider-text-padding, 5px);
        margin-right: var(--slider-text-padding, 5px);
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: center;
        touch-action: none;
    }

    .pad {
        width: 100%;
        height: var(--slider-margin, 5%);
    }

    .inner-slider {
        position: relative;
        height: calc(100% - 2 * var(--slider-margin, 5%));
        width: 100%;
    }

    .pad-top {
        width: 100%;
        height: calc(var(--slider-text-offset, 5%) + var(--slider-margin, 5%));
    }

    .inner-values {
        position: relative;
        height: calc(100% - 2 * var(--slider-margin, 5%));
        width: 100%;
    }

    .pad-bottom {
        width: 100%;
        height: calc(-1 * var(--slider-text-offset, 5%) + var(--slider-margin, 5%));
    }

    .actual-slider {
        position: absolute;
        opacity: 0;
        top: 0;
        left: 0;
        width: 100%;
        writing-mode: vertical-lr;
        direction: rtl;
        height: 100%;
    }

    .shown-slider {
        position: absolute;
        top: 0%;
        left: 0%;
        width: 100%;
        height: 100%;
    }

    .shown-level {
        position: absolute;
        left: calc(-1 * var(--slider-level-offset, 10%));
        width: calc(100% + 2 * var(--slider-level-offset, 10%));
        height: var(--slider-level-height, 2%);
}

    .bottom-value {
        position: absolute;
        bottom: 0%;
        right: 0%;
    }

    .top-value {
        position: absolute;
        bottom: 100%;
        right: 0%;
    }

    .current-value {
        position: absolute;
    }

`;