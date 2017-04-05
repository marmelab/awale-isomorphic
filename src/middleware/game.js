import { PICK_PEBBLE } from '../actions/actions';
import { getCurrentPlayer } from '../awale/game/Game';
import { pickPebbleIA } from '../reducers/game';

import config from '../../config';

const pickPebbleIAMiddleware = store => next => action => {
    if (action.type === PICK_PEBBLE) {
        next(action);

        const state = store.getState();
        const nextGame = state.game;
        const player = getCurrentPlayer(nextGame);
        if (player.isHuman) {
            return true;
        }

        state.canPlay = false;
        return fetchColumn(nextGame).then((bestPosition) => {
            state.canPlay = true;
            store.dispatch(pickPebbleIA(bestPosition));
        });
    }

    return next(action);
};

function fetchColumn(game) {
    return fetch(config.apiUrl, {
        method: 'POST',
        body: JSON.stringify({ Score: game.score, Board: game.board }),
    })
    .then(response => response.text())
    .then(parseInt);
}

export default pickPebbleIAMiddleware;
