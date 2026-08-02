import { filterEntityIdsForLabel, hasAttributeChanges, hasLabel } from '../hass-util.js';

/******************************* climate structure *************************/

function getPrimaryKeys() {
    return ["rank", "script", "hp"];
}

function getAuxClimateKeys() {
    return [
        "tie_main",
        "offset",
        "tie",
        "thermostat",
        "hygrostat",
        "safe_mode"
    ]
}

function getClimateButtonKeys() {
    return ["hp"];
}

function getAuxKeys() {
    return ["fan", "laundry_heater"];
}

function getDivisions() {
    return ["primary", "secondary", "aux"];
}

function addClimateKeyStructure(hass, dictionary, keys) {
    if (Object.keys(dictionary.structure).length === 0) {
        keys.forEach((key) => {
            const entityIds = [...filterEntityIdsForLabel(hass, dictionary.entityIds, key)];
            if (entityIds.length === 1) {
                dictionary.structure[key] = entityIds[0];
            } 
        })
    }
}

function addClimateAuxStructure(hass, dictionary) {
    getAuxKeys().forEach((element) => {
        const entityIds = filterEntityIdsForLabel(hass, dictionary.entityIds, element);
        if (entityIds.size > 0) {
            dictionary.structure[element] = { structure: {}, entityIds: entityIds };
            addClimateKeyStructure(hass, dictionary.structure[element], getAuxClimateKeys());
        } else {
            addClimateKeyStructure(hass, dictionary, getAuxClimateKeys());
        }
    })
}

function addClimateDivisionStructure(hass, dictionary) {
    getDivisions().forEach((division) => {
        const entityIds = filterEntityIdsForLabel(hass, dictionary.entityIds, division);
        if (entityIds.size > 0) {
            dictionary.structure[division] = { structure: {}, entityIds: entityIds };
            if (division !== 'primary') {
                addClimateAuxStructure(hass, dictionary.structure[division]);
            }
            addClimateKeyStructure(hass, dictionary.structure[division], getPrimaryKeys());
        }
    })
}

function addClimateButtonStructure(hass, dictionary) {
    const primaryIds = filterEntityIdsForLabel(hass, dictionary.entityIds, "primary");
    let buttonIds = new Set();
    getClimateButtonKeys().forEach((key) => {
        const newButtonIds = filterEntityIdsForLabel(hass, primaryIds, key);
        buttonIds = buttonIds.union(newButtonIds);
    })
    dictionary.buttonInfo = { structure: {}, entityIds: buttonIds };
    addClimateKeyStructure(hass, dictionary.buttonInfo, getPrimaryKeys());
}

/**************************************** find changes ************************************/

function isThermostat(entityId) {
    const type = entityId.split('.')[0];
    return (type === "climate");
}

function isHygrostat(entityId) {
    const type = entityId.split('.')[0];
    return (type === "humidifier");
}

function hasClimateChanges(oldHass, newHass, entityId) {
    let attributes = [];
    if (isThermostat(entityId)) {
        attributes = ["current_temperature", "temperature", "hvac_action"];
    }
    if (isHygrostat(entityId)) {
        attributes = ["current_humidity", "humidity", "action"];
    }
    return hasAttributeChanges(oldHass, newHass, entityId, attributes)
}

export {
    addClimateDivisionStructure,
    addClimateButtonStructure,
    hasClimateChanges
}
