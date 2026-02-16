import { css } from 'lit';

export default css`

    .timer {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    .main-column {
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        align-items: center;
        width: 82%;
        height: 100%;
    }

    .timer-display {
        font-size: 400%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 70%;
    }

    .button-row {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-around;
        align-items: center;
        height: 15%;
        width: 100%;
    }

    .time-button {
        border-radius: 12px;
        background-color:  rgba(63, 81, 181, .25);
        border-width: 0px;
        padding: 3%;
    }

    .time-button.on {
        background-color:  rgba(63, 81, 181, .25);
        outline: solid rgba(63, 81, 181, .5);
        outline-offset: -4px;
    }

    .control-column {
        width: 18%;
        height: 100%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;
        align-items: flex-start;
    }

    .control-button {
        border-radius: 12px;
        background-color:  rgba(63, 81, 181, .5);
        border-width: 0px;
        padding: 15%;
        font-weight: 600;
        width: 70%;
        margin-left: 5%;
    }

    .control-button.false {
        background-color: rgba(158, 158, 158, .5);
    }

    .control-button.on {
        background-color:  rgba(63, 81, 181, .5);
        outline: solid rgb(63, 81, 181);
        outline-offset: -4px;
    }

    @media (prefers-color-scheme: dark) {
        .control-button {
            color: #ffffff;
        }

        .time-button {
            color: #ffffff;
        }
    }
`