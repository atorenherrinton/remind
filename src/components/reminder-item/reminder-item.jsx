/** @format */

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setReminder, setToggleMoreOptions } from '../../slices/reminders-slice';
import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

const ReminderItem = ({ id, date, time, title }) => {
	const createDisplayDate = (date) => {
		const today = new Date();
		const tomorrow = new Date(today);
		tomorrow.setDate(tomorrow.getDate() + 1);

		if (date && !time && new Date(date).toLocaleDateString() === today.toLocaleDateString()) {
			// Today without time
			date = 'Today';
		} else if (date && time && new Date(date).toLocaleDateString() === today.toLocaleDateString()) {
			// Today with time
			date =
				'Today, ' +
				new Date(date).toLocaleTimeString(undefined, {
					hour: 'numeric',
					minute: 'numeric',
				});
		} else if (date && !time && new Date(date).toLocaleDateString() === tomorrow.toLocaleDateString()) {
			// Tomorrow without time
			date = 'Tomorrow';
		} else if (date && time && new Date(date).toLocaleDateString() === tomorrow.toLocaleDateString()) {
			// Tomorrow with time
			date =
				'Tomorrow, ' +
				new Date(date).toLocaleTimeString(undefined, {
					hour: 'numeric',
					minute: 'numeric',
				});
		} else if (date && !time) {
			// Any other day without time
			date = new Date(date).toLocaleString(undefined, {
				weekday: 'short',
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			});
		} else if (date && time) {
			// Any other day with time
			date = new Date(date).toLocaleString(undefined, {
				weekday: 'short',
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
			});
		}
		return date;
	};

	const dispatch = useDispatch();
	const displayDate = createDisplayDate(date);
	const [isChecked, setIsChecked] = useState(false);

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
