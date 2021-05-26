/** @format */

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { reset, setReminders } from '../../slices/reminders-slice';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Main from './main';
import ReminderItem from '../../components/reminder-item/reminder-item';

describe('Main', () => {
	beforeEach(() => {
		render(
			<Provider store={store}>
				<Main />
			</Provider>
		);
	});

	test('renders a header', () => {
		expect(screen.getByTitle('header'));
	});

	test('renders a grid container', () => {
		expect(screen.getByRole('container'));
	});

	test('renders two grid items inside the grid row', () => {
		expect(screen.getAllByRole('item')).toHaveLength(2);
	});

	test('renders a reminder list', () => {
		expect(screen.getByTitle('reminder-list'));
	});

	test('renders a navigation drawer', () => {
		expect(screen.getByTitle('navigation-drawer'));
	});

	test('clicking the on a reminder item opens a reminder card', () => {
		const reminder = 'testing testing 123';
		store.dispatch(setReminders(reminder));
		userEvent.click(screen.getByRole('open-reminder-card'));
		expect(screen.getByTitle('reminder-card'));
	});

	test('clicking the on a reminder item opens a reminder card with the correct text', () => {
		store.dispatch(reset());
		const reminders = ['take out the trash', 'brush your teeth', 'walk the dogs'];
		reminders.forEach((reminder) => {
			store.dispatch(setReminders(reminder));
		});
		userEvent.click(screen.getAllByRole('open-reminder-card')[1]);
		expect(screen.getByTitle('reminder-card')).toHaveTextContent(reminders[1]);
	});
});
