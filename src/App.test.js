/** @format */

import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Main from './pages/main/main';

describe('App', () => {
	let appWrapper;

	beforeAll(() => {
		appWrapper = shallow(<App />);
	});

	it('renders the main application page', () => {
		const main = appWrapper.find(Main);
		expect(main).toHaveLength(1);
	});
});
