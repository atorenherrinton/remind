/** @format */

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import ReminderItem from '../reminder-item/reminder-item';

describe('Reminder', () => {
	test('renders a listItem', () => {
		const reminder = {
			title: 'take out the trash',
		};
		render(
			<Provider store={store}>
				<ReminderItem title={reminder.title} />
			</Provider>
		);
		expect(screen.getByTitle('reminder-item'));
	});

	test('renders a listItemText', () => {
		const reminder = {
			title: 'take out the trash',
		};
		render(
			<Provider store={store}>
				<ReminderItem title={reminder.title} />
			</Provider>
		);
		expect(screen.getByRole('item-text'));
	});

	test('listItemText contains correct text', () => {
		const reminder = {
			title: 'take out the trash',
		};
		render(
			<Provider store={store}>
				<ReminderItem title={reminder.title} />
			</Provider>
		);
		expect(screen.getByText(reminder.title));
	});

	test('renders a ListItemSecondaryAction', () => {
		const reminder = {
			title: 'take out the trash',
		};
		render(
			<Provider store={store}>
				<ReminderItem title={reminder.title} />
			</Provider>
		);
		expect(screen.getByRole('secondary-action'));
	});

	test('renders a checkbox', () => {
		const reminder = {
			title: 'take out the trash',
		};
		render(
			<Provider store={store}>
				<ReminderItem title={reminder.title} />
			</Provider>
		);
		expect(screen.getByTestId('checkbox'));
	});

	test('checkbox state changes on click', () => {
		const reminder = {
			title: 'take out the trash',
		};
		render(
			<Provider store={store}>
				<ReminderItem title={reminder.title} />
			</Provider>
		);
		userEvent.click(screen.getByTestId('checkbox'));
		expect(screen.getByTestId('checkbox')).toHaveClass('Mui-checked');
	});

	test('if there is date and no time, it only displays a date', () => {
		const reminder = {
			date: 'Wed Jun 23 2021 23:15:30 GMT-0700 (Pacific Daylight Time)',
			title: 'take out the trash',
			time: false,
		};
		render(
			<Provider store={store}>
				<ReminderItem date={reminder.date} time={reminder.time} title={reminder.title} />
			</Provider>
		);
		const date = 'Wed, June 23, 2021';
		expect(screen.getByText(date));
	});

	test('if the date is for today, Today should be displayed', () => {
		const reminder = {
			date: new Date(),
			title: 'take out the trash',
			time: false,
		};
		render(
			<Provider store={store}>
				<ReminderItem date={reminder.date} time={reminder.time} title={reminder.title} />
			</Provider>
		);
		const date = 'Today';
		expect(screen.getByText(date));
	});

	test('if the date is for today and a time, Today, and time should be displayed.', () => {
		const reminder = {
			date: new Date(),
			title: 'take out the trash',
			time: true,
		};
		render(
			<Provider store={store}>
				<ReminderItem date={reminder.date} time={reminder.time} title={reminder.title} />
			</Provider>
		);
		const date =
			'Today, ' +
			new Date().toLocaleTimeString(undefined, {
				hour: 'numeric',
				minute: 'numeric',
			});
		expect(screen.getByText(date));
	});

	test('if the date is for tomorrow, Tomorrow should be displayed', () => {
		const today = new Date();
		const tomorrow = new Date(today);
		tomorrow.setDate(tomorrow.getDate() + 1);

		const reminder = {
			date: tomorrow,
			title: 'take out the trash',
			time: false,
		};
		render(
			<Provider store={store}>
				<ReminderItem date={reminder.date} time={reminder.time} title={reminder.title} />
			</Provider>
		);
		const date = 'Tomorrow';
		expect(screen.getByText(date));
	});

	test('if there is date and time, a date and a time', () => {
		const reminder = {
			date: 'Wed Jun 23 2021 23:15:30 GMT-0700 (Pacific Daylight Time)',
			title: 'take out the trash',
			time: true,
		};
		render(
			<Provider store={store}>
				<ReminderItem date={reminder.date} time={reminder.time} title={reminder.title} />
			</Provider>
		);
		const date = 'Wed, June 23, 2021, 11:15 PM';
		expect(screen.getByText(date));
	});

	test('if the date is for tomorrow and time, Tomorrow, and time should be displayed', () => {
		const today = new Date();
		const tomorrow = new Date(today);
		tomorrow.setDate(tomorrow.getDate() + 1);

		const reminder = {
			date: tomorrow,
			title: 'take out the trash',
			time: true,
		};
		render(
			<Provider store={store}>
				<ReminderItem date={reminder.date} time={reminder.time} title={reminder.title} />
			</Provider>
		);
		const date =
			'Tomorrow, ' +
			tomorrow.toLocaleTimeString(undefined, {
				hour: 'numeric',
				minute: 'numeric',
			});
		expect(screen.getByText(date));
	});
});
