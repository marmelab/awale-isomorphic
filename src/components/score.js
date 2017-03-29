import React, { PropTypes, Component } from 'react';

export default class Score extends Component {
    static propTypes = {
        score: PropTypes.arrayOf(React.PropTypes.number).isRequired,
    }

    render() {
        return (
            <div>
                <p className="turnLabel" />
                <div className="score score-top">{this.props.score[1]}</div>
                <div className="score score-bottom">{this.props.score[0]}</div>

                <style jsx>{`
                    .score {
                        border: 10px solid white;
                        border-radius: 85px;
                        color: white;
                        font-size: 80px;
                        height: 150px;
                        line-height: 140px;
                        position: absolute;
                        top: 16%;
                        text-align: center;
                        width: 150px;
                    }
                    .score-top {
                        border-color: #34495e;
                        left: 0;
                        margin-left: -190px
                    }
                    .score-bottom {
                        border-color: #9b59b6;
                        right: 0;
                        margin-right: -190px
                    }
                `}</style>
            </div>
        );
    }
}
