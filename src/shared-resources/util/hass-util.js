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

function filterEntityIdsForFloor(hass, entityIds, floorId) {
    const theseIds = [...entityIds];
    const filteredIds = theseIds.filter((entityId) => {
        const areaId = getEntityAreaId(hass, entityId);
        if (areaId) {
            return floorId === getAreaFloor(hass, areaId);
        } else {
            return false;
        }
    });
    return new Set(filteredIds);
}

function addFloorStructure(hass, structure, entityIds) {
    const floors = getHassFloors(hass);
    Object.entries(floors).forEach(([floorId, floor]) => {
        const floorName = floor.name;
        const filteredIds = filterEntityIdsForFloor(hass, entityIds, floorId);
        const soloLightIds = [...filteredIds].filter((entityId) => isSoloLight(hass, entityId));
        if (filteredIds.size > 0) {
            structure[floorId] = {
                name: floorName,
                structure: {},
                entityIds: filteredIds,
                soloLightIds: new Set(soloLightIds)
            };
        }
    })
}

/********************************* areas *************************************************/

function getHassAreas(hass) {
    return hass.areas;
}

function getArea(hass, areaId) {
    return getHassAreas(hass)[areaId];
}

function getAreaName(hass, areaId) {
    return getArea(hass, areaId).name;
}

function getAreaFloor(hass, areaId) {
    return getArea(hass, areaId).floor_id;
}

function isAreaOnFloor(hass, floorId, areaId) {
    return (getAreaFloor(hass, areaId) === floorId);
}

function getEntityAreaId(hass, entityId) {
    const entity = getEntity(hass, entityId);
    return entity.area_id;
}

function isInArea(hass, entityId, areaId) {
    return (areaId === getEntityAreaId(hass, entityId));
}

function getUniqueAreaIds(hass, entityIds) {
    const areaIds = [...entityIds].map((entityId) => {
        return getEntityAreaId(hass, entityId)
    })
    return [... new Set(areaIds)];
}

function filterEntityIdsForArea(hass, entityIds, areaId) {
    const arrayIds = [...entityIds];
    const filteredIds = arrayIds.filter((entityId) => isInArea(hass, entityId, areaId));
    return new Set(filteredIds);
}

function addAreaStructure(hass, dictionary) {
    const entityIds = dictionary.entityIds;
    let structure = dictionary.structure;
    const areaIds = getUniqueAreaIds(hass, entityIds);
    areaIds.forEach((areaId) => {
        const ids = filterEntityIdsForArea(hass, entityIds, areaId);
        structure[areaId] = {
            name: getAreaName(hass, areaId),
            structure: {},
            entityIds: ids
        };
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

function addLightStructure(hass, dictionary) {
    let structure = dictionary.structure;
    const entityIds = dictionary.entityIds;
    entityIds.forEach((entityId) => {
        if (isLight(hass, entityId) && !isLightInAGroup(hass, entityId)) {
            let lightDictionary = { structure: {}, entityIds: new Set([entityId]) };
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

/********************************* label manipulation ************************************/

function getLabels(hass, entityId) {
    const entity = getEntity(hass, entityId);
    return entity.labels;
}

function hasLabel(hass, entityId, label) {
    const labels = getLabels(hass, entityId);
    return labels.includes(label);
}

function getEntityIdsWithLabel(hass, label) {
    const entities = getHassEntities(hass);
    const entityIds = Object.keys(entities).filter((entityId) => {
        return hasLabel(hass, entityId, label);
    })
    return new Set(entityIds);
}

function filterEntityIdsForLabel(hass, entityIds, labelId) {
    const array = [...entityIds];
    const entityIdArray = array.filter((entityId) => {
        return hasLabel(hass, entityId, labelId);
    })
    return new Set(entityIdArray);
}


/********************************* exports ***********************************************/

export {
    getState,
    addFloorStructure,
    addAreaStructure,
    addLightStructure,
    isSoloLight,
    hasThemeChanges,
    hasLightChanges,
    getEntityIdsWithLabel,
    filterEntityIdsForLabel,
}