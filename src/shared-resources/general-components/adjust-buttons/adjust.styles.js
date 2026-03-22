import { css } from 'lit';

export default css`

    :host {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        width: var(--adjust-pair-width, 95px);
        margin-top: var(--adjust-pair-margin-top, -15px);
    }

    .circle {
        border-radius: 50%;
        height: var(--plus-minus-circle-size, 40px);
        width: var(--plus-minus-circle-size, 40px);
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
    }

    ha-svg-icon {
        padding: 0%;
        margin: 0%;
        --mdc-icon-size: var(--plus-minus-sizes, 60%);
    }

`;