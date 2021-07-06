/** @format */

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { render, screen } from '@testing-library/react';
import { reset } from '../../slices/authenticate-slice';
import Authenticate from './authenticate';
import userEvent from '@testing-library/user-event';

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

	test('if sign in instead is clicked, the sign in component is displayed', () => {
		userEvent.click(screen.getByRole('sign-in-instead'));
		expect(screen.getByTitle('sign-in'));
	});

	test('if sign in instead and then sign up instead is clicked, the sign up instead component is displayed', () => {
		store.dispatch(reset());
		userEvent.click(screen.getByRole('sign-in-instead'));
		userEvent.click(screen.getByRole('sign-up-instead'));
		expect(screen.getByTitle('sign-up'));
	});
});
