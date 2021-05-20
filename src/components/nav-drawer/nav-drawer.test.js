/** @format */

import React from 'react';
import NavDrawer from './nav-drawer';
import { render, screen } from '@testing-library/react';
import { mount, shallow } from 'enzyme';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NavDrawerListItem from '../nav-drawer-list-item/nav-drawer-list-item';
import Toolbar from '@material-ui/core/Toolbar';

describe('Navigation Drawer', () => {
	it('renders an drawer', () => {
		const navDrawerWrapper = shallow(<NavDrawer />);
		const drawer = navDrawerWrapper.find(Drawer);
		expect(drawer).toHaveLength(1);
	});

	it('renders an toolbar', () => {
		const navDrawerWrapper = shallow(<NavDrawer />);
		const toolbar = navDrawerWrapper.find(Toolbar);
		expect(toolbar).toHaveLength(1);
	});
	it('renders a navagation link container', () => {
		render(<NavDrawer />);
		expect(screen.getAllByTitle('drawerContainer')).toHaveLength(1);
	});
	it('renders a list', () => {
		const navDrawerWrapper = shallow(<NavDrawer />);

		const list = navDrawerWrapper.find(List);
		expect(list).toHaveLength(1);
	});
	it('renders correct number of list items', () => {
		const listItems = [0, 1, 2];
		const navDrawerWrapper = shallow(<NavDrawer listItems={listItems} />);
		const navDrawerItems = navDrawerWrapper.find(NavDrawerListItem);
		expect(navDrawerItems).toHaveLength(listItems.length);
	});

	it('renders the correct text for each list item', () => {
		const listItems = [
			{ itemText: 'Important Reminders', icon: 'Today' },
			{ itemText: 'Scheduled', icon: 'Schedule' },
			{ itemText: 'Completed', icon: 'CheckCircle' },
		];
		render(<NavDrawer listItems={listItems} />);
		listItems.forEach((listItem) => {
			expect(screen.getByText(listItem.itemText));
		});
	});

	it('renders the correct icon for each list item', () => {
		const listItems = [
			{ itemText: 'Important Reminders', icon: 'Today' },
			{ itemText: 'Scheduled', icon: 'Schedule' },
			{ itemText: 'Completed', icon: 'CheckCircle' },
		];
		render(<NavDrawer listItems={listItems} />);
		listItems.forEach((listItem) => {
			expect(screen.getByTitle(listItem.icon));
		});
	});
});
