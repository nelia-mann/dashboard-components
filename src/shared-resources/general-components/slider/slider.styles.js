import { css } from 'lit';

export default css`

    :host {
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: var(--slider-orientation, row nowrap);
        justify-content: var(--slider-justify-content, center);
        align-items: center;
    }

    .slider {
        position: relative;
        height: calc(100% - 2*var(--slider-margin, 5%));
        width: var(--slider-width, 40px);
        margin-left: var(--slider-text-padding, 5px);
        margin-right: var(--slider-text-padding, 5px);
        padding-top: var(--slider-margin, 5%);
        padding-bottom: var(--slider-margin, 5%);
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: center;
    }

    .slider.horizontal {
        width: calc(100% - 2*var(--slider-margin, 5%));
        height: var(--slider-width, 40px);
        margin-top: var(--slider-text-padding, 5px);
        margin-bottom: var(--slider-text-padding, 5px);
        padding-left: var(--slider-margin, 5%);
        padding-right: var(--slider-margin, 5%);
        flex-flow: row nowrap;
    }

    .inner-slider {
        position: absolute;
        top: var(--slider-margin, 5%);
        left: 0;
        width: 100%;
        height: calc(100% - 2*var(--slider-margin, 10%));
    }

    .inner-slider.horizontal {
        left: var(--slider-margin, 5%);
        top: 0;
        height: 100%;
        width: calc(100% - 2*var(--slider-margin, 5%));
    }

    .inner-slider.actual {
        opacity: 0;
        writing-mode: vertical-lr;
        direction: rtl;
    }

    .inner-slider.actual.horizontal {
        writing-mode: horizontal-tb;
        direction: ltr;
    }

    .inner-slider.shown {
        pointer-events: none;
    }

    .shown-level {
        position: absolute;
        left: calc(-1 * var(--slider-level-offset, 10%));
        width: calc(100% + 2 * var(--slider-level-offset, 10%));
        height: var(--slider-level-height, 2%);
        pointer-events: none;
    }

    .shown-level.horizontal {
        bottom: calc(-1 * var(--slider-level-offset, 10%));
        height: calc(100% + 2 * var(--slider-level-offset, 10%));
        width: var(--slider-level-height, 2%);
        pointer-events: none;
    }

    .values {
        position: relative;
        height: calc(100% - 2 * var(--slider-margin, 5%));
        margin-top: calc(var(--slider-text-offset, 5%) + var(--slider-margin, 5%));
        margin-bottom: calc(-1 * var(--slider-text-offset, 5%) + var(--slider-margin, 5%));
        width: var(--slider-text-width, 50px);
        pointer-events: none;
    }

    .values.horizontal {
        width: calc(100% - 2 * var(--slider-margin, 5%));
        margin-top: 0%;
        margin-bottom: 0%;
        margin-left: calc(-var(--slider-text-offset, -5%));
        margin-right: calc(var(--slider-text-offset, 5%));
        height: var(--slider-text-width, 50px);
    }

    .value {
        position: absolute;
        pointer-events: none;
    }

    .bottom.vertical {
        bottom: 0%;
        right: 0%;
    }

    .bottom.horizontal {
        left: 0%;
        top: 0%;
    }

    .top.vertical {
        bottom: 100%;
        right: 0%;
    }

    .top.horizontal {
        left: 100%;
        top: 0%;
    }

    .current {
        left: 0%;
    }

    .current.horizontal {
        bottom: 0%;
    }

`;