import { css } from 'lit';

export default css`

    :host {
        width: var(--climate-panel-width, 350px);
        height: var(--climate-panel-height, 100%);
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        align-items: center;
    }

    .button-row {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        width: 100%;
    }


`;