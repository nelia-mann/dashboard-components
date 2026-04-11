import { css } from 'lit';

export default css`

    :host {
        width: var(--hydrostat-width, 200px);
        height: var(--hydrostat-height, 200px);
        padding-bottom: var(--hydrostat-bottom-padding, 0px);
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        position: relative;
        margin-top: var(--hydrostat-margin-top, 0px);
        margin-bottom: var(--hydrostat-margin-botton, 0px);
    }

    .button-row {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: center;
        width: var(--hydrostat-adjust-button-row-width, 85%);
    }

`;