import { BasementKioskCard } from "./basement-kiosk-card/main.js";
import { LightingCard } from "./lighting-card/main.js";
import { ClockCard } from "./clock-card/main.js";


customElements.define("basement-kiosk-card", BasementKioskCard);
customElements.define("lighting-card", LightingCard);
customElements.define( "clock-card", ClockCard );

window.customCards = window.customCards || [];
window.customCards.push({
    type: "basement-kiosk-card",
    name: "basement kiosk card",
    description: "Basement Kiosk Card",
});
window.customCards.push({
    type: "lighting-card",
    name: "lighting card",
    description: "Lighting Card",
});
window.customCards.push({
    type: "clock-card",
    name: "clock card",
    description: "Clock, Timer, Stopwatch",
});