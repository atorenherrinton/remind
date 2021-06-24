/** @format */

import React from 'react';
import { shallow } from 'enzyme';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NavBar from './nav-bar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

describe('Navigation Bar', () => {
	let navBarWrapper;

	beforeAll(() => {
		navBarWrapper = shallow(<NavBar />);
	});

	it('renders an appbar', () => {
		const appbar = navBarWrapper.find(AppBar);
		expect(appbar).toHaveLength(1);
	});

	it('renders an toolbar', () => {
		const toolbar = navBarWrapper.find(Toolbar);
		expect(toolbar).toHaveLength(1);
	});

	it('renders an icon button', () => {
		const iconButton = navBarWrapper.find(IconButton);
		expect(iconButton).toHaveLength(1);
	});

	it('renders a menu icon', () => {
		const menuIcon = navBarWrapper.find(MenuIcon);
		expect(menuIcon).toHaveLength(1);
	});

	it('renders a title', () => {
		const title = navBarWrapper.find(Typography);
		expect(title).toHaveLength(1);
	});

	it('the title of the app is named Remind', () => {
		const title = navBarWrapper.find(Typography);
		expect(title.text()).toEqual('Remind');
	});

	it('renders a sign in button', () => {
		const signinButton = navBarWrapper.find(Button);
		expect(signinButton).toHaveLength(1);
	});
	it('the text in the button displays Sign In', () => {
		const signinButton = navBarWrapper.find(Button);
		expect(signinButton.text()).toEqual('Sign In');
	});
});
