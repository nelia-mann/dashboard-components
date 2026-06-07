import { LightingCard } from "./lighting-card/main/main.js";
import { ClimateCard } from "./climate-card/main/main.js";
import { ClockCard } from "./clock-card/main.js";
import { BedroomKioskCard } from "./bedroom-kiosk-card/main/main.js";
import { AudioCard } from "./audio-card/main/main.js";

customElements.define("lighting-card", LightingCard);
customElements.define("clock-card", ClockCard);
customElements.define("climate-card", ClimateCard);
customElements.define("bedroom-kiosk-card", BedroomKioskCard);
customElements.define("audio-card", AudioCard);

window.customCards = window.customCards || [];

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
window.customCards.push({
    type: "bedroom-kiosk-card",
    name: "bedroom kiosk card",
    description: "Bedroom Kiosk Card",
});
window.customCards.push({
    type: "audio-card",
    name: "audio card",
    description: "Audio Card",
})