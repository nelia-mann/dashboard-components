import { css } from 'lit';

const SIZE = 210;
const LEFTMARGIN = 20;
const RIGHTMARGIN = 10;
const PADDING = 20;


export default css`

    :host {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;

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