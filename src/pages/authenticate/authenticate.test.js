/** @format */

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { render, screen } from '@testing-library/react';
import Authenticate from './authenticate';

describe('Authenticate', () => {
	beforeEach(() => {
		render(
			<Provider store={store}>
				<Authenticate />
			</Provider>
		);
	});

	test('renders a navigation bar', () => {
		expect(screen.getByTitle('nav-bar'));
	});

	test('renders a grid container', () => {
		expect(screen.getByRole('grid-container'));
	});

	test('renders a grid item', () => {
		expect(screen.getByRole('grid-item'));
	});

	test('renders a sign up component by default', () => {
		expect(screen.getByTitle('sign-up'));
	});
});
