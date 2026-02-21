import { css } from 'lit';

export default css`
    dialog {
        padding: 20px;
        border: none;
    }

    dialog[open] {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }

    .modal-header {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        margin: 20px;
        margin-top: -10px;
        background: none;
        padding-top: none;
        padding-bottom: none;
        height: 40px;
        width: 100%;
    }

    .close-button {
        font-size: 15px;
        border: none;
        background: none;
    }

    light-group-control {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-around;
        align-items: center;
    }
`;