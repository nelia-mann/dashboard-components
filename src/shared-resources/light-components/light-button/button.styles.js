import { css } from 'lit';

export default css`

    :host {
        height: 100%;
        width: 160px;
        padding: 5px;
        border: none;
    }

    .button {
        height: 100%;
        width: 100%;
        padding: 0px;
        border: none;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
    }

    .small-heading {
        margin-top: 7px;
        margin-bottom: -7px;
    }

    .sub-info {
        margin-bottom: 10px;
        margin-top: 1px;
    }

`;