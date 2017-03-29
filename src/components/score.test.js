import React from 'react';
import { shallow } from 'enzyme';
import Score from './score';

describe('<Score />', () => {
    it('should render default score 0', () => {
        const scoreGame = [0, 0];
        const score = shallow(<Score score={scoreGame} />);
        expect(score.length).toEqual(1);
        expect(score.find('div').length).toEqual(3);
        expect(score.find('p').length).toEqual(1);

        expect(score.find('div.score-top').text()).toEqual('0');
        expect(score.find('div.score-bottom').text()).toEqual('0');
    });

    it('should render score 1 for a top player', () => {
        const scoreGame = [0, 1];
        const score = shallow(<Score score={scoreGame} />);
        expect(score.find('div.score-top').text()).toEqual('1');
        expect(score.find('div.score-bottom').text()).toEqual('0');
    });
});
