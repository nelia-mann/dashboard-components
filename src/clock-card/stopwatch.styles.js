import { css } from 'lit';

export default css`
    .stopwatch {
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

    .stopwatch-display {
        font-size: 400%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        width: 70%;
        height: 100%;
    }

    .lap-column {
        width: 15%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: center;
        height: 90%;
    }

    .lap {
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: flex-start;
    }

    h1 {
        font-size: 100%;
        margin: 0px;
        padding: 0px;
    }

    .time {
        margin: 0px;
        margin-top: -5%;
        margin-left: 15%;
        padding: 0px;
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
        background-color: rgba(0, 150, 136, .5);
    }

    .button.false {
        background-color: rgba(158, 158, 158, .5);
    }

    .button.on {
        background-color: rgba(0, 150, 136, .5);
        outline: solid rgb(0, 150, 136);
        outline-offset: -4px;
    }

    @media (prefers-color-scheme: dark) {
        .button {
            color: #ffffff;
        }
    }
`