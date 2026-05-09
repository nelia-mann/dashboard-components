import { filterEntityIdsForLabel, hasAttributeChanges } from './hass-util.js';

/******************************* climate structure *************************/

function getClimateKeys() {
    return ["min",
        "max",
        "sensor",
        "mode",
        "heatpump",
        "action",
        "tie_main",
        "rank",
        "script",
        "switch",
        "name",
        "safe_max",
        "safe_min",
        "offset"];
}

function getClimateButtonKeys() {
    return ["sensor", "mode", "heatpump"];
}

function getClimateAuxKeys() {
    return ["fan", "laundry_heater"];
}

function getDivisions() {
    return ["primary", "secondary", "aux"];
}

function addClimateKeyStructure(hass, dictionary) {
    if (Object.keys(dictionary.structure).length === 0) {
        getClimateKeys().forEach((key) => {
            const entityIds = [...filterEntityIdsForLabel(hass, dictionary.entityIds, key)];
            if (entityIds.length === 1) {
                dictionary.structure[key] = entityIds[0];
            }
        })
    }
}

function addClimateTieStructure(hass, dictionary) {
    if (Object.keys(dictionary.structure).length === 0) {
        const entityIds = filterEntityIdsForLabel(hass, dictionary.entityIds, "tied");
        if (entityIds.size > 0) {
            dictionary.structure.tied = { structure: {}, entityIds: entityIds };
            addClimateKeyStructure(hass, dictionary.structure.tied);
            const tieIds = filterEntityIdsForLabel(hass, dictionary.entityIds, "tie");
            dictionary.structure.tie = { structure: {}, entityIds: tieIds };
            addClimateKeyStructure(hass, dictionary.structure.tie);
        }
    }
}

function addClimateAuxStructure(hass, dictionary) {
    getClimateAuxKeys().forEach((element) => {
        const entityIds = filterEntityIdsForLabel(hass, dictionary.entityIds, element);
        if (entityIds.size > 0) {
            dictionary.structure[element] = { structure: {}, entityIds: entityIds };
            addClimateTieStructure(hass, dictionary.structure[element]);
            addClimateKeyStructure(hass, dictionary.structure[element]);
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
                addClimateTieStructure(hass, dictionary.structure[division]);
            }
            addClimateKeyStructure(hass, dictionary.structure[division]);
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
    addClimateKeyStructure(hass, dictionary.buttonInfo);
}

/**************************************** find changes ************************************/

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

export {
    addClimateDivisionStructure,
    addClimateButtonStructure,
    hasClimateChanges
}
