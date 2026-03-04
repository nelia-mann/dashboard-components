import { css } from 'lit';


export default css`

    :host {
        position: relative;
        width: var(--wheel-width, 210px);
        height: var(--wheel-width, 210px);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .wheel-background {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        border-radius: 50%;
        touch-action: none;
    }

    .dot {
        position: absolute;
        width: var(--dot-width, 20px);
        height: var(--dot-width, 20px);
        margin-left: calc(-1 * var(--dot-width, 20px) / 2);
        margin-top: calc(-1 * var(--dot-width, 20px) / 2);
        border-radius: 50%;
    }

`;