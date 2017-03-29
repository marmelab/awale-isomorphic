import React, { PropTypes, Component } from 'react';
import withRedux from 'next-redux-wrapper';

import { initStore } from '../src/reducers/game';

import Header from '../src/components/header';
import Board from '../src/components/board';
import Score from '../src/components/score';

class Game extends Component {
    static propTypes = {
        game: PropTypes.shape({
            board: PropTypes.arrayOf(React.PropTypes.number).isRequired,
            score: PropTypes.arrayOf(React.PropTypes.number).isRequired,
            currentIndexPlayer: PropTypes.number.isRequired,
        }).isRequired,
    }

    render() {
        const game = this.props.game;

        return (
            <div className="game">
                <Header />

                <Board
                    board={game.board}
                    currentIndexPlayer={game.currentIndexPlayer}
                    canPlay
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

export default withRedux(initStore, state => ({ game: state.game }))(Game);
