import React, { PropTypes, Component } from 'react';
import withRedux from 'next-redux-wrapper';

import { initStore, startGame } from '../src/reducers/game';

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

    componentDidMount() {
        this.props.dispatch(startGame());
    }

    render() {
        const game = this.props.game;
        const isCurrentPlayerOne = (game.currentIndexPlayer === 0);

        return (
            <div>
                <Header />

                <Score
                    score={game.score[1]}
                    text="Their turn"
                    flexDirection="row-reverse"
                    highlight={!isCurrentPlayerOne}
                    color="#34495e"
                />

                <div className="game">
                    <Board
                        board={game.board}
                        currentIndexPlayer={game.currentIndexPlayer}
                        canPlay
                    />
                </div>

                <Score
                    score={game.score[0]}
                    text="Your turn"
                    flexDirection="row"
                    highlight={isCurrentPlayerOne}
                    color="#9b59b6"
                />

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

const mapStateToProps = state => ({
    game: state.game,
});

export default withRedux(initStore, mapStateToProps)(Game);
