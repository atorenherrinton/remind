/** @format */

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { cleanup, render, screen } from '@testing-library/react';
import { reset, setReminders } from '../../slices/reminders-slice';
import '@testing-library/jest-dom';
import { v4 as uuidv4 } from 'uuid';
import userEvent from '@testing-library/user-event';
import ReminderCard from './reminder-card';

describe('Reminder Card', () => {
	afterEach(() => {
		store.dispatch(reset());
	});

	test('renders a card', () => {
		const reminder = { title: 'take out the trash', id: uuidv4() };
		render(
			<Provider store={store}>
				<ReminderCard title={reminder.title} id={reminder.id} />
			</Provider>
		);
		expect(screen.getByRole('card'));
	});

	test('renders CardContent', () => {
		const reminder = { title: 'take out the trash', id: uuidv4() };
		render(
			<Provider store={store}>
				<ReminderCard title={reminder.title} id={reminder.id} />
			</Provider>
		);
		expect(screen.getByRole('card-content'));
	});

	test('renders a list', () => {
		const reminder = { title: 'take out the trash', id: uuidv4() };
		render(
			<Provider store={store}>
				<ReminderCard title={reminder.title} id={reminder.id} />
			</Provider>
		);
		expect(screen.getByRole('list'));
	});

	test('renders a reminder header list item', () => {
		const reminder = { title: 'take out the trash', id: uuidv4() };
		render(
			<Provider store={store}>
				<ReminderCard title={reminder.title} id={reminder.id} />
			</Provider>
		);
		expect(screen.getByRole('reminder-header'));
	});

	test('renders a secondary action container', () => {
		const reminder = { title: 'take out the trash', id: uuidv4() };
		render(
			<Provider store={store}>
				<ReminderCard title={reminder.title} id={reminder.id} />
			</Provider>
		);
		expect(screen.getAllByRole('close-reminder'));
	});

	test('renders a button', () => {
		const reminder = { title: 'take out the trash', id: uuidv4() };
		render(
			<Provider store={store}>
				<ReminderCard title={reminder.title} id={reminder.id} />
			</Provider>
		);
		expect(screen.getByRole('done'));
	});

	test('button displays text Done', () => {
		const reminder = { title: 'take out the trash', id: uuidv4() };
		render(
			<Provider store={store}>
				<ReminderCard title={reminder.title} id={reminder.id} />
			</Provider>
		);
		expect(screen.getByRole('done')).toHaveTextContent('Done');
	});

	// the list item text is converted into an input when clicked

	test('the listItemText disappears', () => {
		const reminder = { title: 'take out the trash', id: uuidv4() };
		render(
			<Provider store={store}>
				<ReminderCard title={reminder.title} id={reminder.id} />
			</Provider>
		);
		userEvent.click(screen.getByRole('item-text'));
		expect(screen.queryByRole('item-text')).not.toBeInTheDocument();
	});

	test('an textField appears', () => {
		const reminder = { title: 'take out the trash', id: uuidv4() };
		render(
			<Provider store={store}>
				<ReminderCard title={reminder.title} id={reminder.id} />
			</Provider>
		);
		userEvent.click(screen.getByRole('item-text'));
		expect(screen.getByRole('text-field')).toBeInTheDocument();
	});

	test('the textField matches the item text', () => {
		const reminder = { title: 'take out the trash', id: uuidv4() };
		render(
			<Provider store={store}>
				<ReminderCard title={reminder.title} id={reminder.id} />
			</Provider>
		);
		userEvent.click(screen.getByRole('item-text'));
		expect(screen.getByDisplayValue(reminder.title));
	});

	test('the listItemText can be updated from the textField', () => {
		const reminder = { title: 'take out the trash', id: uuidv4() };
		render(
			<Provider store={store}>
				<ReminderCard title={reminder.title} id={reminder.id} />
			</Provider>
		);
		userEvent.click(screen.getByRole('item-text'));
		userEvent.type(screen.getByDisplayValue(reminder.title), '{selectall}{del}Hello everyone!{enter}');
		expect(screen.getByRole('item-text')).toHaveTextContent('Hello everyone!');
	});

	test('renders a list item as a date selector', () => {
		const reminder = { title: 'take out the trash', id: uuidv4() };
		render(
			<Provider store={store}>
				<ReminderCard title={reminder.title} id={reminder.id} />
			</Provider>
		);
		expect(screen.getByRole('date-selector'));
	});

	test('renders an icon container', () => {
		const reminder = { title: 'take out the trash', id: uuidv4() };
		render(
			<Provider store={store}>
				<ReminderCard title={reminder.title} id={reminder.id} />
			</Provider>
		);
		expect(screen.getByRole('date-icon-container'));
	});

	test('renders a date range icon', () => {
		const reminder = { title: 'take out the trash', id: uuidv4() };
		render(
			<Provider store={store}>
				<ReminderCard title={reminder.title} id={reminder.id} />
			</Provider>
		);
		expect(screen.getByTitle('date-icon'));
	});

	test('renders a date selector label', () => {
		const reminder = { title: 'take out the trash', id: uuidv4() };
		render(
			<Provider store={store}>
				<ReminderCard title={reminder.title} id={reminder.id} />
			</Provider>
		);
		expect(screen.getByRole('date')).toHaveTextContent('Date');
	});

	test('renders a secondary action container', () => {
		const reminder = { title: 'take out the trash', id: uuidv4() };
		render(
			<Provider store={store}>
				<ReminderCard title={reminder.title} id={reminder.id} />
			</Provider>
		);
		expect(screen.getAllByRole('select-date'));
	});

	test('renders a toggle-date-switch', () => {
		const reminder = { title: 'take out the trash', id: uuidv4() };
		render(
			<Provider store={store}>
				<ReminderCard title={reminder.title} id={reminder.id} />
			</Provider>
		);
		expect(screen.getByRole('toggle-date-switch'));
	});

	test('turning the date switch on opens a date picker container', () => {
		const reminder = { title: 'take out the trash', id: uuidv4() };
		render(
			<Provider store={store}>
				<ReminderCard title={reminder.title} id={reminder.id} />
			</Provider>
		);
		userEvent.click(screen.getByRole('toggle-date-switch'));
		expect(screen.getByRole('date-picker-container'));
	});

	test('turning the date switch off toggles turns the time switch off', () => {
		const reminder = { title: 'take out the trash', id: uuidv4() };
		render(
			<Provider store={store}>
				<ReminderCard title={reminder.title} id={reminder.id} />
			</Provider>
		);
		userEvent.click(screen.getByRole('toggle-date-switch'));
		userEvent.click(screen.getByRole('toggle-time-switch'));
		userEvent.click(screen.getByRole('toggle-date-switch'));
		expect(screen.getByRole('toggle-time-switch')).not.toHaveClass('Mui-checked');
	});

	test('renders a list item as a time selector', () => {
		const reminder = { title: 'take out the trash', id: uuidv4() };
		render(
			<Provider store={store}>
				<ReminderCard title={reminder.title} id={reminder.id} />
			</Provider>
		);
		expect(screen.getByRole('time-selector'));
	});

	test('renders an time icon container', () => {
		const reminder = { title: 'take out the trash', id: uuidv4() };
		render(
			<Provider store={store}>
				<ReminderCard title={reminder.title} id={reminder.id} />
			</Provider>
		);
		expect(screen.getByRole('time-icon-container'));
	});

	test('renders a time range icon', () => {
		const reminder = { title: 'take out the trash', id: uuidv4() };
		render(
			<Provider store={store}>
				<ReminderCard title={reminder.title} id={reminder.id} />
			</Provider>
		);
		expect(screen.getByTitle('time-icon'));
	});

	test('renders a toggle label', () => {
		const reminder = { title: 'take out the trash', id: uuidv4() };
		render(
			<Provider store={store}>
				<ReminderCard title={reminder.title} id={reminder.id} />
			</Provider>
		);
		expect(screen.getByRole('time')).toHaveTextContent('Time');
	});

	test('renders a secondary action container', () => {
		const reminder = { title: 'take out the trash', id: uuidv4() };
		render(
			<Provider store={store}>
				<ReminderCard title={reminder.title} id={reminder.id} />
			</Provider>
		);
		expect(screen.getAllByRole('select-time'));
	});

	test('renders a toggle-time-switch', () => {
		const reminder = { title: 'take out the trash', id: uuidv4() };
		render(
			<Provider store={store}>
				<ReminderCard title={reminder.title} id={reminder.id} />
			</Provider>
		);
		expect(screen.getByRole('toggle-time-switch'));
	});

	test('turning the time switch on toggles the date picker switch on', () => {
		const reminder = { title: 'take out the trash', id: uuidv4() };
		render(
			<Provider store={store}>
				<ReminderCard title={reminder.title} id={reminder.id} />
			</Provider>
		);
		userEvent.click(screen.getByRole('toggle-time-switch'));
		expect(screen.getByRole('toggle-date-switch')).toHaveClass('Mui-checked');
	});

	test('turning the time switch on opens a date picker container', () => {
		const reminder = { title: 'take out the trash', id: uuidv4() };
		render(
			<Provider store={store}>
				<ReminderCard title={reminder.title} id={reminder.id} />
			</Provider>
		);
		userEvent.click(screen.getByRole('toggle-time-switch'));
		expect(screen.getByRole('date-picker-container'));
	});

	test('turning the time switch on opens a time picker container', () => {
		const reminder = { title: 'take out the trash', id: uuidv4() };
		render(
			<Provider store={store}>
				<ReminderCard title={reminder.title} id={reminder.id} />
			</Provider>
		);
		userEvent.click(screen.getByRole('toggle-time-switch'));
		expect(screen.getByRole('time-picker-container'));
	});

	test('turning the time switch on opens a time picker', () => {
		const reminder = { title: 'take out the trash', id: uuidv4() };
		render(
			<Provider store={store}>
				<ReminderCard title={reminder.title} id={reminder.id} />
			</Provider>
		);
		userEvent.click(screen.getByRole('toggle-time-switch'));
		expect(screen.getByRole('time-picker'));
	});

	test('turning the time switch on toggles the time picker switch on', () => {
		const reminder = { title: 'take out the trash', id: uuidv4() };
		render(
			<Provider store={store}>
				<ReminderCard title={reminder.title} id={reminder.id} />
			</Provider>
		);
		userEvent.click(screen.getByRole('toggle-time-switch'));
		expect(screen.getByRole('toggle-time-switch')).toHaveClass('Mui-checked');
	});

	test('turning the time switch off does not turn the date off', () => {
		const reminder = { title: 'take out the trash', id: uuidv4() };
		render(
			<Provider store={store}>
				<ReminderCard title={reminder.title} id={reminder.id} />
			</Provider>
		);
		userEvent.dblClick(screen.getByRole('toggle-time-switch'));
		expect(screen.getByRole('toggle-date-switch')).toHaveClass('Mui-checked');
	});


	test('if there is already a date, the toggle is open by default', () => {
		const reminder = { title: 'take out the trash', date: new Date(), id: uuidv4() };
		render(
			<Provider store={store}>
				<ReminderCard title={reminder.title} date={reminder.date} id={reminder.id} />
			</Provider>
		);
		expect(screen.getByRole('toggle-date-switch')).toHaveClass('Mui-checked');
	});

	test('if there is already a date, clicking the switch should turn it off', () => {
		const reminder = { title: 'take out the trash', date: new Date(), id: uuidv4() };
		render(
			<Provider store={store}>
				<ReminderCard title={reminder.title} date={reminder.date} id={reminder.id} />
			</Provider>
		);
		userEvent.click(screen.getByRole('toggle-date-switch'));
		expect(screen.getByRole('toggle-date-switch')).not.toHaveClass('Mui-checked');
	});

	test('if there is already a time, the toggle is open by default', () => {
		const reminder = { title: 'take out the trash', date: new Date(), time: true, id: uuidv4() };
		render(
			<Provider store={store}>
				<ReminderCard title={reminder.title} date={reminder.date} time={reminder.time} id={reminder.id} />
			</Provider>
		);
		expect(screen.getByRole('toggle-time-switch')).toHaveClass('Mui-checked');
	});
});
