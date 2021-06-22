/** @format */

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { reset, setReminders } from '../../slices/reminders-slice';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { v4 as uuidv4 } from 'uuid';
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
		const reminder = { title: 'take out the trash', id: uuidv4() };
		store.dispatch(setReminders(reminder));
		userEvent.click(screen.getByRole('open-reminder-card'));
		expect(screen.getByTitle('reminder-card'));
	});

	test('clicking the on a reminder item opens a reminder card with the correct text', () => {
		store.dispatch(reset());
		const reminders = [
			{ title: 'take out the trash', id: uuidv4() },
			{ title: 'brush your teeth', id: uuidv4() },
			{ title: 'walk the dogs', id: uuidv4() },
		];
		reminders.forEach((reminder) => {
			store.dispatch(setReminders(reminder));
		});
		userEvent.click(screen.getAllByRole('open-reminder-card')[1]);
		expect(screen.getByTitle('reminder-card')).toHaveTextContent(reminders[1].title);
	});

	test('when reminder card is open, clicking DONE will close reminder and open reminders again', () => {
		userEvent.click(screen.getByRole('done'));
		expect(screen.getByTitle('reminder-list'));
	});

	test('when the reminder card is open and the text field is changed, clicking DONE will update the redux store reminders', () => {
		store.dispatch(reset());
		const reminders = [
			{ title: 'take out the trash', id: uuidv4() },
			{ title: 'brush your teeth', id: uuidv4() },
			{ title: 'walk the dogs', id: uuidv4() },
		];
		reminders.forEach((reminder) => {
			store.dispatch(setReminders(reminder));
		});
		userEvent.click(screen.getAllByRole('open-reminder-card')[1]);
		userEvent.click(screen.getByRole('item-text'));
		userEvent.type(screen.getByRole('textbox'), '{selectall}{del}Hello everyone!{enter}');
		userEvent.click(screen.getByRole('done'));
		const updatedReminders = store.getState().reminders.reminders;
		expect(updatedReminders.find((reminder) => reminder.title === 'Hello everyone!')).toBeTruthy();
	});

	test('when the reminder card is open and the date field is changed, clicking DONE will update the redux store reminder', () => {
		store.dispatch(reset());
		const reminder = { title: 'take out the trash', id: uuidv4() };
		store.dispatch(setReminders(reminder));
		userEvent.click(screen.getAllByRole('open-reminder-card')[0]);
		userEvent.click(screen.getByRole('toggle-date-switch'));
		userEvent.type(screen.getByRole('textbox'), '{selectall}{del}12/12/2012{enter}');
		userEvent.click(screen.getByRole('done'));
		const updatedReminders = store.getState().reminders.reminders;
		expect(updatedReminders[0].date === 'Wed Dec 12 2012 00:00:00 GMT-0800 (Pacific Standard Time)').toBeTruthy();
	});

	test('when the reminder card is opened, the date switch turned on and then off should delete the date', () => {
		store.dispatch(reset());
		const reminder = { title: 'take out the trash', id: uuidv4() };
		store.dispatch(setReminders(reminder));
		userEvent.click(screen.getAllByRole('open-reminder-card')[0]);
		userEvent.click(screen.getByRole('toggle-date-switch'));
		userEvent.click(screen.getByRole('toggle-date-switch'));
		userEvent.click(screen.getByRole('done'));
		const updatedReminders = store.getState().reminders.reminders;
		expect(updatedReminders[0].date).toBeFalsy();
	});

	test('when the reminder card is opened, the date switch turned on and then off, closing and then reopening the card the date switch should be off', () => {
		store.dispatch(reset());
		const reminder = { title: 'take out the trash', id: uuidv4() };
		store.dispatch(setReminders(reminder));
		userEvent.click(screen.getAllByRole('open-reminder-card')[0]);
		userEvent.click(screen.getByRole('toggle-date-switch'));
		userEvent.click(screen.getByRole('toggle-date-switch'));
		userEvent.click(screen.getByRole('done'));
		userEvent.click(screen.getAllByRole('open-reminder-card')[0]);
		expect(screen.getByRole('toggle-date-switch')).not.toHaveClass('Mui-checked');
	});

	test('when the reminder card is open and the time switch is turned on, clicking DONE will update the redux store reminder', () => {
		store.dispatch(reset());
		const reminder = { title: 'take out the trash', id: uuidv4() };
		store.dispatch(setReminders(reminder));
		userEvent.click(screen.getAllByRole('open-reminder-card')[0]);
		userEvent.click(screen.getByRole('toggle-time-switch'));
		userEvent.click(screen.getByRole('done'));
		const updatedReminders = store.getState().reminders.reminders;
		expect(updatedReminders[0].time).toBeTruthy();
	});
});
