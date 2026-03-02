import { css } from 'lit';

export default css`

    :host {

        --control-select-flex-flow: column nowrap;
        --control-select-justify-content: space-around;
        --control-select-align-items: center;
        --control-select-margin-left: 10px;
        --control-select-icon-width: 30px;
        --control-select-icon-margin: 10px;
        --control-select-icon-size: 20px;

        --light-control-padding: 20px;
        --light-control-margin-left: 20px;
        --light-control-margin-right: 10px;

        --wheel-width: 210px;
        --dot-width: 20px;

        --brightness-slider-width: 210px;
        --brightness-slider-height: 210px;

        --colortemp-slider-width: 210px;
        --colortemp-slider-height: 210px;

        --theme-select-flex-flow: column wrap;
        --theme-select-align-items: center;
        --theme-select-justify-content: flex-start;
        --theme-select-padding: 20px;
        --theme-select-margin-left: 20px;
        --theme-select-margin-right: 10px;
        --theme-select-height: 360px;
        --theme-select-width: 450px;

        --theme-button-padding-top: 1px;
        --theme-button-padding-bottom: 1px;
        --theme-button-margin: 5px;
        --theme-button-width: 90px;

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