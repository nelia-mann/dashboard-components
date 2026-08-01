import { css } from 'lit';

export default css`

    :host {
        font-family: "Roboto", "Noto", sans-serif;
        ---mdc-icon-size: 20px;
        --small-font: 85%;
        --normal-font: 100%;
        --large-font: 150%;
        --Large-font: 200%;
        --LARGE-font: 250%;
        --huge-font: 300%;
        --Huge-font: 350%;
        --HUGE-font: 400%;
        --button-outline-offset: -3px;

        --ipad-max-height: 900px;
        --ipad-max-width: 1050px;

        --smallfire-max-width: 500px;
        --smallfire-max-height: 920px;

        --largegalaxy-max-width: 1220px;
        --largegalaxy-max-height: 750px;
    }

    .outlined {
        outline-offset: 0px;
        border-radius: 8px;
    }

    .inactive {
        background-color: rgba(0, 0, 0, 0.1);
    }

    dialog::backdrop {
        background-color: rgba(0, 0, 0, 0.5);
    }

    .outlined {
        outline: .5px solid rgba(0, 0, 0, .1);
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    }

    .shown-slider {
        border-top: solid 2px rgba(0, 0, 0, .1);
        border-bottom: solid 2px rgba(0, 0, 0, .1);
    }

    .shown-level {
        background: rgba(0, 0, 0, 1);
    }

    .player-pop {
        background: rgba(255, 255, 255, .8);
    }

    @media (prefers-color-scheme: dark) {
        * {
            color: #ffffff;
        }

        .inactive {
            background-color: rgba(255, 255, 255, 0.1);
        }

        .outlined {
            outline: .5px solid rgba(255, 255, 255, .2);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3), 0 .5px 2px rgba(255, 255, 255, 0.2) inset;
        }

        .shown-slider {
            border-top: solid 2px rgba(255, 255, 255, .2);
            border-bottom: solid 2px rgba(255, 255, 255, .2);
        }

        .shown-level {
            background: rgba(255, 255, 255, 1);
        }

        .player-pop {
            background: rgba(0, 0, 0, .8);
        }

        dialog {
            background: #191919;
        }

        .slider {
            background: #191919;
        }
    }

`