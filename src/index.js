import { BasementKioskCard } from "./basement-kiosk-card/main/main.js";
import { LightingCard } from "./lighting-card/main/main.js";
import { ClimateCard } from "./climate-card/main/main.js";
import { ClockCard } from "./clock-card/main.js";


customElements.define("basement-kiosk-card", BasementKioskCard);
customElements.define("lighting-card", LightingCard);
customElements.define("clock-card", ClockCard);
customElements.define("climate-card", ClimateCard);

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
    type: "climate-card",
    name: "climate card",
    description: "Climate Card",
});
window.customCards.push({
    type: "clock-card",
    name: "clock card",
    description: "Clock, Timer, Stopwatch",
});