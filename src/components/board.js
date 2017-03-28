import React, { PropTypes, Component } from 'react';
import PitButton from './pitButton';

export default class Board extends Component {
    static propTypes = {
        board: PropTypes.arrayOf(React.PropTypes.number).isRequired,
        pickPebble: PropTypes.func.isRequired,
        currentIndexPlayer: PropTypes.number.isRequired,
        canPlay: PropTypes.bool,
    }

    static defaultProps = {
        canPlay: true,
    }

    pickPebble = (position) => {
        this.props.pickPebble(position);
    }

    render() {
        const size = this.props.board.length;
        const halfSize = size / 2;
        const topBoard = this.props.board.slice(halfSize, size).reverse();
        const bottomBoard = this.props.board.slice(0, halfSize);

        return (
            <div className="board">
                {topBoard.map((pit, i) =>
                    <PitButton
                        onPress={this.pickPebble}
                        pitValue={pit}
                        pitIndex={size - 1 - i}
                        enabled={this.props.currentIndexPlayer === 1 && this.props.canPlay}
                        key={`topBoard-${i}`}
                    />
                )}
                {bottomBoard.map((pit, i) =>
                    <PitButton
                        onPress={this.pickPebble}
                        pitValue={pit}
                        pitIndex={i}
                        enabled={this.props.currentIndexPlayer === 0}
                        key={`bottomBoard-${i}`}
                    />
                )}

                <style jsx>{`
                  .board {
                      background: #f39c12;
                      border-radius: 5px 5px 21px 21px;
                      display: flex;
                      flex-wrap: wrap;
                      height: 100%;
                      justify-content: space-around;
                      margin: 0 auto;
                      padding: 20px;
                      position: relative;
                      width: 100%;
                  }
                `}</style>
            </div>
        );
    }
}
