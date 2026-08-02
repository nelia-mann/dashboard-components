import { html } from 'lit';
import { HaSubComponent } from '../base-classes/ha-subcomponent.js';

export class LibraryPanel extends HaSubComponent {

/********************************************** interactive logic *****************************************************/

    async testLibrary() {
        const result = await this.getHass().connection.sendMessagePromise({
            type: "call_service",
            domain: "music_assistant",
            service: "get_library",
            service_data: {
                config_entry_id: this.getMAId(),
                media_type: "track"
            },
            return_response: true
        });
        console.log(result.response.items);
    }

/********************************************** html logic ************************************************************/

    render() {
        if (this.isInitialized()) {
            this.testLibrary();
            return html`<div> Test </div>`
        }
    }

/********************************************** style logic ***********************************************************/

}