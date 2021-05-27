/** @format */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectReminders, setReminders } from '../../slices/reminders-slice';
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ReminderItem from '../reminder-item/reminder-item';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
	list: {
		backgroundColor: theme.palette.background.paper,
		width: '100%',
	},
}));

const ReminderList = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const reminders = useSelector(selectReminders);
	const [textField, setTextField] = useState('');
	const [toggleInput, setToggleInput] = useState(false);

	return (
		<div title="reminder-list">
			<List className={classes.list} role="list">
				{reminders.map((reminder) => (
					<ReminderItem key={uuidv4()} id={reminder.id} title={reminder.title} />
				))}
			</List>

			{toggleInput ? (
				<List className={classes.list} title="add-new-reminder">
					<ListItem role="reminder-item">
						<TextField
							autoComplete="off"
							color="secondary"
							fullWidth
							id="outlined-basic"
							onChange={(event) => {
								setTextField(event.target.value);
							}}
							onKeyPress={(event) => {
								if (event.key === 'Enter' && textField.length > 0) {
									dispatch(setReminders({ title: textField, id: uuidv4() }));
									setTextField('');
									setToggleInput(false);
								}
							}}
							size="small"
							value={textField}
						/>
					</ListItem>
				</List>
			) : (
				<Button
					color="secondary"
					fullWidth
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
