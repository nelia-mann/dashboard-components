import { css } from 'lit';

export default css`

    ha-card {
        padding: var(--ha-card-padding, 10px);
        padding-top: var(--ha-card-padding-top, 15px);
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        align-items: center;
        height: var(--ha-card-height, 570px);
        width: var(--ha-card-width, 900px);
    }

`;