import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { START_GAME, PICK_PEBBLE, PICK_PEBBLE_IA } from '../actions/actions';

import {
    create as createGame,
    playTurn,
    getCurrentPlayer,
    checkWinner,
} from '../awale/game/Game';
import createPlayer from '../awale/player/Player';
import { canPlayerPlayPosition } from '../awale/board/Board';
import { GAME_CONTINUE } from '../awale/constants/Constants';

import config from '../../config';

export const reducer = (state = { game: startGameModel(true) }, action) => {
    switch (action.type) {
    case START_GAME:
        return { game: startGameModel(action.payload) };
    case PICK_PEBBLE:
        return { game: pickPebbleGame(state.game, action.payload) };
    case PICK_PEBBLE_IA:
        return { game: pickPebbleGame(state.game, action.payload) };
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

        const nextGame = store.getState().game;
        const player = getCurrentPlayer(nextGame);
        if (player.isHuman) {
            return true;
        }

        return fetchColumn(nextGame).then(bestPosition => store.dispatch(pickPebbleIA(bestPosition)));
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

function pickPebbleGame(game, position) {
    const player = getCurrentPlayer(game);
    const canPlay = canPlayerPlayPosition(player, game.board, position);
    if (!canPlay) {
        return game;
    }

    let nextGame = playTurn(game, position);
    nextGame = checkWinner(nextGame);
    if (nextGame.gameState !== GAME_CONTINUE) {
        console.log(nextGame.gameState);
    }

    return nextGame;
}
