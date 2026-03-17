import { css } from 'lit';

export default css`

    :host {

        --ha-card-padding: 25px;
        --ha-card-padding-top: 5px;
        --ha-card-height: 500px;
        --ha-card-width: 800px;

        --button-row-height: 50px;
        --button-row-width: 100%;

        --area-panel-width: 100%;
        --area-panel-height, 400px;
        --area-panel-flex-flow: row nowrap;
        --area-panel-justify-content: space-around;
        --area-panel-align-items: center;

        --climate-panel-width: 350px;
        --climate-panel-height: 100%;
        --climate-panel-flex-flow: column nowrap;
        --climate-panel-justify-content: space-between;
        --climate-panel-align-items: center;

        --mode-control-width: 100%;
        --mode-control-height: 50px;
        --mode-control-flex-flow: row nowrap;
        --mode-control-justify-content: space-between;
        --mode-control-align-items: center;

        --mode-control-button-width: 60px;
        --mode-control-button-height: 40px;
        --mode-control-button-margin-correction-l: -10px;
        --mode-control-button-margin-correction-r: -14px;
    }
    `;