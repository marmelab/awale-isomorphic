import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'next/link';

import { restartGame as restartGameAction } from '../actions/actions';

export class GameOver extends Component {
    static propTypes = {
        restartGame: PropTypes.func,
    }

    static defaultProps = {
        restartGame: () => {},
    }

    handleRestartGame = () => {
        this.props.restartGame();
    }

    render() {
        return (<nav className="gameover">
            <h1>Game Over</h1>
            <ul>
                <li onClick={this.handleRestartGame}>
                    <Link href="/game">
                        <a>restart</a>
                    </Link>
                </li>
                <li>
                    <Link href="/">
                        <a>back to menu</a>
                    </Link>
                </li>
            </ul>
            <style jsx>
                {`.gameover {
                  font-size: 40px;
                  text-align: center;
                }
                .gameover h1 {
                  color: #ecf0f1;
                  font-weight: 200;
                  margin-bottom: 30px;
                }
                .gameover ul {
                  list-style-type: none;
                  padding: 0;
                }
                .gameover li a {
                  text-decoration: none;
                  color: #138a72;
                }
                .gameover li a:hover {
                  color: white;
                }`}
            </style>
        </nav>);
    }
}

export default connect(null, { restartGame: restartGameAction })(GameOver);
