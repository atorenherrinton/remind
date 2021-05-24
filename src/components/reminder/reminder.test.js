/** @format */

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { render, screen } from '@testing-library/react';
import { toHaveStyle } from '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Reminder from '../reminder/reminder';

describe('Reminder', () => {
	const text = 'testing testing 123';
	beforeEach(() => {
		render(
			<Provider store={store}>
				<Reminder reminderText={text} />
			</Provider>
		);
	});

	test('renders a listItem', () => {
		expect(screen.getByTitle('reminder-item'));
	});

	test('renders a listItemText', () => {
		expect(screen.getByRole('item-text'));
	});

	test('listItemText contains correct text', () => {
		expect(screen.getAllByText(text)).toHaveLength(1);
	});

	test('renders an action/icon container for the checkbox and info button', () => {
		expect(screen.getByTitle('actions-container'));
	});

	test('action/icon container className === actions', () => {
		expect(screen.getByTitle('actions-container')).toHaveStyle(
			`align-items: center; display: flex; margin-left: 4rem;`
		);
	});

	test('renders a checkbox container', () => {
		expect(screen.getByTitle('checkbox-container'));
	});

	test('checkbox container className === checkbox', () => {
		expect(screen.getByTitle('checkbox-container')).toHaveStyle(`margin-right: 1rem`);
	});

	test('renders a checkbox', () => {
		expect(screen.getByTestId('checkbox'));
	});

	test('renders a icon button outside of the more options icon', () => {
		expect(screen.getByRole('get-more-options'));
	});

	test('renders a the icon button in the small size', () => {
		expect(screen.getByRole('get-more-options')).toHaveClass('MuiIconButton-sizeSmall');
	});

	test('renders an info icon', () => {
		expect(screen.getByTitle('info'));
	});

	test('checkbox state changes on click', () => {
		userEvent.click(screen.getByTestId('checkbox'));
		expect(screen.getByTestId('checkbox')).toHaveClass('Mui-checked');
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

	test('clicking the info button on a reminder list item expands it into a card', () => {
		userEvent.click(screen.getByRole('get-more-options'));
		expect(screen.getByTitle('reminder-card'));
	});
});
