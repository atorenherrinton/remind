/** @format */

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { render, screen } from '@testing-library/react';
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

	test('clicking the info button on a reminder list item opens a reminder card', () => {
		const text = "let's go party!";
		render(
			<Provider store={store}>
				<ReminderItem reminderText={text} />
			</Provider>
		);
		userEvent.click(screen.getByRole('get-more-options'));
		expect(screen.getByTitle('reminder-card'));
	});
});
