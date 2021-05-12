/** @format */

import React from 'react';
import ReminderList from './reminder-list';
import { mount, shallow } from 'enzyme';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ReminderItem from '../reminder-item/reminder-item';

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

	it('renders the correct text for each reminder', () => {
		const reminders = ['take out the trash', 'brush your teeth', 'walk the dogs'];
		const reminderListWrapper = mount(<ReminderList reminders={reminders} />);
		const reminderItems = reminderListWrapper.find(ReminderItem);
		reminderItems.forEach((item, i) => {
			const reminderItem = item.find(ListItemText);
			expect(reminderItem.prop('primary')).toEqual(reminders[i]);
		});
	});
});
