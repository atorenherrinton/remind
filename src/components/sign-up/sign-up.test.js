/** @format */

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUp from './sign-up';

describe('Authenticate', () => {
	beforeEach(() => {
		render(
			<Provider store={store}>
				<SignUp />
			</Provider>
		);
	});

	test('renders a card', () => {
		expect(screen.getByRole('card'));
	});

	test('renders a card header', () => {
		expect(screen.getByRole('card-header'));
	});

	test('the card header displays Sign Up', () => {
		expect(screen.getByRole('card-header')).toHaveTextContent('Sign upAnd get reminded');
	});

	test('renders a divider', () => {
		expect(screen.getByRole('divider'));
	});

	test('renders a card content container', () => {
		expect(screen.getByRole('card-content'));
	});

	test('renders an email input', () => {
		expect(screen.getByRole('email-input'));
	});

	test('renders a password input', () => {
		expect(screen.getByRole('password-input'));
	});
});
