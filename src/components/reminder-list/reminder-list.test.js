/** @format */

import React from 'react';
import ReminderList from './reminder-list';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { shallow } from 'enzyme';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ReminderItem from '../reminder-item/reminder-item';
import TextField from '@material-ui/core/TextField';

describe('Reminder List', () => {
	it('renders a list', () => {
		const reminderListWrapper = shallow(<ReminderList />);
		const list = reminderListWrapper.find(List);
		expect(list).toHaveLength(1);
	});

	it('renders no ReminderItem elements if none exist in the reminders list', () => {
		const reminders = [];
		const reminderListWrapper = shallow(<ReminderList reminders={reminders} />);
		const reminderReminderItems = reminderListWrapper.find(ReminderItem);

		expect(reminderReminderItems).toHaveLength(0);
	});

	it('renders one ReminderItem elements if only one exist in the reminders list', () => {
		const reminders = ['take out the trash'];
		const reminderListWrapper = shallow(<ReminderList reminders={reminders} />);
		const reminderReminderItems = reminderListWrapper.find(ReminderItem);

		expect(reminderReminderItems).toHaveLength(1);
	});

	it('renders one ReminderItem elements for each item in the reminders list', () => {
		const reminders = ['take out the trash', 'brush your teeth', 'walk the dogs'];
		const reminderListWrapper = shallow(<ReminderList reminders={reminders} />);
		const reminderReminderItems = reminderListWrapper.find(ReminderItem);

		expect(reminderReminderItems).toHaveLength(reminders.length);
	});

	it('displays the correct text for each reminder', () => {
		const reminders = ['take out the trash', 'brush your teeth', 'walk the dogs'];
		render(<ReminderList reminders={reminders} />);
		reminders.forEach((reminder) => {
			expect(screen.getByText(reminder));
		});
	});

	it('renders a button', () => {
		const reminderListWrapper = shallow(<ReminderList />);
		const button = reminderListWrapper.find(Button);
		expect(button).toHaveLength(1);
	});

	it('the button text displays Add Reminder', () => {
		const reminderListWrapper = shallow(<ReminderList />);
		const button = reminderListWrapper.find(Button);
		expect(button.text()).toEqual('Add Reminder');
	});

	it('renders no text field when component first renders', () => {
		const reminderListWrapper = shallow(<ReminderList />);
		const textField = reminderListWrapper.find(TextField);
		expect(textField).toHaveLength(0);
	});

	it('renders a text field when button is clicked', () => {
		const reminderListWrapper = shallow(<ReminderList />);
		const button = reminderListWrapper.find(Button);
		button.simulate('click');
		const textField = reminderListWrapper.find(TextField);
		expect(textField).toHaveLength(1);
	});

	it('the textfield has autocomplete turned off', () => {
		const reminderListWrapper = shallow(<ReminderList />);
		const button = reminderListWrapper.find(Button);
		button.simulate('click');
		const textField = reminderListWrapper.find(TextField);
		expect(textField.prop('autoComplete')).toEqual('off');
	});

	it('the button disappears when clicked', () => {
		const reminderListWrapper = shallow(<ReminderList />);
		let button = reminderListWrapper.find(Button);
		button.simulate('click');
		button = reminderListWrapper.find(Button);
		expect(button).toHaveLength(0);
	});

	it('the text field value matches what has been typed', () => {
		const reminderListWrapper = shallow(<ReminderList />);
		const button = reminderListWrapper.find(Button);
		button.simulate('click');
		let textField = reminderListWrapper.find(TextField);
		const text = 'testing123';
		textField.simulate('change', { target: { value: text } });
		textField = reminderListWrapper.find(TextField);
		expect(textField.prop('value')).toEqual(text);
	});

	it('a new reminder is created when the return key is pressed', () => {
		const reminderListWrapper = shallow(<ReminderList />);
		const button = reminderListWrapper.find(Button);
		button.simulate('click');
		let textField = reminderListWrapper.find(TextField);
		const text = 'testing123';
		textField.simulate('change', { target: { value: text } });
		textField = reminderListWrapper.find(TextField);
		textField.simulate('keypress', { key: 'Enter' });
		const reminderItem = reminderListWrapper.find(ReminderItem);
		expect(reminderItem).toHaveLength(1);
	});

	it('the value of the text field resets when the return key is pressed', () => {
		const reminderListWrapper = shallow(<ReminderList />);
		let button = reminderListWrapper.find(Button);
		button.simulate('click');
		let textField = reminderListWrapper.find(TextField);
		const text = 'testing123';
		textField.simulate('change', { target: { value: text } });
		textField = reminderListWrapper.find(TextField);
		textField.simulate('keypress', { key: 'Enter' });
		const toggleContainer = reminderListWrapper.find('#toggleContainer');
		expect(toggleContainer.prop('value')).toEqual('');
	});

	it('the button becomes visible when the return key is pressed', () => {
		const reminderListWrapper = shallow(<ReminderList />);
		let button = reminderListWrapper.find(Button);
		button.simulate('click');
		let textField = reminderListWrapper.find(TextField);
		const text = 'testing123';
		textField.simulate('change', { target: { value: text } });
		textField = reminderListWrapper.find(TextField);
		textField.simulate('keypress', { key: 'Enter' });
		button = reminderListWrapper.find(Button);
		expect(button).toHaveLength(1);
	});

	it('the text disappears when the return key is pressed', () => {
		const reminderListWrapper = shallow(<ReminderList />);
		let button = reminderListWrapper.find(Button);
		button.simulate('click');
		let textField = reminderListWrapper.find(TextField);
		const text = 'testing123';
		textField.simulate('change', { target: { value: text } });
		textField = reminderListWrapper.find(TextField);
		textField.simulate('keypress', { key: 'Enter' });
		textField = reminderListWrapper.find(TextField);
		expect(textField).toHaveLength(0);
	});

	it('a new reminder cannot be created when the text field is empty', () => {
		render(<ReminderList />);
		userEvent.click(screen.getByRole('button'));
		userEvent.type(screen.getByRole('textField'), '{enter}');
		expect(screen.queryAllByRole('reminderItem')).toHaveLength(0);
	});
});
