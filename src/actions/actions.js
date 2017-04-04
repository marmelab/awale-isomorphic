export const START_GAME = 'START_GAME';
export const PICK_PEBBLE = 'PICK_PEBBLE';

export const pickPebble = position => ({
    type: PICK_PEBBLE,
    payload: position,
});
