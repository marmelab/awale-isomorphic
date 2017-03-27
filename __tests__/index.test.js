import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import App from '../pages/index';

describe('Menu Layout', () => {
    it('Title show Awale', () => {
        const app = shallow(<App />);
        expect(app.find('h1').text()).toEqual('Awale');
    });

    it('Have 2 links on menu', () => {
        const app = shallow(<App />);
        expect(app.find('a').length).toEqual(2);
    });
});

describe('Menu Layout with Snapshot Testing', () => {
    it('App shows Menu layout', () => {
        const component = renderer.create(<App />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
