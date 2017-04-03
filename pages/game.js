import React, { PropTypes, Component } from 'react';
import withRedux from 'next-redux-wrapper';

import { initStore } from '../src/reducers/game';
import { GAME_CONTINUE } from '../src/awale/constants/Constants';

import Header from '../src/components/header';
import Board from '../src/components/board';
import Score from '../src/components/score';
import GameOver from '../src/components/gameOver';

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
        const isCurrentPlayerOne = (game.currentIndexPlayer === 0);
        const gameContinue = game.gameState === GAME_CONTINUE;
        const textScore = gameContinue ? 'turn' : 'score';

        return (
            <div>
                <Header />

                <Score
                    score={game.score[1]}
                    text={`Their ${textScore}`}
                    flexDirection="row-reverse"
                    highlight={!isCurrentPlayerOne || !gameContinue}
                    color="#34495e"
                />

                <div className="game">
                    {gameContinue
                    ? <Board
                        board={game.board}
                        currentIndexPlayer={game.currentIndexPlayer}
                    />
                    : <GameOver />}
                </div>

                <Score
                    score={game.score[0]}
                    text={`Your ${textScore}`}
                    flexDirection="row"
                    highlight={isCurrentPlayerOne || !gameContinue}
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
