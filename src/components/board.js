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

        const turn = this.props.currentIndexPlayer === 0 ? 'pit-bottom_color' : 'pit-top_color';

        return (
            <div className={`board ${turn}`}>
                {topBoard.map((pit, i) =>
                    <PitButton
                        onPress={this.pickPebble}
                        pitValue={pit}
                        pitIndex={size - 1 - i}
                        key={`topBoard-${i}`}
                    />
                )}
                {bottomBoard.map((pit, i) =>
                    <PitButton
                        onPress={this.pickPebble}
                        pitValue={pit}
                        pitIndex={i}
                        key={`bottomBoard-${i}`}
                    />
                )}

                <style jsx global>{`
                  .board {
                      background: #f39c12;
                      border-radius: 5px 5px 21px 21px;
                      display: flex;
                      flex-wrap: wrap;
                      height: 100%;
                      justify-content: space-around;
                      padding: 20px;
                  }
                  .board:before {
                      background: #d35400;
                      border-radius: 0 0 20px 20px;
                      content: '';
                      height: 20px;
                      position: absolute;
                      bottom: 0;
                      width: 100%;
                  }
                  .board:after {
                      background: black;
                      content: '';
                      height: 100%;
                      opacity: 0.3;
                      position: absolute;
                      top: 0;
                      transform: translateY(20px);
                      width: calc(100% - 20px);
                      z-index: -1;
                  }

                  .pit-top_color .pit:nth-child(n+7),
                  .pit-bottom_color .pit:nth-child(-n+6) {
                        background: #b94a00;
                  }

                  .pit-top_color .pit:nth-child(n+7),
                  .pit-bottom_color .pit:nth-child(-n+6) {
                        color: #f39c12;
                  }
                `}</style>
            </div>
        );
    }
}
