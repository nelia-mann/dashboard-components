import { css } from 'lit';

export default css`

    :host {
    }

    dialog {
        padding: var(--dialog-padding, 20px);
        border: none;
    }

    dialog[open] {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        overflow: hidden;
    }

    dialog > * {
        min-height: 0;
    }

    .modal-header {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        margin: var(--modal-header-margin, 20px);
        margin-top: var(--modal-header-margin-top, -10px);
        height: var(--modal-header-height, 40px);
        width: 100%;
        background: none;
    }

    .icon {
        margin: 0px;
        padding: 0px;
        width: var(--close-modal-icon-size, 20px);
        height: var(--close-modal-icon-size, 20px);
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
    }

`;