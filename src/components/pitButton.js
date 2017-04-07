import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { pickPebble as pickPebbleAction } from '../actions/actions';

export class PitButton extends Component {
    static propTypes = {
        pitValue: PropTypes.number.isRequired,
        pitIndex: PropTypes.number.isRequired,
        pickPebble: PropTypes.func.isRequired,
    }

    handlePickPebble = () => {
        this.props.pickPebble(this.props.pitIndex);
    }

    render() {
        return (
            <button onClick={this.handlePickPebble} className="pit" id={`pit_${this.props.pitIndex}`}>
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

export default connect(null, { pickPebble: pickPebbleAction })(PitButton);
