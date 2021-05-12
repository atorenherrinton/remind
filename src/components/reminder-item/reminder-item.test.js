/** @format */

import React from 'react';
import ReminderItem from './reminder-item';
import { mount, shallow } from 'enzyme';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

describe('Reminder Item', () => {
	let reminderItemWrapper;

	beforeAll(() => {
		reminderItemWrapper = shallow(<ReminderItem />);
	});

	it('renders a list item', () => {
		const item = reminderItemWrapper.find(ListItem);
		expect(item).toHaveLength(1);
	});

	it('renders an item text object', () => {
		const itemText = reminderItemWrapper.find(ListItemText);
		expect(itemText).toHaveLength(1);
	});

	it('item text object contains correct text', () => {
		const text = "let's go party!";
		const reminderItemWrapper = shallow(<ReminderItem reminderText={text} />);
		const itemText = reminderItemWrapper.find(ListItemText);
		expect(itemText.prop('primary')).toEqual(text);
	});

	it('renders a list item icon', () => {
		const itemIcon = reminderItemWrapper.find(ListItemIcon);
		expect(itemIcon).toHaveLength(1);
	});

	it('renders a checkbox', () => {
		const checkbox = reminderItemWrapper.find(Checkbox);
		expect(checkbox).toHaveLength(1);
	});

	it('checkbox state changes on click', () => {
		const reminderItemWrapper = mount(<ReminderItem />);
		const item = reminderItemWrapper.find(ListItem);
		item.simulate('click');
		const checkbox = reminderItemWrapper.find(Checkbox);
		expect(checkbox.prop('checked')).toEqual(true);
	});
});
