import { css } from 'lit';

export default css`
    ha-card {
        padding: 25px;
        padding-top: 5px;
        margin: 0px;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        align-items: center;
        height: 570px;
        width: 900px;
        outline: solid;
        border-radius: 0px;
    }

    .content {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        height: 520px;
        width: 100%;
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

    .button {
        height: 100%;
        width: 160px;
        padding: 0px;
        border: none;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
    }

`;