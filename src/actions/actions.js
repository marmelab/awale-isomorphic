export const START_GAME = 'START_GAME';
export const PICK_PEBBLE = 'PICK_PEBBLE';
export const PICK_PEBBLE_IA = 'PICK_PEBBLE_IA';

export const pickPebble = position => ({
    type: PICK_PEBBLE,
    payload: position,
});
