import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { START_GAME, RESTART_GAME, PICK_PEBBLE, PICK_PEBBLE_IA } from '../actions/actions';
import pickPebbleIAMiddleware from '../middleware/game';

import {
    create as createGame,
    playTurn,
    getCurrentPlayer,
    checkWinner,
} from '../awale/game/Game';
import createPlayer from '../awale/player/Player';
import { canPlayerPlayPosition } from '../awale/board/Board';

const initState = { game: startGameModel(true), canPlay: true };

export const reducer = (state = initState, action) => {
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

export const pickPebbleIA = bestPosition => dispatch => {
    return dispatch({ type: PICK_PEBBLE_IA, payload: bestPosition });
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
