/** @format */

import React from 'react';
import { useSelector } from 'react-redux';
import { selectToggleMoreOptions } from '../../slices/reminders-slice';
import ReminderCard from '../reminder-card/reminder-card';
import ReminderItem from '../reminder-item/reminder-item';

const Reminder = (props) => {
	const toggleMoreOptions = useSelector(selectToggleMoreOptions);
	return (
		<div title="reminder">
			{toggleMoreOptions === props.index ? <ReminderCard {...props} /> : <ReminderItem {...props} />}
		</div>
	);
};

export default Reminder;
