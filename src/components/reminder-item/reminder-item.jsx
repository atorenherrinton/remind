/** @format */

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
	root: {},
}));

const ReminderItem = ({ reminderText = '' }) => {
	const classes = useStyles();
	const [isChecked, setIsChecked] = useState(false);
	return (
		<div>
			<ListItem
				onClick={() => {
					setIsChecked(!isChecked);
				}}
				button
			>
				<ListItemText primary={reminderText} />
				<ListItemIcon>
					<Checkbox checked={isChecked} edge="end" tabIndex={-1} disableRipple />
				</ListItemIcon>
			</ListItem>
		</div>
	);
};

export default ReminderItem;
