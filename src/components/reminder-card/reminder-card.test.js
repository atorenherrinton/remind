/** @format */

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { render, screen } from '@testing-library/react';
import { reset, setReminders } from '../../slices/reminders-slice';
import '@testing-library/jest-dom';
import { v4 as uuidv4 } from 'uuid';
import userEvent from '@testing-library/user-event';
import ReminderCard from './reminder-card';

describe('Reminder Card', () => {
	const reminder = { title: 'take out the trash', id: uuidv4() };
	beforeEach(() => {
		render(
			<Provider store={store}>
				<ReminderCard title={reminder.title} id={reminder.id} />
			</Provider>
		);
	});

	test('renders a card', () => {
		expect(screen.getByRole('card'));
	});

	test('renders CardContent', () => {
		expect(screen.getByRole('card-content'));
	});

	test('renders a list', () => {
		expect(screen.getByRole('list'));
	});

	test('renders a reminder header list item', () => {
		expect(screen.getByRole('reminder-header'));
	});

	test('renders a secondary action container', () => {
		expect(screen.getAllByRole('close-reminder'));
	});

	test('renders a button', () => {
		expect(screen.getByRole('done'));
	});

	test('button displays text Done', () => {
		expect(screen.getByRole('done')).toHaveTextContent('Done');
	});

	// the list item text is converted into an input when clicked

	test('the listItemText disappears', () => {
		userEvent.click(screen.getByRole('item-text'));
		expect(screen.queryByRole('item-text')).not.toBeInTheDocument();
	});

	test('an textField appears', () => {
		userEvent.click(screen.getByRole('item-text'));
		expect(screen.getByRole('text-field')).toBeInTheDocument();
	});

	test('the textField matches the item text', () => {
		userEvent.click(screen.getByRole('item-text'));
		expect(screen.getByDisplayValue(reminder.title));
	});

	test('the listItemText can be updated from the textField', () => {
		userEvent.click(screen.getByRole('item-text'));
		userEvent.type(screen.getByDisplayValue(reminder.title), '{selectall}{del}Hello everyone!{enter}');
		expect(screen.getByRole('item-text')).toHaveTextContent('Hello everyone!');
	});

	test('renders a list item as a date selector', () => {
		expect(screen.getByRole('date-selector'));
	});

	test('renders an icon container', () => {
		expect(screen.getByRole('date-icon-container'));
	});

	test('renders a date range icon', () => {
		expect(screen.getByTitle('date-icon'));
	});

	test('renders a date selector label', () => {
		expect(screen.getByRole('date')).toHaveTextContent('Date');
	});

	test('renders a secondary action container', () => {
		expect(screen.getAllByRole('select-date'));
	});

	test('renders a toggle-date-switch', () => {
		expect(screen.getByRole('toggle-date-switch'));
	});

	test('turning the date switch on opens a date picker container', () => {
		userEvent.click(screen.getByRole('toggle-date-switch'));
		expect(screen.getByRole('date-picker-container'));
	});

	test('turning the date switch off toggles turns the time switch off', () => {
		userEvent.click(screen.getByRole('toggle-date-switch'));
		userEvent.click(screen.getByRole('toggle-time-switch'));
		userEvent.click(screen.getByRole('toggle-date-switch'));
		expect(screen.getByRole('toggle-time-switch')).not.toHaveClass('Mui-checked');
	});

	test('renders a list item as a time selector', () => {
		expect(screen.getByRole('time-selector'));
	});

	test('renders an time icon container', () => {
		expect(screen.getByRole('time-icon-container'));
	});

	test('renders a time range icon', () => {
		expect(screen.getByTitle('time-icon'));
	});

	test('renders a toggle label', () => {
		expect(screen.getByRole('time')).toHaveTextContent('Time');
	});

	test('renders a secondary action container', () => {
		expect(screen.getAllByRole('select-time'));
	});

	test('renders a toggle-time-switch', () => {
		expect(screen.getByRole('toggle-time-switch'));
	});

	test('turning the time switch on toggles the date picker switch on', () => {
		userEvent.click(screen.getByRole('toggle-time-switch'));
		expect(screen.getByRole('toggle-date-switch')).toHaveClass('Mui-checked');
	});

	test('turning the time switch on opens a date picker container', () => {
		userEvent.click(screen.getByRole('toggle-time-switch'));
		expect(screen.getByRole('date-picker-container'));
	});

	test('turning the time switch on opens a time picker container', () => {
		userEvent.click(screen.getByRole('toggle-time-switch'));
		expect(screen.getByRole('time-picker-container'));
	});

	test('turning the time switch on opens a time picker', () => {
		userEvent.click(screen.getByRole('toggle-time-switch'));
		expect(screen.getByRole('time-picker'));
	});

	test('turning the time switch on toggles the time picker switch on', () => {
		userEvent.click(screen.getByRole('toggle-time-switch'));
		expect(screen.getByRole('toggle-time-switch')).toHaveClass('Mui-checked');
	});

	test('turning the time switch off does not turn the date off', () => {
		userEvent.dblClick(screen.getByRole('toggle-time-switch'));
		expect(screen.getByRole('toggle-date-switch')).toHaveClass('Mui-checked');
	});

	test('renders an actions container', () => {
		expect(screen.getByRole('actions'));
	});

	test('if there is already a date, the toggle is open by default', () => {
		expect(screen.getByRole('toggle-date-switch')).toHaveClass('Mui-checked');
	});

	test('if there is already a date, clicking the switch should turn it off', () => {
		userEvent.click(screen.getByRole('toggle-date-switch'));
		expect(screen.getByRole('toggle-date-switch')).not.toHaveClass('Mui-checked');
	});
});
