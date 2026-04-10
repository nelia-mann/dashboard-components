import { css } from 'lit';

export default css`

    :host {
        width: var(--aux-panel-width, 350px);
        height: var(--aux-panel-height, 100%);
        display: flex;
        flex-flow: var(--aux-panel-flex-flow, column nowrap);
        justify-content: var(--aux-panel-justify-content, space-between);
        align-items: var(--aux-panel-align-items, center);

        --thermostat-bottom-padding: 10px;
        --thermostat-margin-top: 00px;
        --thermostat-height: 360px;
    }

    .heading {
        font-size: var(--aux-panel-heading-font-size, var(--large-font));
        font-weight: var(--aux-panel-heading-font-weight, 550);
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: flex-start;
        margin-top: 0px;
        height: 40px;
    }

    .main {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: flex-end;
        height: 430px;
        width: calc(100% - 30px);
    }

    .thermostat {
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        align-items: center;
        height: 100%;
    }


`;