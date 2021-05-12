/** @format */

import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Grid from '@material-ui/core/Grid';
import Header from './components/header/header';
import ReminderList from './components/reminder-list/reminder-list';
import NavDrawer from './components/nav-drawer/nav-drawer';

describe('App', () => {
	let appWrapper;

	beforeAll(() => {
		appWrapper = shallow(<App />);
	});

	it('renders a header', () => {
		const header = appWrapper.find(Header);
		expect(header).toHaveLength(1);
	});

	it('renders a grid container', () => {
		const gridContainer = appWrapper.find('#container');
		expect(gridContainer).toHaveLength(1);
	});

	it('renders two grid items inside the grid row', () => {
		const gridItem = appWrapper.find('#item');
		expect(gridItem).toHaveLength(2);
	});

	it('renders a reminder list', () => {
		const reminderList = appWrapper.find(ReminderList);
		expect(reminderList).toHaveLength(1);
	});

	it('renders a navigation drawer', () => {
		const navDrawer = appWrapper.find(NavDrawer);
		expect(navDrawer).toHaveLength(1);
	});
});
