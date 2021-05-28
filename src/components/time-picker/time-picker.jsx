/** @format */

import 'date-fns';
import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';

const TimePicker = () => {
	const [selectedTime, setSelectedTime] = useState(new Date());

	const handleTimeChange = (time) => {
		setSelectedTime(time);
	};
	return (
		<div role="time-picker">
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<KeyboardTimePicker
					margin="normal"
					id="time-picker"
					value={selectedTime}
					onChange={handleTimeChange}
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
