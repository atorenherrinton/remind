/** @format */
import 'date-fns';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDate, selectDate } from '../../slices/reminders-slice';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

const DatePicker = () => {
	const dispatch = useDispatch();
	const selectedDate = useSelector(selectDate);

	const handleChange = (date) => {
		if (date) {
			dispatch(addDate(date.toLocaleDateString()));
		}
	};

	return (
		<div role="date-picker">
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<KeyboardDatePicker
					margin="normal"
					id="date-picker-dialog"
					format="MM/dd/yyyy"
					value={selectedDate}
					onChange={handleChange}
					KeyboardButtonProps={{
						'aria-label': 'change date',
					}}
				/>
			</MuiPickersUtilsProvider>
		</div>
	);
};

export default DatePicker;
