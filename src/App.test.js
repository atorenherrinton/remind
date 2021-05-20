/** @format */

import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
	beforeAll(() => {
		render(
			<Provider store={store}>
				<App />
			</Provider>
		);
	});

	test('renders the main application page', () => {
		expect(screen.getAllByRole('main')).toHaveLength(1);
	});
});
