/** @format */

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import ReminderCard from './reminder-card';

describe('Reminder List', () => {
	const text = 'testing testing 123';
	beforeEach(() => {
		render(
			<Provider store={store}>
				<ReminderCard reminderText={text} />
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
		expect(screen.getAllByRole('secondary-action')).toHaveLength(2);
	});

	test('renders a checkbox', () => {
		expect(screen.getByTestId('checkbox'));
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
		expect(screen.getByDisplayValue(text));
	});

	test('the reminder is deleted/hidden if the return key is pressed and the textField is empty', () => {
		userEvent.click(screen.getByRole('item-text'));
		userEvent.type(screen.getByDisplayValue(text), '{selectall}{del}{enter}');
		expect(screen.queryByRole('list-item')).not.toBeInTheDocument();
	});

	test('the listItemText can be updated from the textField', () => {
		userEvent.click(screen.getByRole('item-text'));
		userEvent.type(screen.getByDisplayValue(text), '{selectall}{del}Hello everyone!{enter}');
		expect(screen.getByRole('item-text')).toHaveTextContent('Hello everyone!');
	});

	test('renders a list item as a date selector', () => {
		expect(screen.getByRole('date-selector'));
	});

	test('renders an icon container', () => {
		expect(screen.getByRole('icon-container'));
	});

	test('renders a date range icon', () => {
		expect(screen.getByTitle('date-range-icon'));
	});

	test('renders a toggle label', () => {
		expect(screen.getByRole('toggle-label'));
	});

	test('renders a toggle-switch', () => {
		expect(screen.getByRole('toggle-switch'));
	});
});
