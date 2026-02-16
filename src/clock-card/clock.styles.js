import { css } from 'lit';

export default css`
    .clock {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-left: 2%;
        padding-bottom: 3%;
        height: 77%;
        margin: 0px;
    }

    .clock-display {
        font-size: 400%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        width: 85%;
        height: 100%;
    }

    .button-column {
        width: 15%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;
        align-items: center;
        height: 100%;
    }

    .button {
        border-width: 0px;
        width: 100%;
        height: 22%;
        font-weight: 600;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        border-radius: 12px;
        background-color: rgba(110, 65, 171, .5);
    }

    .button.true {
        outline: solid rgb(110, 65, 171);
        outline-offset: -4px;
    }

    @media (prefers-color-scheme: dark) {
        .button {
            color: #ffffff;
        }

        .clock-display {
            color: #ffffff;
        }
    }
`