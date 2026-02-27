    import { css } from 'lit';

export default css`

    .select-lights {
        display: flex;
        flex-flow: column nowrap;
        align-items: flex-start;
        justify-content: center;
    }

    .light-inner {
        width: 180px;
        height: 25px;
        padding: 10px;
        padding-top: 8px;
        padding-bottom: 5px;
        margin: 10px;
        touch-action: none;
        display: flex;
        flex-flow: row nowrap;
    }

    .icons {
        margin-right: 10px;
        margin-left: 0px;
        display: flex;
        flex-flow: row nowrap;
    }

    light-control {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
    }

`;