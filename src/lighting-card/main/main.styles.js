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
        padding: 25px;
        padding-top: 5px;
        margin: 0px;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        align-items: center;
        height: 500px;
        width: 800px;
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

`;