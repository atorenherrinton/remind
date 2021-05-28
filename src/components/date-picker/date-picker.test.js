/** @format */

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import DatePicker from './date-picker';

describe('Date Picker', () => {
	const date = '12/24/2024';
	beforeEach(() => {
		render(
			<Provider store={store}>
				<DatePicker />
			</Provider>
		);
	});

	test('renders a date picker container', () => {
		expect(screen.getByRole('date-picker'));
	});

	test('renders a date picker input', () => {
		expect(screen.getByRole('textbox'));
	});

	test('when the date is changed, the date picker value matches the text', () => {
		userEvent.type(screen.getByRole('textbox'), '{selectall}{del}' + date + '{enter}');
		expect(screen.getByRole('textbox')).toHaveValue(date);
	});


});
