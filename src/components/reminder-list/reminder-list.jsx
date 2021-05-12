/** @format */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ReminderItem from '../reminder-item/reminder-item';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
}));

const ReminderList = ({ reminders = [] }) => {
	const classes = useStyles();
	return (
		<div>
			<List className={classes.root}>
				{reminders.map((reminder, i) => (
					<ReminderItem key={i} reminderText={reminder} />
				))}
			</List>
		</div>
	);
};

export default ReminderList;
