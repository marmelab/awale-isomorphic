import React, { PropTypes, Component } from 'react';
import withRedux from 'next-redux-wrapper';

import { initStore } from '../reducers/game';

class PitButton extends Component {
    static propTypes = {
        pitValue: PropTypes.number.isRequired,
        pitIndex: PropTypes.number.isRequired,
    }

    static defaultProps = {
        enabled: true,
    }

    pickPebble = () => {
        console.log(this.props.pitIndex);
    }

    render() {
        console.log(this.props);
        return (
            <button onClick={this.pickPebble} className="pit">
                {this.props.pitValue}

                <style jsx>{`
                  .pit {
                      border: none;
                      outline: none;
                      background: #d35400;
                      color: #f1c40f;
                      font-size: xx-large;
                      border-radius: 50%;
                      cursor: pointer;
                      height: 40%;
                      margin: 0 8px;
                      padding: 10px;
                      width: 14%;
                  }
                `}</style>
            </button>
        );
    }
}

const connect = state => ({
    pitValue: state.position,
    pitIndex: state.index,
});

export default withRedux(initStore, connect)(PitButton);
