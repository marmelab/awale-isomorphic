import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { START_GAME, PICK_PEBBLE } from '../actions/actions';

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

function checkComputerTurn(game) {
    const player = getCurrentPlayer(game);
    if (player.isHuman) {
        return;
    }

    fetchColumn(game).then((bestPosition) => {
        console.log(bestPosition);
        pickPebbleGame(game, bestPosition);
    });
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
    } else {
        checkComputerTurn(nextGame);
    }

    return nextGame;
}


export const reducer = (state = { game: startGameModel(true) }, action) => {
    switch (action.type) {
    case START_GAME:
        return { game: startGameModel(action.payload) };
    case PICK_PEBBLE:
        return { game: pickPebbleGame(state.game, action.payload) };
    default:
        return state;
    }
};

export const startGame = isHuman => (dispatch) => {
    return dispatch({ type: START_GAME, payload: isHuman });
};

export const initStore = (initialState) => {
    const composeEnhancers = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return createStore(
        reducer,
        initialState,
        composeEnhancers(
            applyMiddleware(thunkMiddleware),
        ),
    );
};
