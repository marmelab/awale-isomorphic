export const START_GAME = 'START_GAME';
export const RESTART_GAME = 'RESTART_GAME';
export const PICK_PEBBLE = 'PICK_PEBBLE';
export const PICK_PEBBLE_IA = 'PICK_PEBBLE_IA';

export const startGame = isHuman => ({
    type: START_GAME,
    payload: isHuman,
});

export const pickPebble = position => ({
    type: PICK_PEBBLE,
    payload: position,
});

export const restartGame = () => ({
    type: RESTART_GAME,
    payload: null,
});
