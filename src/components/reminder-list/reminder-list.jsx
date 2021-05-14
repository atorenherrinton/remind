/** @format */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ReminderItem from '../reminder-item/reminder-item';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
}));

const ReminderList = (props) => {
	const classes = useStyles();
	const [reminders, setReminders] = useState(props.reminders || []);
	const [textField, setTextField] = useState('');
	const [toggleInput, setToggleInput] = useState(false);

	return (
		<div>
			<List className={classes.root}>
				{reminders.map((reminder, i) => (
					<ReminderItem key={i} reminderText={reminder} />
				))}
			</List>
			<div id="toggleContainer" value={textField}>
				{toggleInput ? (
					<TextField
					autoComplete="off"
						id="outlined-basic"
						onChange={(event) => {
							setTextField(event.target.value);
						}}
						onKeyPress={(event) => {
							if (event.key === 'Enter' && textField.length > 0) {
								setReminders([...reminders, textField]);
								setTextField('');
								setToggleInput(false);
							}
						}}
						size="small"
						variant="outlined"
						value={textField}
					/>
				) : (
					<Button
						color="primary"
						onClick={() => {
							setToggleInput(true);
						}}
						variant="outlined"
					>
						Add Reminder
					</Button>
				)}
			</div>
		</div>
	);
};

export default ReminderList;
