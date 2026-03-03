import { css } from 'lit';

export default css`

    :host {
    }

    .light-element {
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: row nowrap;
    }

    .icons {
        margin-right: var(--simple-light-icons-margin-right, 10px);
        margin-left: var(--simple-light-icons-margin-left, 0px);
        display: flex;
        flex-flow: row nowrap;
    }

    .icon {
        width: var(--simple-light-icon-size, 20px);
        height: var(--simple-light-icon-size, 20px);
        margin: 0px;
        padding: 0px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
    }


`;