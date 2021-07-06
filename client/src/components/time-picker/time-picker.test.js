/** @format */

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import TimePicker from './time-picker';

describe('Time Picker', () => {
	const time = '12:24 PM';
	beforeEach(() => {
		render(
			<Provider store={store}>
				<TimePicker />
			</Provider>
		);
	});

	test('renders a time picker container', () => {
		expect(screen.getByTitle('time-picker'));
	});

	test('renders a time picker input', () => {
		expect(screen.getByRole('textbox'));
	});

	test('when the time is changed, the time picker value matches the text', () => {
		userEvent.type(screen.getByRole('textbox'), '{selectall}{del}' + '12:24P' + '{enter}');
		expect(screen.getByRole('textbox')).toHaveValue(time);
	});
});
