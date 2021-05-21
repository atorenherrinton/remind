/** @format */

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { render, screen } from '@testing-library/react';
import { toHaveStyle } from '@testing-library/jest-dom';
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
		expect(screen.queryByRole('text-field')).not.toBeInTheDocument();
	});

	test('renders a text field when button is clicked', () => {
		render(
			<Provider store={store}>
				<ReminderList />
			</Provider>
		);
		userEvent.click(screen.getByRole('button'));
		expect(screen.queryByRole('text-field')).toBeInTheDocument();
	});

	test('the textfield has autocomplete turned off', () => {
		render(
			<Provider store={store}>
				<ReminderList />
			</Provider>
		);
		userEvent.click(screen.getByRole('button'));
		expect(screen.getByDisplayValue('').autocomplete).toEqual('off');
	});

	// test('the button disappears when clicked', () => {
	// 	const reminderListWrapper = shallow(<ReminderList />);
	// 	let button = reminderListWrapper.find(Button);
	// 	button.simulate('click');
	// 	button = reminderListWrapper.find(Button);
	// 	expect(button).toHaveLength(0);
	// });

	// test('the text field value matches what has been typed', () => {
	// 	const reminderListWrapper = shallow(<ReminderList />);
	// 	const button = reminderListWrapper.find(Button);
	// 	button.simulate('click');
	// 	let textField = reminderListWrapper.find(TextField);
	// 	const text = 'testing123';
	// 	textField.simulate('change', { target: { value: text } });
	// 	textField = reminderListWrapper.find(TextField);
	// 	expect(textField.prop('value')).toEqual(text);
	// });

	// test('a new reminder is created when the return key is pressed', () => {
	// 	const reminderListWrapper = shallow(<ReminderList />);
	// 	const button = reminderListWrapper.find(Button);
	// 	button.simulate('click');
	// 	let textField = reminderListWrapper.find(TextField);
	// 	const text = 'testing123';
	// 	textField.simulate('change', { target: { value: text } });
	// 	textField = reminderListWrapper.find(TextField);
	// 	textField.simulate('keypress', { key: 'Enter' });
	// 	const reminderItem = reminderListWrapper.find(ReminderItem);
	// 	expect(reminderItem).toHaveLength(1);
	// });

	// test('the value of the text field resets when the return key is pressed', () => {
	// 	const reminderListWrapper = shallow(<ReminderList />);
	// 	let button = reminderListWrapper.find(Button);
	// 	button.simulate('click');
	// 	let textField = reminderListWrapper.find(TextField);
	// 	const text = 'testing123';
	// 	textField.simulate('change', { target: { value: text } });
	// 	textField = reminderListWrapper.find(TextField);
	// 	textField.simulate('keypress', { key: 'Enter' });
	// 	const toggleContainer = reminderListWrapper.find('#toggleContainer');
	// 	expect(toggleContainer.prop('value')).toEqual('');
	// });

	// test('the button becomes visible when the return key is pressed', () => {
	// 	const reminderListWrapper = shallow(<ReminderList />);
	// 	let button = reminderListWrapper.find(Button);
	// 	button.simulate('click');
	// 	let textField = reminderListWrapper.find(TextField);
	// 	const text = 'testing123';
	// 	textField.simulate('change', { target: { value: text } });
	// 	textField = reminderListWrapper.find(TextField);
	// 	textField.simulate('keypress', { key: 'Enter' });
	// 	button = reminderListWrapper.find(Button);
	// 	expect(button).toHaveLength(1);
	// });

	// test('the text disappears when the return key is pressed', () => {
	// 	const reminderListWrapper = shallow(<ReminderList />);
	// 	let button = reminderListWrapper.find(Button);
	// 	button.simulate('click');
	// 	let textField = reminderListWrapper.find(TextField);
	// 	const text = 'testing123';
	// 	textField.simulate('change', { target: { value: text } });
	// 	textField = reminderListWrapper.find(TextField);
	// 	textField.simulate('keypress', { key: 'Enter' });
	// 	textField = reminderListWrapper.find(TextField);
	// 	expect(textField).toHaveLength(0);
	// });

	// test('a new reminder cannot be created when the text field is empty', () => {
	// 	render(<ReminderList />);
	// 	userEvent.click(screen.getByRole('button'));
	// 	userEvent.type(screen.getByRole('textField'), '{enter}');
	// 	expect(screen.queryAllByRole('reminderItem')).toHaveLength(0);
	// });
});
