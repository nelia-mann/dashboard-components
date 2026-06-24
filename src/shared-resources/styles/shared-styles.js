import { css, unsafeCSS } from 'lit';
import { OUTLINE_STYLES } from './shared-style-tokens.js';

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

        --largegalaxy-max-width: 1300px;
        --largegalaxy-max-height: 900px;
    }

    .outlined {
        outline-offset: ${unsafeCSS(OUTLINE_STYLES.general.outlineOffset)};
        border-radius: ${unsafeCSS(OUTLINE_STYLES.general.borderRadius)};
    }

    .inactive {
        background-color: rgba(0, 0, 0, 0.1);
    }

    dialog::backdrop {
        background-color: rgba(0, 0, 0, 0.5);
    }

    .outlined {
        outline: ${unsafeCSS(OUTLINE_STYLES.light.outline)};
        box-shadow: ${unsafeCSS(OUTLINE_STYLES.light.boxShadow)};
    }

    .shown-slider {
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

        .inactive {
            background-color: rgba(255, 255, 255, 0.1);
        }

        .outlined {
            outline: ${unsafeCSS(OUTLINE_STYLES.dark.outline)};
            box-shadow: ${unsafeCSS(OUTLINE_STYLES.dark.boxShadow)};
        }

        .shown-slider {
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