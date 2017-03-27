import React, { PropTypes, Component } from 'react';
import Header from '../src/components/header';
import Board from '../src/components/board'

import {
    create as createGame,
} from '../src/awale/game/Game';
import createPlayer from '../src/awale/player/Player';

export default class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            game: this.getGameModel()
        };
    }

    getGameModel() {
        return createGame([createPlayer(0), createPlayer(1, true)]);
    }

    render() {
        const { game } = this.state;

        return (
            <div>
                <Header />

                <Board
                    board={game.board}
                />
            </div>
        )
    }
}
