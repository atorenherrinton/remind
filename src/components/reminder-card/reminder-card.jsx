/** @format */

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeTitle, setToggleMoreOptions } from '../../slices/reminders-slice';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import DatePicker from '../date-picker/date-picker';
import DateRange from '@material-ui/icons/DateRange';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Schedule from '@material-ui/icons/Schedule';
import Switch from '@material-ui/core/Switch';
import TimePicker from '../time-picker/time-picker';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		width: '100%',
	},
}));

const ReminderCard = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [title, setTitle] = useState(props.title);
	const [toggleInput, setToggleInput] = useState(false);
	const [toggleDatePicker, setToggleDatePicker] = useState(false);
	const [toggleTimePicker, setToggleTimePicker] = useState(false);

	return (
		<div className={classes.root} title="reminder-card">
			<Card role="card">
				<CardContent role="card-content">
					<List role="list">
						<ListItem role="reminder-header">
							{toggleInput ? (
								<TextField
									onChange={(event) => {
										setTitle(event.target.value);
									}}
									onKeyPress={(event) => {
										if (event.key === 'Enter') {
											if (title.length < 1) {
											} else {
												setToggleInput(false);
											}
										}
									}}
									role="text-field"
									value={title}
								/>
							) : (
								<ListItemText
									onClick={() => {
										setToggleInput(true);
									}}
									primary={title}
									role="item-text"
								/>
							)}
							<ListItemSecondaryAction role="close-reminder">
								<Button
									color="primary"
									onClick={() => {
										dispatch(changeTitle(title));
										dispatch(setToggleMoreOptions());
									}}
									role="done"
									size="small"
								>
									Done
								</Button>
							</ListItemSecondaryAction>
						</ListItem>
						<ListItem role="date-selector">
							<ListItemIcon role="date-icon-container">
								<DateRange title="date-icon" />
							</ListItemIcon>
							<ListItemText primary="Date" role="date" />
							<ListItemSecondaryAction role="select-date">
								<Switch
									checked={toggleDatePicker}
									edge="end"
									// onChange={handleToggle('wifi')}
									onClick={() => {
										setToggleDatePicker(!toggleDatePicker);
										if (toggleTimePicker && toggleDatePicker) {
											setToggleTimePicker(false);
										}
									}}
									role="toggle-date-switch"
								/>
							</ListItemSecondaryAction>
						</ListItem>
						{toggleDatePicker ? (
							<ListItem role="date-picker-container">
								<DatePicker id={props.id} />
							</ListItem>
						) : null}
						<ListItem role="time-selector">
							<ListItemIcon role="time-icon-container">
								<Schedule title="time-icon" />
							</ListItemIcon>
							<ListItemText primary="Time" role="time" />
							<ListItemSecondaryAction role="select-time">
								<Switch
									checked={toggleTimePicker}
									edge="end"
									onClick={() => {
										if (!toggleDatePicker) {
											setToggleDatePicker(true);
										}
										setToggleTimePicker(!toggleTimePicker);
									}}
									role="toggle-time-switch"
								/>
							</ListItemSecondaryAction>
						</ListItem>
						{toggleTimePicker ? (
							<ListItem role="time-picker-container">
								<TimePicker id={props.id} />
							</ListItem>
						) : null}
					</List>
				</CardContent>
				<CardActions role="actions"></CardActions>
			</Card>
		</div>
	);
};

export default ReminderCard;
