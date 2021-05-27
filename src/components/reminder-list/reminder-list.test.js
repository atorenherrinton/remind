/** @format */

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { reset, setReminders } from '../../slices/reminders-slice';
import { render, screen } from '@testing-library/react';
import { v4 as uuidv4 } from 'uuid';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import ReminderList from './reminder-list';

describe('Reminder List', () => {
	beforeEach(() => {
		render(
			<Provider store={store}>
				<ReminderList />
			</Provider>
		);
	});
	afterEach(() => {
		store.dispatch(reset());
	});

	test('renders a list', () => {
		expect(screen.getByRole('list'));
	});

	test('renders no ReminderItem elements if none exist in the reminders list', () => {
		expect(screen.queryByTitle('reminder-item')).not.toBeInTheDocument();
	});

	test('renders one ReminderItem elements if only one exist in the reminders list', () => {
		const reminders = [{ title: 'take out the trash', id: uuidv4() }];
		reminders.forEach((reminder) => {
			store.dispatch(setReminders(reminder));
		});

		expect(screen.getAllByTitle('reminder-item')).toHaveLength(1);
	});

	test('renders one ReminderItem elements for each item in the reminders list', () => {
		const reminders = [
			{ title: 'take out the trash', id: uuidv4() },
			{ title: 'brush your teeth', id: uuidv4() },
			{ title: 'walk the dogs', id: uuidv4() },
		];
		reminders.forEach((reminder) => {
			store.dispatch(setReminders(reminder));
		});

		expect(screen.getAllByTitle('reminder-item')).toHaveLength(reminders.length);
	});

	test('displays the correct text for each reminder', () => {
		const reminders = [
			{ title: 'take out the trash', id: uuidv4() },
			{ title: 'brush your teeth', id: uuidv4() },
			{ title: 'walk the dogs', id: uuidv4() },
		];

		reminders.forEach((reminder) => {
			store.dispatch(setReminders(reminder));
			expect(screen.getByText(reminder.title));
		});
	});

	test('renders a button', () => {
		expect(screen.getByRole('button'));
	});

	test('the button text displays Add Reminder', () => {
		expect(screen.getByRole('button')).toHaveTextContent('Add Reminder');
	});

	test('renders a list when button is clicked', () => {
		userEvent.click(screen.getByRole('button'));
		expect(screen.getByTitle('add-new-reminder'));
	});

	test('renders no listItem when component first renders', () => {
		expect(screen.queryByRole('reminder-item')).not.toBeInTheDocument();
	});

	test('renders a listItem when button is clicked', () => {
		userEvent.click(screen.getByRole('button'));
		expect(screen.queryByRole('reminder-item'));
	});

	test('renders a text field when button is clicked', () => {
		userEvent.click(screen.getByRole('button'));
		expect(screen.getByRole('textbox'));
	});

	test('the textfield has autocomplete turned off', () => {
		userEvent.click(screen.getByRole('button'));
		expect(screen.getByRole('textbox').autocomplete).toEqual('off');
	});

	test('the text field value matches what has been typed', () => {
		userEvent.click(screen.getByRole('button'));
		const test = 'testing123';
		userEvent.type(screen.getByRole('textbox'), test);
		expect(screen.getByRole('textbox')).toHaveDisplayValue(test);
	});

	test('a new reminder is created when the return key is pressed', () => {
		userEvent.click(screen.getByRole('button'));
		const test = 'testing123';
		userEvent.type(screen.getByRole('textbox'), test + '{enter}');
		expect(screen.getByRole('item-text'));
	});

	test('the value of the text field resets when the return key is pressed', () => {
		userEvent.click(screen.getByRole('button'));
		const test = 'testing123';
		userEvent.type(screen.getByRole('textbox'), test + '{enter}');
		userEvent.click(screen.getByRole('button'));
		expect(screen.getByRole('textbox')).toHaveDisplayValue('');
	});

	test('the button becomes visible when the return key is pressed', () => {
		userEvent.click(screen.getByRole('button'));
		const test = 'testing123';
		userEvent.type(screen.getByRole('textbox'), test + '{enter}');
		expect(screen.getAllByRole('button')).toHaveLength(1);
	});

	test('the text field disappears when the return key is pressed', () => {
		userEvent.click(screen.getByRole('button'));
		const test = 'testing123';
		userEvent.type(screen.getByRole('textbox'), test + '{enter}');
		expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
	});

	test('a new reminder cannot be created when the text field is empty', () => {
		userEvent.click(screen.getByRole('button'));
		userEvent.type(screen.getByRole('textbox'), '{enter}');
		expect(screen.queryByTitle('reminder-item')).not.toBeInTheDocument();
	});
});
