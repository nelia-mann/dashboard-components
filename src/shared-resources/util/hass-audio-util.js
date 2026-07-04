import { hasAttributeChanges } from './hass-util.js';

function hasAudioChanges(oldHass, newHass, entityId) {
    const attributes = ['group_members', 'entity_picture', 'volume_level', 'is_volume_muted'];
    return hasAttributeChanges(oldHass, newHass, entityId, attributes)
}

export { hasAudioChanges }