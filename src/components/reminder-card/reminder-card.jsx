/** @format */

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeReminder, setToggleMoreOptions } from '../../slices/reminders-slice';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
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

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		backgroundColor: theme.palette.background.paper,
	},
}));

const ReminderCard = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [title, setTitle] = useState(props.title);
	const [toggleInput, setToggleInput] = useState(false);
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
									onClick={() => {
										dispatch(
											changeReminder(title)
										);
										dispatch(setToggleMoreOptions());
									}}
									role="done"
									size="small"
									variant="outlined"
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
								<Switch edge="end" role="toggle-date-switch" />
							</ListItemSecondaryAction>
						</ListItem>

						<ListItem role="time-selector">
							<ListItemIcon role="time-icon-container">
								<Schedule title="time-icon" />
							</ListItemIcon>
							<ListItemText primary="Time" role="time" />
							<ListItemSecondaryAction role="select-time">
								<Switch edge="end" role="toggle-time-switch" />
							</ListItemSecondaryAction>
						</ListItem>
					</List>
				</CardContent>
				<CardActions role="actions"></CardActions>
			</Card>
		</div>
	);
};

export default ReminderCard;
