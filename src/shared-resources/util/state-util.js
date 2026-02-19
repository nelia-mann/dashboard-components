function getEntityId(state) {
    return state.entity_id;
}

function getAttributes(state) {
    return state.attributes;
}

function getState(state) {
    return state.state;
}

function isOn(state) {
    return (getState(state) === "on");
}

function isGroup(state) {
    return !!(getAttributes(state).entity_id)
}

export {
    getState,
    getEntityId,
    getAttributes,
    isOn,
    isGroup
}