import { getEntity } from './hass-util.js';

/********************************* areas *************************************************/

function getHassAreas(hass) {
    return hass.areas;
}

function getArea(hass, areaId) {
    return getHassAreas(hass)[areaId];
}

function getHassAreaName(hass, areaId) {
    return getArea(hass, areaId).name;
}

function getEntityAreaId(hass, entityId) {
    return getEntity(hass, entityId).area_id;
}

function isInArea(hass, entityId, areaId) {
    return getEntityAreaId(hass, entityId) === areaId;
}

function getUniqueAreaIds(hass, entityIds) {
    const areaIds = [...entityIds].map((entityId) => getEntityAreaId(hass, entityId));
    return new Set(areaIds);
}

function filterEntityIdsForArea(hass, entityIds, areaId) {
    const arrayIds = [...entityIds];
    const filteredIds = arrayIds.filter((entityId) => isInArea(hass, entityId, areaId));
    return new Set(filteredIds);
}

/********************************* floors ************************************************/

function getHassFloors(hass) {
    return hass.floors;
}

function getHassFloorName(hass, floorId) {
    return getHassFloors(hass)[floorId].name;
}

function getAreaFloor(hass, areaId) {
    return getArea(hass, areaId).floor_id;
}

function getEntityFloorId(hass, entityId) {
    const areaId = getEntityAreaId(hass, entityId);
    if (areaId) {
        return getAreaFloor(hass, areaId);
    }
}

function isOnFloor(hass, entityId, floorId) {
    return getEntityFloorId(hass, entityId) === floorId;
}

function filterEntityIdsForFloor(hass, entityIds, floorId) {
    const theseIds = [...entityIds];
    const filteredIds = theseIds.filter((entityId) => isOnFloor(hass, entityId, floorId));
    return new Set(filteredIds);
}

export {
    getHassFloors,
    filterEntityIdsForFloor,
    getHassFloorName,
    getUniqueAreaIds,
    getHassAreaName,
    filterEntityIdsForArea,
}