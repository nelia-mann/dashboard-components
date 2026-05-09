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

function getAttributes(hass, entityId) {
    return getState(hass, entityId).attributes;
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

/********************************* labels ************************************************/

function getLabels(hass, entityId) {
    return getEntity(hass, entityId).labels;
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

function filterEntityIdsForLabel(hass, entityIds, label) {
    const array = [...entityIds];
    const entityIdArray = array.filter((entityId) => {
        return hasLabel(hass, entityId, label);
    })
    return new Set(entityIdArray);
}

/********************************* exports ***********************************************/

export {
    getHassEntities,
    getEntity,
    hasLabel,
    getAttributes,
    hasAttributeChanges,
    filterEntityIdsForLabel,
    getEntityIdsWithLabel
}