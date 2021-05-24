/** @format */

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import ReminderList from './reminder-list';

describe('Reminder List', () => {
	test('renders a list', () => {
		render(
			<Provider store={store}>
				<ReminderList />
			</Provider>
		);
		expect(screen.getByRole('list'));
	});

	test('renders no ReminderItem elements if none exist in the reminders list', () => {
		const reminders = [];
		render(
			<Provider store={store}>
				<ReminderList reminders={reminders} />
			</Provider>
		);
		expect(screen.queryByTitle('reminder-item')).not.toBeInTheDocument();
	});

	test('renders one ReminderItem elements if only one exist in the reminders list', () => {
		const reminders = ['take out the trash'];
		render(
			<Provider store={store}>
				<ReminderList reminders={reminders} />
			</Provider>
		);
		expect(screen.getAllByTitle('reminder-item')).toHaveLength(1);
	});

	test('renders one ReminderItem elements for each item in the reminders list', () => {
		const reminders = ['take out the trash', 'brush your teeth', 'walk the dogs'];
		render(
			<Provider store={store}>
				<ReminderList reminders={reminders} />
			</Provider>
		);
		expect(screen.getAllByTitle('reminder-item')).toHaveLength(reminders.length);
	});

	test('displays the correct text for each reminder', () => {
		const reminders = ['take out the trash', 'brush your teeth', 'walk the dogs'];
		render(
			<Provider store={store}>
				<ReminderList reminders={reminders} />
			</Provider>
		);
		reminders.forEach((reminder) => {
			expect(screen.getByText(reminder));
		});
	});

	test('renders a button', () => {
		render(
			<Provider store={store}>
				<ReminderList />
			</Provider>
		);
		expect(screen.getByRole('button'));
	});

	test('the button text displays Add Reminder', () => {
		render(
			<Provider store={store}>
				<ReminderList />
			</Provider>
		);
		expect(screen.getByRole('button')).toHaveTextContent('Add Reminder');
	});

	test('renders no text field when component first renders', () => {
		render(
			<Provider store={store}>
				<ReminderList />
			</Provider>
		);
		expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
	});

	test('renders a text field when button is clicked', () => {
		render(
			<Provider store={store}>
				<ReminderList />
			</Provider>
		);
		userEvent.click(screen.getByRole('button'));
		expect(screen.queryByRole('textbox')).toBeInTheDocument();
	});

	test('the textfield has autocomplete turned off', () => {
		render(
			<Provider store={store}>
				<ReminderList />
			</Provider>
		);
		userEvent.click(screen.getByRole('button'));
		expect(screen.getByRole('textbox').autocomplete).toEqual('off');
	});

	test('the button disappears when clicked', () => {
		render(
			<Provider store={store}>
				<ReminderList />
			</Provider>
		);
		userEvent.click(screen.getByRole('button'));
		expect(screen.queryByRole('button')).not.toBeInTheDocument();
	});

	test('the text field value matches what has been typed', () => {
		render(
			<Provider store={store}>
				<ReminderList />
			</Provider>
		);
		userEvent.click(screen.getByRole('button'));
		const test = 'testing123';
		userEvent.type(screen.getByRole('textbox'), test);
		expect(screen.getByRole('textbox')).toHaveDisplayValue(test);
	});

	test('a new reminder is created when the return key is pressed', () => {
		render(
			<Provider store={store}>
				<ReminderList />
			</Provider>
		);
		userEvent.click(screen.getByRole('button'));
		const test = 'testing123';
		userEvent.type(screen.getByRole('textbox'), test + '{enter}');
		expect(screen.getByRole('item-text'));
	});

	test('the value of the text field resets when the return key is pressed', () => {
		render(
			<Provider store={store}>
				<ReminderList />
			</Provider>
		);
		userEvent.click(screen.getByRole('button'));
		const test = 'testing123';
		userEvent.type(screen.getByRole('textbox'), test + '{enter}');
		userEvent.click(screen.getByRole('button'));
		expect(screen.getByRole('textbox')).toHaveDisplayValue('');
	});

	test('the button becomes visible when the return key is pressed', () => {
		render(
			<Provider store={store}>
				<ReminderList />
			</Provider>
		);
		userEvent.click(screen.getByRole('button'));
		const test = 'testing123';
		userEvent.type(screen.getByRole('textbox'), test + '{enter}');
		expect(screen.getAllByRole('button')).toHaveLength(1);
	});

	test('the text field disappears when the return key is pressed', () => {
		render(
			<Provider store={store}>
				<ReminderList />
			</Provider>
		);
		userEvent.click(screen.getByRole('button'));
		const test = 'testing123';
		userEvent.type(screen.getByRole('textbox'), test + '{enter}');
		expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
	});

	test('a new reminder cannot be created when the text field is empty', () => {
		render(
			<Provider store={store}>
				<ReminderList />
			</Provider>
		);
		userEvent.click(screen.getByRole('button'));
		userEvent.type(screen.getByRole('textbox'), '{enter}');
		expect(screen.queryByTitle('reminder-item')).not.toBeInTheDocument();
	});

	test('clicking the info button on a reminder item renders only 1 card', () => {
		const reminders = ['take out the trash', 'brush your teeth', 'walk the dogs'];
		render(
			<Provider store={store}>
				<ReminderList reminders={reminders} />
			</Provider>
		);
		userEvent.click(screen.getAllByRole('get-more-options')[0]);
		expect(screen.getAllByTitle('reminder-card')).toHaveLength(1);
	});
});
