import React, { PropTypes, Component } from 'react';
import withRedux from 'next-redux-wrapper';
import Link from 'next/link';

import { initStore } from '../src/reducers/game';
import { startGame as startGameAction } from '../src/actions/actions';

import Header from '../src/components/header';

export class Index extends Component {
    static propTypes = {
        startGame: PropTypes.func.isRequired,
    }

    startPlayingWithPlayer = () => {
        this.props.startGame(true);
    }

    startPlayingWithIA = () => {
        this.props.startGame(false);
    }

    render() {
        return (
            <div>
                <Header />

                <nav className="menu">
                    <h1 className="menu__h1">Awale</h1>
                    <ul className="menu__ul">
                        <li className="menu__li" onClick={this.startPlayingWithIA}>
                            <Link href="/game"><a className="menu__a" id="newGame">Solo</a></Link>
                        </li>
                        <li className="menu__li" onClick={this.startPlayingWithPlayer}>
                            <Link href="/game"><a className="menu__a">With a friend</a></Link>
                        </li>
                    </ul>
                </nav>
                <style jsx>{`
                  .menu {
                      display: flex;
                      flex-direction: column;
                      font-size: 60px;
                      height: 100%;
                      justify-content: center;
                      text-align: center;
                      width: 100%;
                  }
                  .menu__h1 {
                      color: #ecf0f1;
                      font-weight: 200;
                      margin-bottom: 30px;
                  }
                  .menu__ul {
                      list-style-type: none;
                      padding: 0;
                  }
                  .menu__a {
                      text-decoration: none;
                      color: #138a72;
                  }
                  .menu__a:hover{
                    color: white;
                  }
                `}</style>
            </div>
        );
    }
}

export default withRedux(initStore, null, { startGame: startGameAction })(Index);
