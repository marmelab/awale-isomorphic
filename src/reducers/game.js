import { createStore, applyMiddleware } from 'redux';
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

function pickPebble(position) {
    const player = getCurrentPlayer(this.state.game);
    const canPlay = canPlayerPlayPosition(player, this.state.game.board, position);
    if (!canPlay) {
        return;
    }

    let nextGame = playTurn(this.state.game, position);
    this.setState({ game: nextGame });

    nextGame = checkWinner(nextGame);
    if (nextGame.gameState !== GAME_CONTINUE) {
        console.log(nextGame.gameState);
    }
}

export const reducer = (state = { game: startGameModel() }, action) => {
    switch (action.type) {
    case 'START_GAME': return { game: startGameModel() };
    case 'PICK_PEBBLE': return { game: pickPebble(action.position) };
    default: return state;
    }
};

export const startGame = () => (dispatch) => {
    return dispatch({ type: 'START_GAME', game: startGameModel() });
};

export const initStore = (initialState) => {
    return createStore(reducer, initialState, applyMiddleware(thunkMiddleware));
};
