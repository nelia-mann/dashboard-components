import { hasAttributeChanges } from './hass-util.js';

function hasAudioChanges(oldHass, newHass, entityId) {
    const attributes = [
        'group_members', 
        'entity_picture', 
        'entity_picture_local',
        'volume_level', 
        'is_volume_muted', 
        'media_position_updated_at',
        'source',
        'media_title',
        'media_artist',
        'media_duration',
        'media_position'
    ];
    return hasAttributeChanges(oldHass, newHass, entityId, attributes)
}

export { hasAudioChanges }