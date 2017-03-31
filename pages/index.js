import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import Link from 'next/link';

import { initStore, startGame } from '../src/reducers/game';

import Header from '../src/components/header';

export class Index extends Component {

    startPlayingWithPlayer = () => {
        this.props.dispatch(startGame(true));
    }

    startPlayingWithIA = () => {
        this.props.dispatch(startGame(false));
    }

    render() {
        return (
            <div>
                <Header />

                <nav>
                    <h1>Awale</h1>
                    <ul>
                        <li onClick={this.startPlayingWithIA}><Link href="/game"><a>Solo</a></Link></li>
                        <li onClick={this.startPlayingWithPlayer}><Link href="/game"><a>With a friend</a></Link></li>
                    </ul>
                </nav>
                <style jsx>{`
                  nav {
                      display: flex;
                      flex-direction: column;
                      font-size: 60px;
                      height: 100%;
                      justify-content: center;
                      text-align: center;
                      width: 100%;
                  }
                  nav h1 {
                      color: #ecf0f1;
                      font-weight: 200;
                      margin-bottom: 30px;
                  }
                  nav ul {
                      list-style-type: none;
                      padding: 0;
                  }
                  nav li a {
                      text-decoration: none;
                      color: #138a72;
                  }
                  nav li a:hover{
                    color: white;
                  }
                `}</style>
            </div>
        );
    }
}

export default withRedux(initStore, null)(Index);
