import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { START_GAME, RESTART_GAME, PICK_PEBBLE, PICK_PEBBLE_IA } from '../actions/actions';

import {
    create as createGame,
    playTurn,
    getCurrentPlayer,
    checkWinner,
} from '../awale/game/Game';
import createPlayer from '../awale/player/Player';
import { canPlayerPlayPosition } from '../awale/board/Board';

import config from '../../config';

export const reducer = (state = { game: startGameModel(true), canPlay: true }, action) => {
    switch (action.type) {
    case START_GAME:
        return { ...state, game: startGameModel(action.payload) };
    case RESTART_GAME:
        return { ...state, game: startGameModel(state.game.players[1].isHuman) };
    case PICK_PEBBLE:
        return { ...state, game: pickPebbleGame(state.game, action.payload) };
    case PICK_PEBBLE_IA:
        return { ...state, game: pickPebbleGame(state.game, action.payload, state.canPlay) };
    default:
        return state;
    }
};

export const startGame = isHuman => dispatch => {
    return dispatch({ type: START_GAME, payload: isHuman });
};

export const pickPebbleIA = bestPosition => dispatch => {
    return dispatch({ type: PICK_PEBBLE_IA, payload: bestPosition });
};

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

export const initStore = (initialState) => {
    const composeEnhancers = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return createStore(
        reducer,
        initialState,
        composeEnhancers(
            applyMiddleware(
                thunkMiddleware,
                pickPebbleIAMiddleware,
            ),
        ),
    );
};

function startGameModel(isHuman) {
    return createGame([createPlayer(0), createPlayer(1, isHuman)]);
}

function fetchColumn(game) {
    return fetch(config.apiUrl, {
        method: 'POST',
        body: JSON.stringify({ Score: game.score, Board: game.board }),
    })
    .then(response => response.text())
    .then(parseInt);
}

function pickPebbleGame(game, position, canPlayIA = true) {
    if (!canPlayIA) {
        return game;
    }

    const player = getCurrentPlayer(game);
    const canPlay = canPlayerPlayPosition(player, game.board, position);
    if (!canPlay) {
        return game;
    }

    let nextGame = playTurn(game, position);
    nextGame = checkWinner(nextGame);
    return nextGame;
}
