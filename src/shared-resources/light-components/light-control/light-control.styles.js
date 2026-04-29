import { css } from 'lit';


export default css`

    :host {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        padding: var(--light-control-padding, 20px);
        margin-left: var(--light-control-margin-left, 20px);
        margin-right: var(--light-control-margin-right, 10px);
        margin: var(--light-control-margin);
        min-height: var(--light-control-minsize);
        min-width: var(--light-control-minsize);
    }

`;