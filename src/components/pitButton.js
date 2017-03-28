import React, { PropTypes, Component } from 'react';

export default class PitButton extends Component {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
        pitValue: PropTypes.number.isRequired,
        pitIndex: PropTypes.number.isRequired,
    }

    static defaultProps = {
        enabled: true,
    }

    pickPebble = () => {
        this.props.onPress(this.props.pitIndex);
    }

    render() {
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
