import React from 'react';
import { shallow } from 'enzyme';
import { GameOver } from './gameOver';

describe('GameOver', () => {
    it('should contain the word "Game Over"', () => {
        const app = shallow(<GameOver />);
        expect(app.find('h1').text()).toEqual('Game Over');
    });

    it('should contain two element in the menu', () => {
        const app = shallow(<GameOver />);
        expect(app.find('a').length).toEqual(2);
    });
});
