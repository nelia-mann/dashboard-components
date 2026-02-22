function getHassEntities(hass) {
    return hass.entities;
}

function getHassStates(hass) {
    return hass.states;
}

function getEntity(hass, entityId) {
    return getHassEntities(hass)[entityId];
}

function getState(hass, entityId) {
    return getHassStates(hass)[entityId];
}

function isLight(hass, entityId) {
    const entity = getEntity(hass, entityId);
    const notLight = entity.labels.includes('not_light');
    return (entityId.substring(0, 6) === "light.") && (!notLight);
}

function getLightIds(hass) {
    const entities = getHassEntities(hass);
    const lightIds = Object.keys(entities).filter((entityId) =>
        isLight(hass, entityId));
    return new Set(lightIds);
}

function isTheme(entityId) {
    return ((entityId.substring(0, 7) === "select.") && (entityId.includes("theme")))
}

function getThemeIds(hass) {
    const entities = getHassEntities(hass);
    const themeIds = Object.keys(entities).filter((entityId) =>
        isTheme(hass, entityId));
    return new Set(themeIds);
}

export {
    getLightIds,
    getThemeIds
}