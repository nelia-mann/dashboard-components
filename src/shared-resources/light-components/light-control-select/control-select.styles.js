import { css } from 'lit';

export default css`

    :host {
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;
        align-items: center;
        margin-left: 10px;
    }

    .icon {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px;
    }

    ha-svg-icon {
        padding: 0%;
        margin: 0%;
        --mdc-icon-size: 20px;
        height: 20px;
        width: 20px;
    }

`;