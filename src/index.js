import { LightingCard } from "./lighting-card/main.js";
import { ClimateCard } from "./climate-card/main.js";
import { ClockCard } from "./clock-card/main.js";
import { BedroomKioskCard } from "./bedroom-kiosk-card/main.js";
import { BasementKioskCard } from "./basement-kiosk-card/main.js";
import { AudioCard } from "./audio-card/main.js";

customElements.define("lighting-card", LightingCard);
customElements.define("clock-card", ClockCard);
customElements.define("climate-card", ClimateCard);
customElements.define("bedroom-kiosk-card", BedroomKioskCard);
customElements.define("audio-card", AudioCard);
customElements.define("basement-kiosk-card", BasementKioskCard);

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
window.customCards.push({
    type: "basement-kiosk-card",
    name: "basement kiosk card",
    description: "Basement Kiosk Card",
})