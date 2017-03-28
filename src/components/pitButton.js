import React, { PropTypes, Component } from 'react';

export default class PitButton extends Component {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
        pitValue: PropTypes.number.isRequired,
        pitIndex: PropTypes.number.isRequired,
        enabled: PropTypes.bool,
    }

    static defaultProps = {
        enabled: true,
    }

    pickPebble = () => {
        this.props.onPress(this.props.pitIndex);
    }

    render() {
        return (
            !this.props.enabled ?
                <div className="pit pit-disabled">{this.props.pitValue}</div> :
                <div onPress={this.pickPebble} className="pit">{this.props.pitValue}</div>
        );
    }
}
