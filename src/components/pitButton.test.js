import React from 'react';
import { shallow } from 'enzyme';
import PitButton from './pitButton';

describe('<PitButton />', () => {
    it('should render 0 value', () => {
        const pitButton = shallow(
            <PitButton
                onPress={() => {}}
                pitValue={0}
                pitIndex={0}
            />);
        expect(pitButton.length).toEqual(1);
        expect(pitButton.find('button').length).toEqual(1);
        expect(pitButton.find('button').text()).toMatch('0');
    });

    it('should render 4 value', () => {
        const pitButton = shallow(
            <PitButton
                onPress={() => {}}
                pitValue={4}
                pitIndex={0}
            />);
        expect(pitButton.find('button').text()).toMatch('4');
    });
});
