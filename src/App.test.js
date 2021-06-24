/** @format */

import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
	beforeEach(() => {
		render(
			<Provider store={store}>
				<App />
			</Provider>
		);
	});

	test('renders the authentication page if there is no user', () => {
		expect(screen.getByTitle('authenticate'));
	});
	
	// test('renders the main application page', () => {
	// 	expect(screen.getByRole('main'))
	// });
});
