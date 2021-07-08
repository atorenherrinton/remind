/** @format */
import 'date-fns';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDate, selectDate } from '../../slices/reminders-slice';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: 0,
	},
}));

const DatePicker = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const selectedDate = useSelector(selectDate);

	const handleChange = (date) => {
		if (date) {
			dispatch(addDate(date.toJSON()));
		}
	};

	return (
		<div title="date-picker" >
			<MuiPickersUtilsProvider  utils={DateFnsUtils}>
				<KeyboardDatePicker
					className={classes.root}
					margin="normal"
					id="date-picker-dialog"
					format="MM/dd/yyyy"
					value={selectedDate}
					onChange={handleChange}
					KeyboardButtonProps={{
						'aria-label': 'change-date',
					}}
				/>
			</MuiPickersUtilsProvider>
		</div>
	);
};

export default DatePicker;
