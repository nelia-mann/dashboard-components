import {
    getHassEntities,
    getEntity,
    getAttributes,
    hasLabel,
    filterEntityIdsForLabel,
    hasAttributeChanges
} from './hass-util.js';
import {
    getUniqueAreaIds,
    getHassAreaName,
    filterEntityIdsForArea
} from './hass-area-floor-util.js';

/********************************* lights ***********************************************/

function isLight(hass, entityId) {
    return hasLabel(hass, entityId, 'light');
}

function getLightIds(hass) {
    const entities = getHassEntities(hass);
    const lightIds = Object.keys(entities).filter((entityId) =>
        isLight(hass, entityId));
    return new Set(lightIds);
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

/********************************* groups ***************************************************/

function isGroup(hass, entityId) {
    const entity = getEntity(hass, entityId);
    return (entity.platform === "group");
}

function getGroupMemberIds(hass, entityId) {
    if (isGroup(hass, entityId)) {
        return getAttributes(hass, entityId).entity_id;
    }
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

function isSoloLight(hass, entityId) {
    return (isLight(hass, entityId) && !isGroup(hass, entityId))
}

function isLightInAGroup(hass, lightId) {
    const memberIds = getAllLightGroupMemberIds(hass);
    return memberIds.includes(lightId);
}

/***************************** light structure builders ****************************************/

function getCategories() {
    return ["basic_lighting", "special_lights"];
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

function addThemeStructure(hass, dictionary, lightId) {
    if (lightHasTheme(hass, lightId)) {
        const themeId = getAssociatedThemeId(hass, lightId);
        dictionary.structure.theme = themeId;
        dictionary.entityIds.add(themeId);
    }
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

function addAreaStructure(hass, categoryDictionary) {
    const areaIds = getUniqueAreaIds(hass, categoryDictionary.entityIds);
    areaIds.forEach((areaId) => {
        const ids = filterEntityIdsForArea(hass, categoryDictionary.entityIds, areaId);
        const areaDictionary = {
            name: getHassAreaName(hass, areaId),
            structure: {},
            entityIds: ids
        };
        addLightStructure(hass, areaDictionary);
        categoryDictionary.structure[areaId] = areaDictionary;
    })
}

function addSpecialLightStructure(hass, dictionary) {
    getCategories().forEach((categoryLabel) => {
        const ids = filterEntityIdsForLabel(hass, dictionary.entityIds, categoryLabel);
        const categoryDictionary = {
            structure: {},
            entityIds: ids
        }
        if (categoryLabel === 'basic_lighting') {
            addAreaStructure(hass, categoryDictionary);
        } else {
            addLightStructure(hass, categoryDictionary);
        }
        dictionary.structure[categoryLabel] = categoryDictionary;
    })
}

function addLightButtonStructure(hass, dictionary) {
    const ids = dictionary.entityIds;
    const soloLightIds = [...ids].filter((entityId) => isSoloLight(hass, entityId));
    dictionary.buttonInfo = new Set(soloLightIds);
}

/******************************************* find changes **************************************/

function hasLightChanges(oldHass, newHass, lightId) {
    let attributes = [];
    if (isLight(newHass, lightId)) {
        attributes = ["brightness", "hs_color"];
    }
    return hasAttributeChanges(oldHass, newHass, lightId, attributes);
}

/**************************************** export ***********************************************/

export {
    addSpecialLightStructure,
    hasLightChanges,
    isSoloLight,
    addLightButtonStructure
}