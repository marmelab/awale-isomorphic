import React, { PropTypes, Component } from 'react';

export default class Score extends Component {
    static propTypes = {
        score: PropTypes.arrayOf(React.PropTypes.number).isRequired,
    }

    render() {
        return (
            <div>
                <p className="turnLabel" />
                <section className="score" data-bottom={this.props.score[1]} data-top={this.props.score[1]} />

                <style jsx global>{`
                    .score:before,
                    .score:after {
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
                    .score:before {
                        border-color: #34495e;
                        content: attr(data-top);
                        left: 0;
                        margin-left: -190px
                    }
                    .score:after {
                        border-color: #9b59b6;
                        content: attr(data-bottom);
                        right: 0;
                        margin-right: -190px
                    }
                `}</style>
            </div>
        );
    }
}
