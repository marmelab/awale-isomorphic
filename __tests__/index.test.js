import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import App from '../pages/index';

describe('Index with Enzyme', () => {
    it('App shows "Hello world!"', () => {
        const app = shallow(
            <App />
        );
        expect(app.find('p').text()).toEqual('Hello World!');
    });
});

describe('Index  with Snapshot Testing', () => {
    it('App shows "Hello world!"', () => {
        const component = renderer.create(<App />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
