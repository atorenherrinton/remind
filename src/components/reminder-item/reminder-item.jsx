/** @format */

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setReminder, setToggleMoreOptions } from '../../slices/reminders-slice';
import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

const ReminderItem = ({ id, date, title }) => {
	const dispatch = useDispatch();
	const [isChecked, setIsChecked] = useState(false);

	return (
		<div title="reminder-item">
			<ListItem
				onClick={() => {
					dispatch(setReminder({ id, date, title }));
					dispatch(setToggleMoreOptions());
				}}
				role="open-reminder-card"
				button
			>
				<ListItemText primary={title} role="item-text" />
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
