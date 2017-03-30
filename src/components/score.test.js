import React from 'react';
import { shallow } from 'enzyme';
import Score from './score';

describe('<Score />', () => {
    it('should render default score 0', () => {
        const score = shallow(<Score score={0} text="My turn" />);
        expect(score.find('.score-circle').text()).toEqual('0');
    });

    it('should render my turn', () => {
        const score = shallow(<Score score={0} text="My turn" />);
        expect(score.find('.score-text').text()).toEqual('My turn');
    });
});
