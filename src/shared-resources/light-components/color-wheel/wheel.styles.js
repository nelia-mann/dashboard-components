import { css } from 'lit';


export default css`

    :host {
        position: relative;
        width: var(--wheel-width);
        height: var(--wheel-width);
        margin-left: var(--wheel-left-margin);
        margin-right: var(--wheel-right-margin);
        padding: var(--wheel-padding);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .wheel {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .wheel-background {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        border-radius: 50%;
    }

    .dot {
        position: absolute;
        width: var(--dot-width);
        height: var(--dot-width);
        margin-left: var(--margin-fix);
        margin-top: var(--margin-fix);
        border-radius: 50%;
    }

`;