import React, { PropTypes, Component } from 'react';

export default class Score extends Component {
    static propTypes = {
        score: PropTypes.arrayOf(React.PropTypes.number).isRequired,
        flexDirection: PropTypes.oneOf(['row', 'row-reverse']).isRequired,
        text: PropTypes.string.isRequired,
        highlight: PropTypes.bool,
        color: PropTypes.string,
    }

    static defaultProps = {
        highlight: true,
        color: 'white',
    }

    containerStyle = direction => ({
        flexDirection: direction,
    })

    borderColor = color => ({
        borderColor: color,
    })

    backgroundColor = color => ({
        backgroundColor: color,
    })

    render() {
        return (
            <div className="score" style={this.containerStyle(this.props.flexDirection)}>
                <div
                    className={`score-circle ${this.props.highlight}`}
                    style={this.borderColor(this.props.color)}
                >
                    {this.props.score}
                </div>

                <div
                    className={`score-hr ${this.props.highlight}`}
                    style={this.backgroundColor(this.props.color)}
                />

                <span
                    className={`score-text ${this.props.highlight}`}
                    style={this.backgroundColor(this.props.color)}
                >
                    {this.props.text}
                </span>

                <style jsx>{`
                    .score {
                        margin: 50px;
                        display: flex;
                    }
                    .score-circle {
                        border: 10px solid white;
                        border-radius: 85px;
                        color: white;
                        font-size: 80px;
                        height: 150px;
                        line-height: 140px;
                        text-align: center;
                        width: 150px;
                    }
                    .false {
                        opacity: 0.5;
                    }
                    .score-text {
                        color: white;
                        padding: 10px;
                        font-size: 22px;
                        border-radius: 6px;
                        height: 100%;
                        margin-top: 50px;
                    }
                    .score-hr {
                        height: 5px;
                        width: 350px;
                        margin-top: 70px;
                    }
                `}</style>
            </div>
        );
    }
}
