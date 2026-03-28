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
    }

    .small-heading {
        font-weight: 700;
        font-size: var(--normal-font);
        margin: 0px;
        padding: 0px;
    }

    .large-heading {
        font-weight: 600;
        font-size: var(--Large-font);
        margin: 0px;
        padding: 0px;
    }

    .heading {
        font-weight: 550;
        font-size: var(--large-font);
        margin: 0px;
        padding: 0px;
    }

    .sub-info {
        padding: 0px;
        margin: 0px;
        font-weight: 400;
        font-size: var(--small-font);
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

    .inner-slider {
        border-top: solid 2px rgba(0, 0, 0, .1);
        border-bottom: solid 2px rgba(0, 0, 0, .1);
    }

    .shown-level {
        background: rgba(0, 0, 0, 1);
    }

    @media (prefers-color-scheme: dark) {
        * {
            color: #ffffff;
        }

        .outlined {
            outline: .5px solid rgba(255, 255, 255, .2);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3), 0 .5px 2px rgba(255, 255, 255, 0.2) inset;
        }

        .inner-slider {
            border-top: solid 2px rgba(255, 255, 255, .2);
            border-bottom: solid 2px rgba(255, 255, 255, .2);
        }

        .shown-level {
            background: rgba(255, 255, 255, 1);
        }

        dialog {
            background: #191919;
        }

        .slider {
            background: #191919;
        }
    }

`