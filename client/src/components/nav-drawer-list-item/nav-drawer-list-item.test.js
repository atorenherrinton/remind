/** @format */

import React from 'react';
import NavDrawerListItem from './nav-drawer-list-item';
import { shallow } from 'enzyme';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

describe('Navigation Drawer List Item', () => {
	let navDrawerListItemWrapper;

	beforeAll(() => {
		navDrawerListItemWrapper = shallow(<NavDrawerListItem />);
	});
	it('renders a list item', () => {
		const listItem = navDrawerListItemWrapper.find(ListItem);
		expect(listItem).toHaveLength(1);
	});
	it('renders a list item icon container', () => {
		const listItemIcon = navDrawerListItemWrapper.find(ListItemIcon);
		expect(listItemIcon).toHaveLength(1);
	});
	it('renders list item text component', () => {
		const listItemText = navDrawerListItemWrapper.find(ListItemText);
		expect(listItemText).toHaveLength(1);
	});
	it('list item text component renders correct text', () => {
		const text = 'important reminders list';
		const navDrawerListItemWrapper = shallow(<NavDrawerListItem listItemText={text} />);
		const listItemText = navDrawerListItemWrapper.find(ListItemText);
		expect(listItemText.prop('primary')).toEqual(text);
	});
});
