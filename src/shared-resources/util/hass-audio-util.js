import { hasAttributeChanges } from './hass-util.js';

function hasAudioChanges(oldHass, newHass, entityId) {
    const attributes = ['group_members'];
    return hasAttributeChanges(oldHass, newHass, entityId, attributes)
}

export { hasAudioChanges }