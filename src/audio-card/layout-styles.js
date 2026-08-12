import { css } from 'lit';

export default css`

    :host {

        --small-heading-font-size: var(--large-font);
        --small-heading-font-weight: 700;
        --sub-info-font-size: var(--normal-font);
        --sub-info-font-weight: 600;

        --ha-card-padding: 15px;
        --ha-card-height: var(--ipad-max-height);
        --ha-card-width: var(--ipad-max-width);

        --side-player-panel-width: 160px;
        --main-player-panel-width: calc(100% - var(--side-player-panel-width));

        --player-tile-padding: 15px;
        --player-tile-padding-left: 50px;
        --player-tile-padding-right: 25px;

        --speaker-tile-width: 180px;
        --speaker-tile-padding: 5px;
        --speaker-tile-margin-top: var(--player-tile-padding);
        --speaker-tile-font-size: var(--sub-info-font-size);
        --speaker-tile-font-weight: var(--sub-info-font-weight);

        --player-panel-width: 730px;
        --player-panel-height: 730px;
        --player-art-width: 220px;
        --player-art-height: var(--player-art-width);
        --player-panel-padding: 0px;
        --player-BGInits-size: 1500%;
        --player-speaker-margin: 5%;
        --player-controls-margin: 10px;

        --volume-slider-overall-width: 90%;
        --volume-slider-overall-height: 40px;
        --volume-slider-input-width: calc(100% - 60px);
        --mute-button-height: 30px;

        --control-button-row-height: 60px;
        --control-button-row-width: 80%;
        --controls-button-height: 40px;

        --track-slider-overall-width: 90%;
        --track-slider-overall-height: 100px;
        --track-value-width: 10%;
        --track-slider-input-wdith: calc(100% - 60px);
        --track-font-weight: 700;
        --track-font-size: var(--normal-font);

    }
    `;
