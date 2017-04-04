import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { PitButton } from './pitButton';

describe('<PitButton />', () => {
    it('should render 0 value', () => {
        const pitButton = shallow(
            <PitButton
                pickPebble={() => {}}
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
                pickPebble={() => {}}
                pitValue={4}
                pitIndex={0}
            />);
        expect(pitButton.find('button').text()).toMatch('4');
    });

    it('should onPress return 0 (PitIndex)', () => {
        const onButtonClick = sinon.spy();
        const pitButton = shallow(
            <PitButton
                pickPebble={onButtonClick}
                pitValue={4}
                pitIndex={0}
            />);
        pitButton.find('button').simulate('click');
        expect(onButtonClick.calledOnce).toEqual(true);
        expect(onButtonClick.args[0][0]).toEqual(0);
    });

    it('should onPress return 6 (PitIndex)', () => {
        const onButtonClick = sinon.spy();
        const pitButton = shallow(
            <PitButton
                pickPebble={onButtonClick}
                pitValue={4}
                pitIndex={6}
            />);
        pitButton.find('button').simulate('click');
        expect(onButtonClick.calledOnce).toEqual(true);
        expect(onButtonClick.args[0][0]).toEqual(6);
    });
});
