/** @format */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	addDate,
	addTime,
	changeTitle,
	deleteReminder,
	removeDate,
	removeTime,
	saveChanges,
	selectDate,
	selectReminder,
	selectTime,
	setToggleMoreOptions,
} from '../../slices/reminders-slice';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import DatePicker from '../date-picker/date-picker';
import DateRange from '@material-ui/icons/DateRange';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVert from '@material-ui/icons/MoreVert';
import TextField from '@material-ui/core/TextField';
import Schedule from '@material-ui/icons/Schedule';
import Switch from '@material-ui/core/Switch';
import TimePicker from '../time-picker/time-picker';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		width: '100%',
	},
	datePicker: {
		marginBottom: '0.5rem',
	},
	done: {
		marginTop: '0.5rem',
	},
}));

const ReminderCard = (props) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const classes = useStyles();
	const dispatch = useDispatch();
	const date = useSelector(selectDate) || props.date;
	const time = useSelector(selectTime) || props.time;
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);
	const reminder = useSelector(selectReminder) || props.reminder;
	const [title, setTitle] = useState(reminder.title || props.title);
	const [toggleInput, setToggleInput] = useState(false);
	const [toggleDatePicker, setToggleDatePicker] = useState(false);
	const [toggleTimePicker, setToggleTimePicker] = useState(false);

	const loadDueDateAndTime = () => {
		if (!isLoaded) {
			if (date) {
				setToggleDatePicker(true);
			}
			if (time) {
				setToggleTimePicker(true);
			}
			setIsLoaded(true);
		}
	};

	useEffect(() => {
		loadDueDateAndTime();
	}, [date, time, isLoaded]);

	return (
		<div className={classes.root} title="reminder-card">
			<Card role="card">
				<CardContent role="card-content">
					<List role="list">
						<ListItem role="reminder-header">
							{toggleInput ? (
								<ClickAwayListener
									onClickAway={() => {
										setToggleInput(false);
									}}
								>
									<TextField
										fullWidth
										onChange={(event) => {
											setTitle(event.target.value);
											if (event.target.value.length < 1) {
												setIsButtonDisabled(true);
											} else if (event.target.value.length > 0 && isButtonDisabled) {
												setIsButtonDisabled(false);
											}
										}}
										onKeyPress={(event) => {
											if (event.key === 'Enter') {
												event.preventDefault();
												if (title.length > 0) {
													setToggleInput(false);
												}
											}
										}}
										multiline
										role="text-field"
										value={title}
									/>
								</ClickAwayListener>
							) : (
								<ListItemText
									onClick={() => {
										setToggleInput(true);
									}}
									primary={title}
									role="item-text"
								/>
							)}
							<ListItemSecondaryAction>
								<IconButton
									aria-label="toggle-more-options"
									onClick={(event) => {
										setAnchorEl(event.currentTarget);
									}}
									role="toggle-more-options"
									size="small"
								>
									<MoreVert fontSize="inherit" />
								</IconButton>
								<Menu
									id="simple-menu"
									anchorEl={anchorEl}
									keepMounted
									open={Boolean(anchorEl)}
									onClose={() => {
										setAnchorEl(null);
									}}
									role="more-options-menu"
								>
									<MenuItem
										onClick={() => {
											setAnchorEl(null);
											dispatch(deleteReminder(reminder.id));
											dispatch(setToggleMoreOptions());
										}}
										role="delete-reminder"
									>
										Delete Reminder
									</MenuItem>
								</Menu>
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
									onClick={() => {
										if (!date) {
											dispatch(addDate(new Date().toString()));
										} else {
											dispatch(removeDate());
											dispatch(removeTime());
										}

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
							<ListItem className={classes.datePicker} role="date-picker-container">
								<DatePicker id={reminder.id} />
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
										if (!date) {
											dispatch(addDate(new Date().toString()));
										}

										if (!time) {
											dispatch(addTime());
										} else {
											dispatch(removeTime());
										}

										setToggleTimePicker(!toggleTimePicker);

										if (!toggleDatePicker) {
											setToggleDatePicker(true);
										}
									}}
									role="toggle-time-switch"
								/>
							</ListItemSecondaryAction>
						</ListItem>
						{toggleTimePicker ? (
							<ListItem role="time-picker-container">
								<TimePicker id={reminder.id} />
							</ListItem>
						) : null}
						<ListItem className={classes.done} role="close-reminder">
							<Button
								color="primary"
								disabled={isButtonDisabled}
								fullWidth
								onClick={() => {
									dispatch(changeTitle(title));
									dispatch(saveChanges());
									dispatch(setToggleMoreOptions());
								}}
								role="done"
								size="small"
								variant="outlined"
							>
								Done
							</Button>
						</ListItem>
					</List>
				</CardContent>
			</Card>
		</div>
	);
};

export default ReminderCard;
