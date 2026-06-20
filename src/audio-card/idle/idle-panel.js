import { html } from 'lit';
import { repeat } from 'lit-html/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { HaSubComponent } from '../../shared-resources/base-classes/ha-subcomponent';
import { OFF, rgba } from './../../shared-resources/util/color-util.js';
import styles from './idle.styles.js';
import sharedStyles from '../../shared-resources/styles/shared-styles.js';

export class IdlePanel extends HaSubComponent {

    getIdleStyles() {
        let styles = {};
        styles['background-color'] = rgba(OFF, 0.5);
        return styles;
    }

    static styles = [sharedStyles, styles];

    render() {
        if (this.isInitialized()) {
            return html`${this.name}`
        }
    }
}

customElements.define("idle-panel", IdlePanel);