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

/********************************* floors ************************************************/

function getHassFloors(hass) {
    return hass.floors;
}

function addFloorStructure(hass, structure) {
    const floors = getHassFloors(hass);
    Object.entries(floors).forEach(([floorId, floor]) => {
        const floorName = floor.name;
        structure[floorId] = { name: floorName, structure: {}, entityIds: new Set() };
    })
}

/********************************* areas *************************************************/

function getHassAreas(hass) {
    return hass.areas;
}

function isAreaOnFloor(hass, floorId, areaId) {
    const areas = getHassAreas(hass);
    const area = areas[areaId];
    return (area.floor_id === floorId);
}

function addAreaStructure(hass, structure, floorId) {
    const areas = getHassAreas(hass);
    Object.entries(areas).forEach(([areaId, area]) => {
        const areaName = area.name;
        if (isAreaOnFloor(hass, floorId, areaId)) {
            structure[areaId] = { name: areaName, structure: {}, entityIds: new Set() };
        }
    })
}

function getEntityAreaId(hass, entityId) {
    const entity = getEntity(hass, entityId);
    return entity.area_id;
}

function isInArea(hass, entityId, areaId) {
    return (areaId === getEntityAreaId(hass, entityId));
}

function getFloorAreaIds(hass, floorId) {
    const areas = getHassAreas(hass);
    const areaIds = Object.keys(areas).filter((areaId) => isAreaOnFloor(hass, floorId, areaId));
    return areaIds;
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
        dictionary.theme = themeId;
        dictionary.entityIds.add(themeId);
    }
}

function hasThemeChanges(oldHass, newHass, themeId) {
    const oldState = getState(oldHass, themeId);
    const newState = getState(newHass, themeId);
    return (isTheme(themeId) && (oldState.state !== newState.state));
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
            let memberDictionary = { entityIds: new Set([memberId]) };
            addThemeStructure(hass, memberDictionary, memberId);
            members[memberId] = memberDictionary;
            entityIds = [...entityIds, ... memberDictionary.entityIds];
        })
        dictionary.structure = members;
        dictionary.entityIds = new Set([...dictionary.entityIds, ...entityIds]);
    }
}

/********************************* lights ************************************************/

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

function addLightStructure(hass, dictionary, areaId) {
    const lightIds = getLightIds(hass);
    let structure = dictionary.structure;
    let entityIds = [...dictionary.entityIds];
    lightIds.forEach((lightId) => {
        if (isInArea(hass, lightId, areaId) && !isLightInAGroup(hass, lightId)) {
            let lightDictionary = { structure: {}, entityIds: new Set([lightId]) };
            addThemeStructure(hass, lightDictionary, lightId);
            addLightGroupStructure(hass, lightDictionary, lightId);
            structure[lightId] = lightDictionary;
            entityIds = [...entityIds, ...lightDictionary.entityIds];
        }
    })
    dictionary.entityIds = new Set(entityIds);
}

function isSoloLight(hass, entityId) {
    return (isLight(hass, entityId) && !isGroup(hass, entityId))
}

function hasLightChanges(oldHass, newHass, lightId) {
    const oldState = getState(oldHass, lightId);
    const newState = getState(newHass, lightId);
    if (isLight(newHass, lightId)) {
        return (
            (oldState.state !== newState.state)
            || (oldState.attributes.brightness !== newState.attributes.brightness)
            || (oldState.attributes.hs_color !== newState.attributes.hs_color)
        )
    } else return false;
}


/********************************* exports ***********************************************/

export {
    getState,
    getLightIds,
    getThemeIds,
    getFloorAreaIds,
    addFloorStructure,
    addAreaStructure,
    addLightStructure,
    isSoloLight,
    hasThemeChanges,
    hasLightChanges
}