/** @format */

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setReminder, setToggleMoreOptions } from '../../slices/reminders-slice';
import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const ReminderItem = ({ id, date, time, title }) => {
	const dispatch = useDispatch();
	const [isChecked, setIsChecked] = useState(false);

	let displayDate = '';
	if (date && !time) {
		displayDate = new Date(date).toLocaleString(undefined, {
			weekday: 'short',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	} else if (date && time) {
		displayDate = new Date(date).toLocaleString(undefined, {
			weekday: 'short',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
		});
	}

	return (
		<div title="reminder-item">
			<ListItem
				onClick={() => {
					dispatch(setReminder({ id, date, time, title }));
					dispatch(setToggleMoreOptions());
				}}
				role="open-reminder-card"
				button
			>
				<ListItemText primary={title} secondary={displayDate} role="item-text" />
				<ListItemSecondaryAction role="secondary-action">
					<Checkbox
						checked={isChecked}
						data-testid="checkbox"
						disableRipple
						edge="end"
						onClick={() => {
							setIsChecked(!isChecked);
						}}
						tabIndex={-1}
					/>
				</ListItemSecondaryAction>
			</ListItem>
		</div>
	);
};

export default ReminderItem;
