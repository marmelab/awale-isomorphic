import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import {
    create as createGame,
    playTurn,
    getCurrentPlayer,
    checkWinner,
} from '../awale/game/Game';
import createPlayer from '../awale/player/Player';
import { canPlayerPlayPosition } from '../awale/board/Board';
import { GAME_CONTINUE } from '../awale/constants/Constants';

function startGameModel() {
    return createGame([createPlayer(0), createPlayer(1, true)]);
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

export const reducer = (state = { game: startGameModel() }, action) => {
    switch (action.type) {
    case 'START_GAME': return { game: startGameModel() };
    case 'PICK_PEBBLE': return { game: pickPebbleGame(action.game, action.position) };
    default: return state;
    }
};

export const startGame = () => (dispatch) => {
    return dispatch({ type: 'START_GAME', game: startGameModel() });
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
