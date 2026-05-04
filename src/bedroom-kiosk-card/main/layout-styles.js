import { css } from 'lit';

export default css`

    :host {

        --small-heading-font-size: var(--large-font);
        --small-heading-font-weight:  700;
        --sub-info-font-size: var(--normal-font);
        --sub-info-font-weight: 400;

        --ha-card-padding: 15px;
        --ha-card-height: var(--smallfire-max-width);
        --ha-card-width: var(--smallfire-max-height);

        --button-row-height: 60px;
        --button-row-width: 100%;

        --light-button-width: 200px;
        --light-button-padding: 5px;
        --light-button-heading-margin-top: 7px;
        --light-button-heading-margin-bottom: -7px;
        --light-button-sub-info-margin-top: 1px;
        --light-button-sub-info-margin-bottom: 10px;
        --light-button-heading-font-size: var(--small-heading-font-size);
        --light-button-heading-font-weight: var(--small-heading-font-weight);
        --light-button-sub-info-font-size: var(--sub-info-font-size);
        --light-button-sub-info-font-weight: var(--sub-info-font-weight);

        --climate-button-width: 200px;
        --climate-button-padding: 5px;
        --climate-button-heading-margin-top: 7px;
        --climate-button-heading-margin-bottom: -7px;
        --climate-button-sub-info-margin-bottom: 10px;
        --climate-button-sub-info-margin-top: 1px;
        --climate-button-heading-font-weight: var(--small-heading-font-weight);
        --climate-button-heading-font-size: var(--small-heading-font-size);
        --climate-button-sub-info-font-weight: var(--sub-info-font-weight);
        --climate-button-sub-info-font-size: var(--sub-info-font-size);

    }
    `;