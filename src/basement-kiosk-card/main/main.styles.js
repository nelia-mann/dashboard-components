import { css } from 'lit';

export default css`

    :host {
        --wheel-width: 210px;
        --wheel-left-margin: 20px;
        --wheel-right-margin: 10px;
        --wheel-padding: 20px;
        --dot-width: 20px;
        --margin-fix:  -10px;
    }

    ha-card {
        padding: 10px;
        padding-top: 5px;
        margin: 0px;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        align-items: center;
        height: 570px;
        width: 900px;
        border-radius: 0px;
    }

    lighting-panel {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        height: 485px;
        width: 900px;
    }

    .button-row {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 50px;
        margin: 0px;
        padding: 0px;
    }

    lighting-button {
        height: 100%;
        width: 160px;
        padding: 5px;
        border: none;
    }

`;