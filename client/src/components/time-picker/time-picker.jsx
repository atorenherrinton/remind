/** @format */

import 'date-fns';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDate, selectDate } from '../../slices/reminders-slice';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
	input: {
		marginTop: 0,
	},
}));

const TimePicker = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const selectedDate = useSelector(selectDate);

	const handleChange = (date) => {
		if (date) {
			dispatch(addDate(date.toJSON()));
		}
	};
	return (
		<div title="time-picker">
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<KeyboardTimePicker
					className={classes.input}
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
