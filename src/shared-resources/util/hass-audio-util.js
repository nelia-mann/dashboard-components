import { hasAttributeChanges } from './hass-util.js';

function hasAudioChanges(oldHass, newHass, entityId) {
    const attributes = [
        'group_members', 
        'entity_picture', 
        'entity_picture_local',
        'volume_level', 
        'is_volume_muted', 
        'media_position_updated_at',
        'source'
    ];
    return hasAttributeChanges(oldHass, newHass, entityId, attributes)
}

export { hasAudioChanges }