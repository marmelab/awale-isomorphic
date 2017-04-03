import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import App from '../pages/index';

describe('Title', () => {
    it('should contain the word "Awale"', () => {
        const app = shallow(<App />);
        expect(app.find('h1').text()).toEqual('Awale');
    });

    it('should contain two element in the menu', () => {
        const app = shallow(<App />);
        expect(app.find('a').length).toEqual(2);
    });

    it('should match with snapshot', () => {
        const component = renderer.create(<App />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
