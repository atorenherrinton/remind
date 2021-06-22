/** @format */

import 'date-fns';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDate, selectDate } from '../../slices/reminders-slice';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';

const TimePicker = () => {
	const dispatch = useDispatch();
	const selectedDate = useSelector(selectDate);

	const handleChange = (date) => {
		if (date) {
			dispatch(addDate(date.toString()));
		}
	};
	return (
		<div role="time-picker">
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<KeyboardTimePicker
					margin="normal"
					id="time-picker"
					value={selectedDate}
					onChange={handleChange}
					KeyboardButtonProps={{
						'aria-label': 'change time',
					}}
					role="input"
				/>
			</MuiPickersUtilsProvider>
		</div>
	);
};

export default TimePicker;
