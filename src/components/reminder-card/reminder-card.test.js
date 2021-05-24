/** @format */

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import ReminderCard from './reminder-card';

describe('Reminder List', () => {
	beforeEach(() => {
		render(
			<Provider store={store}>
				<ReminderCard />
			</Provider>
		);
	});

	test('renders a card', () => {
		expect(screen.getByRole('card'));
	});
});
