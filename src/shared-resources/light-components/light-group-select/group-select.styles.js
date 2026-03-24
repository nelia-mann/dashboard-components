    import { css } from 'lit';

export default css`

    :host {
        display: flex;
        flex-flow: var(--light-select-flex-flow, column nowrap);
        align-items: var(--light-select-align-items, flex-start);
        justify-content: var(--light-select-justify-content, center);
    }

    .light-inner {
        width: var(--light-select-innerlight-width, 180px);
        height: var(--light-select-innerlight-height, 25px);
        padding: var(--light-select-innerlight-padding, 10px);
        margin: var(--light-select-innerlight-margin, 10px);
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
        outline-offset: var(--button-outline-offset, -3px);
        outline: none;
    }

    .icon {
        margin: 0px;
        padding: 0px;
        margin-right: var(--light-select-icoc-margin-right, 10px);
        margin-left: var(--light-select-icoc-margin-left, 0px);
        width: var(--light-select-icon-size, 20px);
        height: var(--light-select-icon-size, 20px);
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
    }

`;