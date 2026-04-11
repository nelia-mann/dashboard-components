import { css } from 'lit';

export default css`

    :host {
        width: var(--aux-panel-width, 350px);
        height: var(--aux-panel-height, 100%);
        display: flex;
        flex-flow: var(--aux-panel-flex-flow, column nowrap);
        justify-content: var(--aux-panel-justify-content, space-between);
        align-items: var(--aux-panel-align-items, center);
        padding: var(--aux-panel-padding, 0px);
        padding-top: var(--aux-panel-padding-top, 0px);
    }

    .heading {
        font-size: var(--aux-panel-heading-font-size, var(--large-font));
        font-weight: var(--aux-panel-heading-font-weight, 550);
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: flex-start;
        width: 100%;
        height: var(--aux-panel-heading-height, 50px);
    }

    .main {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: flex-end;
        height: var(--aux-panel-main-height, 430px);
        width: var(--aux-panel-main-width);
    }

    .thermostat {
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        align-items: center;
        height: 100%;
    }


`;