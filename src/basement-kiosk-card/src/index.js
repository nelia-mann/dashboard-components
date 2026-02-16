import { MainCard } from "./main.js";

customElements.define( "my-basement-kiosk-card", MainCard );

window.customCards = window.customCards || [];
window.customCards.push({
    type: "my-basement-kiosk-card",
    name: "my basement kiosk card",
    description: "Basement Kiosk Card",
});