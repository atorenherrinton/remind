/** @format */

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { v4 as uuidv4 } from 'uuid';
import userEvent from '@testing-library/user-event';
import ReminderItem from '../reminder-item/reminder-item';

describe('Reminder', () => {
	const reminder = { title: 'take out the trash', id: uuidv4() };
	beforeEach(() => {
		render(
			<Provider store={store}>
				<ReminderItem title={reminder.title} />
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
		expect(screen.getAllByText(reminder.title)).toHaveLength(1);
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
