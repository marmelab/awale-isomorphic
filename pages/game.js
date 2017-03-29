import React, { Component } from 'react';
import Header from '../src/components/header';
import Board from '../src/components/board';
import Score from '../src/components/score';

import {
    create as createGame,
    playTurn,
    getCurrentPlayer,
    checkWinner,
} from '../src/awale/game/Game';
import createPlayer from '../src/awale/player/Player';
import { canPlayerPlayPosition } from '../src/awale/board/Board';
import { GAME_CONTINUE } from '../src/awale/constants/Constants';

export default class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            game: this.startGame(),
            canPlay: true,
        };
    }

    startGame() {
        return createGame([createPlayer(0), createPlayer(1, true)]);
    }

    handlePickPebble = (position) => {
        const player = getCurrentPlayer(this.state.game);
        const canPlay = canPlayerPlayPosition(player, this.state.game.board, position);
        if (!canPlay) {
            return;
        }

        let nextGame = playTurn(this.state.game, position);
        this.setState({ game: nextGame });

        nextGame = checkWinner(nextGame);
        if (nextGame.gameState !== GAME_CONTINUE) {
            this.showGameStatus(nextGame.gameState);
        }
    }

    showGameStatus = (gameState) => {
        console.log('not implemented', gameState);
    }

    render() {
        const { game, canPlay } = this.state;

        return (
            <div className="game">
                <Header />

                <Board
                    board={game.board}
                    currentIndexPlayer={game.currentIndexPlayer}
                    pickPebble={this.handlePickPebble}
                    canPlay={canPlay}
                />

                <Score score={game.score} />

                <style jsx>{`
                  .game {
                      height: 270px;
                      margin: 0 auto;
                      position: relative;
                      width: 720px
                  }
                `}</style>
            </div>
        );
    }
}
