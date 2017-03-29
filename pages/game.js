import React, { Component } from 'react';
import Header from '../src/components/header';
import Board from '../src/components/board';
import Score from '../src/components/score';

import {
    create as createGame,
} from '../src/awale/game/Game';
import createPlayer from '../src/awale/player/Player';

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
        console.log('not implemented', position);
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
