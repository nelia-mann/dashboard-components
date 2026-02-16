import { MainCard } from "./main.js";

customElements.define( "my-clock-card", MainCard );

window.customCards = window.customCards || [];
window.customCards.push({
    type: "my-clock-card",
    name: "my clock card",
    description: "Clock, Timer, Stopwatch",
});