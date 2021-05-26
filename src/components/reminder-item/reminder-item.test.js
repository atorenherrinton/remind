/** @format */

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import ReminderItem from '../reminder-item/reminder-item';

describe('Reminder', () => {
	const text = 'testing testing 123';
	beforeEach(() => {
		render(
			<Provider store={store}>
				<ReminderItem reminderText={text} />
			</Provider>
		);
	});

	test('renders a listItem', () => {
		expect(screen.getByTitle('reminder-item'));
	});

	test('renders a listItemText', () => {
		expect(screen.getByRole('item-text'));
	});

	test('listItemText contains correct text', () => {
		expect(screen.getAllByText(text)).toHaveLength(1);
	});

	test('renders a ListItemSecondaryAction', () => {
		expect(screen.getByRole('secondary-action'));
	});

	test('renders a checkbox', () => {
		expect(screen.getByTestId('checkbox'));
	});

	test('checkbox state changes on click', () => {
		userEvent.click(screen.getByTestId('checkbox'));
		expect(screen.getByTestId('checkbox')).toHaveClass('Mui-checked');
	});
});
