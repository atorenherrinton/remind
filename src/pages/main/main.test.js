/** @format */

import React from 'react';
import { render } from 'react-testing-library';
import Main from './main';
import Header from '../../components/header/header';
import IconButton from '@material-ui/core/IconButton';
import ReminderCard from '../../components/reminder-card/reminder-card';
import ReminderItem from '../../components/reminder-item/reminder-item';
import ReminderList from '../../components/reminder-list/reminder-list';
import NavDrawer from '../../components/nav-drawer/nav-drawer';

describe('Main', () => {
	let mainWrapper;

	beforeAll(() => {
		mainWrapper = render(<Main />);
	});

	it('renders a header', () => {
		const header = mainWrapper.find(Header);
		expect(header).toHaveLength(1);
	});

	it('renders a grid container', () => {
		const gridContainer = mainWrapper.find('#container');
		expect(gridContainer).toHaveLength(1);
	});

	it('renders two grid items inside the grid row', () => {
		const gridItem = mainWrapper.find('#item');
		expect(gridItem).toHaveLength(2);
	});

	it('renders a reminder list', () => {
		const reminderList = mainWrapper.find(ReminderList);
		expect(reminderList).toHaveLength(1);
	});

	it('renders a navigation drawer', () => {
		const navDrawer = mainWrapper.find(NavDrawer);
		expect(navDrawer).toHaveLength(1);
	});

	it('clicking the info button on a reminder list item opens a reminder card', () => {
		const text = "let's go party!";
		const reminderItemWrapper = shallow(<ReminderItem reminderText={text} />);
		const infoButton = reminderItemWrapper.find(IconButton);
		infoButton.simulate('click');
		const reminderCard = mainWrapper.find(ReminderCard);
		expect(reminderCard).toHaveLength(1);
	});
});
