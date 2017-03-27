import React, { PropTypes, Component } from 'react';

export default class Board extends Component {
    static propTypes = {
        board: PropTypes.arrayOf(React.PropTypes.number).isRequired,
    }

    render() {
        const size = this.props.board.length;
        const halfSize = size / 2;
        const topBoard = this.props.board.slice(halfSize, size).reverse();
        const bottomBoard = this.props.board.slice(0, halfSize);

        return (
            <div>
                {topBoard.map((pit, i) =>
                    <div>{pit}</div>
                )}
                {bottomBoard.map((pit, i) =>
                    <div>{pit}</div>
                )}
            </div>
        );
    }
}
