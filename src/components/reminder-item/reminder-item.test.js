/** @format */

import React from 'react';
import ReminderItem from './reminder-item';
import { mount, shallow } from 'enzyme';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Info from '@material-ui/icons/InfoOutlined';
import TextField from '@material-ui/core/TextField';

describe('Reminder', () => {
	let reminderItemWrapper;

	beforeAll(() => {
		reminderItemWrapper = shallow(<ReminderItem />);
	});

	it('renders a listItem', () => {
		const listItem = reminderItemWrapper.find(ListItem);
		expect(listItem).toHaveLength(1);
	});

	it('renders a listItemText', () => {
		const listItemText = reminderItemWrapper.find(ListItemText);
		expect(listItemText).toHaveLength(1);
	});

	it('listItemText contains correct text', () => {
		const text = "let's go party!";
		const reminderItemWrapper = shallow(<ReminderItem reminderText={text} />);
		const listItemText = reminderItemWrapper.find(ListItemText);
		expect(listItemText.prop('primary')).toEqual(text);
	});

	it('renders an action/icon container for the checkbox and info button', () => {
		const container = reminderItemWrapper.find('#actions');
		expect(container).toHaveLength(1);
	});

	it('action/icon container className === actions', () => {
		const container = reminderItemWrapper.find('#actions');
		expect(container.prop('className')).toContain('actions');
	});

	it('renders a checkbox container', () => {
		const checkboxContainer = reminderItemWrapper.find('#checkbox');
		expect(checkboxContainer).toHaveLength(1);
	});

	it('checkbox container className === checkbox', () => {
		const checkboxContainer = reminderItemWrapper.find('#checkbox');
		expect(checkboxContainer.prop('className')).toContain('checkbox');
	});

	it('renders a checkbox', () => {
		const checkbox = reminderItemWrapper.find(Checkbox);
		expect(checkbox).toHaveLength(1);
	});

	it('renders a icon button outside of the more options icon', () => {
		const iconButton = reminderItemWrapper.find(IconButton);
		expect(iconButton).toHaveLength(1);
	});

	it('renders a the icon button in the small size', () => {
		const iconButton = reminderItemWrapper.find(IconButton);
		expect(iconButton.prop('size')).toEqual('small');
	});

	it('renders an info icon', () => {
		const info = reminderItemWrapper.find(Info);
		expect(info).toHaveLength(1);
	});

	it('checkbox state changes on click', () => {
		const reminderItemWrapper = shallow(<ReminderItem />);
		let checkbox = reminderItemWrapper.find(Checkbox);
		checkbox.simulate('click');
		checkbox = reminderItemWrapper.find(Checkbox);
		expect(checkbox.prop('checked')).toEqual(true);
	});

	// the list item text is converted into an input when clicked

	it('the listItemText disappears', () => {
		const text = "let's go party!";
		const reminderItemWrapper = shallow(<ReminderItem reminderText={text} />);
		let itemText = reminderItemWrapper.find(ListItemText);
		itemText.simulate('click');
		itemText = reminderItemWrapper.find(ListItemText);
		expect(itemText).toHaveLength(0);
	});

	it('an textField appears', () => {
		const text = "let's go party!";
		const reminderItemWrapper = shallow(<ReminderItem reminderText={text} />);
		const itemText = reminderItemWrapper.find(ListItemText);
		itemText.simulate('click');
		const textField = reminderItemWrapper.find(TextField);
		expect(textField).toHaveLength(1);
	});

	it('the textField matches the item text', () => {
		const text = "let's go party!";
		const reminderItemWrapper = shallow(<ReminderItem reminderText={text} />);
		const itemText = reminderItemWrapper.find(ListItemText);
		itemText.simulate('click');
		const textField = reminderItemWrapper.find(TextField);
		expect(textField.prop('value')).toEqual(text);
	});

	it('the reminder is deleted/hidden if the return key is pressed and the textField is empty', () => {
		const text = "let's go party!";
		const reminderItemWrapper = shallow(<ReminderItem reminderText={text} />);
		let itemText = reminderItemWrapper.find(ListItemText);
		itemText.simulate('click');
		let textField = reminderItemWrapper.find(TextField);
		textField.simulate('change', { target: { value: '' } });
		textField = reminderItemWrapper.find(TextField);
		textField.simulate('keypress', { key: 'Enter' });
		const listItem = reminderItemWrapper.find(ListItem);
		expect(listItem).toHaveLength(0);
	});

	it('the listItemText can be updated from the textField', () => {
		const text = "let's go party!";
		const reminderItemWrapper = shallow(<ReminderItem reminderText={text} />);
		let itemText = reminderItemWrapper.find(ListItemText);
		itemText.simulate('click');
		const textField = reminderItemWrapper.find(TextField);
		const newText = 'testing123';
		textField.simulate('change', { target: { value: newText } });
		textField.simulate('keypress', { key: 'Enter' });
		itemText = reminderItemWrapper.find(ListItemText);
		expect(itemText.prop('primary')).toEqual(newText);
	});

	it('the textField turns into listItemText when return key is pressed', () => {
		const text = "let's go party!";
		const reminderItemWrapper = shallow(<ReminderItem reminderText={text} />);
		let itemText = reminderItemWrapper.find(ListItemText);
		itemText.simulate('click');
		const textField = reminderItemWrapper.find(TextField);
		textField.simulate('keypress', { key: 'Enter' });
		itemText = reminderItemWrapper.find(ListItemText);
		expect(itemText).toHaveLength(1);
	});
});
