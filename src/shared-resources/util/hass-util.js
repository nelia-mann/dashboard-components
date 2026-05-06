/********************************states and entities ****************************************/

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

function hasAttributeChanges(oldHass, newHass, entityId, attributes) {
    const oldState = getState(oldHass, entityId);
    const newState = getState(newHass, entityId);
    if (oldState.state !== newState.state) {
        return true;
    }
    return attributes.some((attribute) => {
        return (oldState.attributes[attribute] !== newState.attributes[attribute])
    })
}


/********************************* themes ************************************************/

function isTheme(entityId) {
    return ((entityId.substring(0, 7) === "select.") && (entityId.includes("theme")))
}

function getThemeIds(hass) {
    const entities = getHassEntities(hass);
    const themeIds = Object.keys(entities).filter((entityId) => isTheme(entityId));
    return new Set(themeIds);
}

function getAssociatedThemeId(hass, lightId) {
    const lightIdStub = lightId.substring(6);
    const themeIds = getThemeIds(hass);
    let foundId = null;
    themeIds.forEach((themeId) => {
        (themeId.includes(lightIdStub)) && (foundId = themeId);
    })
    return foundId;
}

function lightHasTheme(hass, lightId) {
    return (getAssociatedThemeId(hass, lightId) !== null);
}

function addThemeStructure(hass, dictionary, lightId) {
    if (lightHasTheme(hass, lightId)) {
        const themeId = getAssociatedThemeId(hass, lightId);
        dictionary.structure.theme = themeId;
        dictionary.entityIds.add(themeId);
    }
}

/********************************* groups ************************************************/

function isGroup(hass, entityId) {
    const entity = getEntity(hass, entityId);
    return (entity.platform === "group");
}

function getGroupMemberIds(hass, entityId) {
    const state = getState(hass, entityId);
    return state.attributes.entity_id;
}

function getAllLightGroupMemberIds(hass) {
    const lightIds = getLightIds(hass);
    let groupMemberIds = [];
    lightIds.forEach((lightId) => {
        if (isGroup(hass, lightId)) {
            groupMemberIds = [...groupMemberIds, ... getGroupMemberIds(hass, lightId)]
        }
    })
    return groupMemberIds;
}

function isLightInAGroup(hass, lightId) {
    const memberIds = getAllLightGroupMemberIds(hass);
    return memberIds.includes(lightId);
}

function addLightGroupStructure(hass, dictionary, lightId) {
    if (isGroup(hass, lightId)) {
        const memberIds = getGroupMemberIds(hass, lightId);
        let members = {};
        let entityIds = [];
        memberIds.forEach((memberId) => {
            let memberDictionary = { structure: { main: memberId }, entityIds: new Set([memberId]) };
            addThemeStructure(hass, memberDictionary, memberId);
            members[memberId] = memberDictionary;
            entityIds = [...entityIds, ... memberDictionary.entityIds];
        })
        dictionary.structure.group = members;
        dictionary.entityIds = new Set([...dictionary.entityIds, ...entityIds]);
    }
}

/********************************* lights ************************************************/

function isLight(hass, entityId) {
    const entity = getEntity(hass, entityId);
    const isLight = entity.labels.includes('light');
    return isLight;
}

function getLightIds(hass) {
    const entities = getHassEntities(hass);
    const lightIds = Object.keys(entities).filter((entityId) =>
        isLight(hass, entityId));
    return new Set(lightIds);
}

function addLightStructure(hass, dictionary) {
    let structure = dictionary.structure;
    const entityIds = dictionary.entityIds;
    entityIds.forEach((entityId) => {
        if (isLight(hass, entityId) && !isLightInAGroup(hass, entityId)) {
            let lightDictionary = { structure: { main: entityId }, entityIds: new Set([entityId]) };
            addThemeStructure(hass, lightDictionary, entityId);
            addLightGroupStructure(hass, lightDictionary, entityId);
            structure[entityId] = lightDictionary;
        }
    })
}

function isSoloLight(hass, entityId) {
    return (isLight(hass, entityId) && !isGroup(hass, entityId))
}

function hasLightChanges(oldHass, newHass, lightId) {
    let attributes = [];
    if (isLight(newHass, lightId)) {
        attributes = ["brightness", "hs_color"];
    }
    return hasAttributeChanges(oldHass, newHass, lightId, attributes);
}

/********************************* climate entities **********************************************/

function isThermostat(entityId) {
    const type = entityId.split('.')[0];
    return (type === "climate");
}

function hasClimateChanges(oldHass, newHass, entityId) {
    let attributes = [];
    if (isThermostat(entityId)) {
        attributes = ["current_temperature", "temperature", "hvac_action"];
    }
    return hasAttributeChanges(oldHass, newHass, entityId, attributes)
}

/********************************* exports ***********************************************/

export {
    addLightStructure,
    isSoloLight,
    hasLightChanges,
    hasClimateChanges
}