/** @format */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Reminder from '../reminder/reminder';
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
		<div title="reminder-list">
			<List className={classes.root} role="list">
				{reminders.map((reminder, i) => (
					<Reminder key={i} index={i} reminderText={reminder} />
				))}
			</List>
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
					role="button"
					variant="outlined"
				>
					Add Reminder
				</Button>
			)}
		</div>
	);
};

export default ReminderList;
