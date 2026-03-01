import { css } from 'lit';

const SIZE = 210;
const LEFTMARGIN = 20;
const RIGHTMARGIN = 10;
const PADDING = 20;


export default css`

    .control-column {
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

    brightness-slider {
        margin-left: ${LEFTMARGIN}px;
        margin-right: ${RIGHTMARGIN}px;
        width: ${SIZE}px;
        height: ${SIZE}px;
        padding: ${PADDING}px;
    }

    colortemp-slider {
        margin-left: ${LEFTMARGIN}px;
        margin-right: ${RIGHTMARGIN}px;
        width: ${SIZE}px;
        height: ${SIZE}px;
        padding: ${PADDING}px;
    }

    color-wheel {
        position: relative;
        width: ${SIZE}px;
        height: ${SIZE}px;
        margin-left: ${LEFTMARGIN}px;
        margin-right: ${RIGHTMARGIN}px;
        padding: ${PADDING}px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    theme-select {
        display: flex;
        flex-flow: column wrap;
        justify-content: flex-start;
        align-items: center;
        width: 450px;
        height: 360px;
        margin-left: ${LEFTMARGIN}px;
        margin-right: ${RIGHTMARGIN}px;
        padding: ${PADDING}px;
    }

`;