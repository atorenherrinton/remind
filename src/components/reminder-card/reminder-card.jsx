/** @format */

import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import DateRange from '@material-ui/icons/DateRange';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';

const ReminderCard = (props) => {
	const [isChecked, setIsChecked] = useState(false);
	const [reminderText, setReminderText] = useState(props.reminderText || '');
	const [toggleInput, setToggleInput] = useState(false);
	return (
		<div title="reminder-card">
			<Card role="card">
				<CardContent role="card-content">
					<List role="list">
						<ListItem role="reminder-header">
							{toggleInput ? (
								<TextField
									onChange={(event) => {
										setReminderText(event.target.value);
									}}
									onKeyPress={(event) => {
										if (event.key === 'Enter') {
											if (reminderText.length < 1) {
											} else {
												setToggleInput(false);
											}
										}
									}}
									role="text-field"
									value={reminderText}
								/>
							) : (
								<ListItemText
									onClick={() => {
										setToggleInput(true);
									}}
									primary={reminderText}
									role="item-text"
								/>
							)}
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
						<ListItem role="date-selector">
							<ListItemIcon role="icon-container">
								<DateRange title="date-range-icon" />
							</ListItemIcon>
							<ListItemText primary="Date" role="toggle-label" />
							<ListItemSecondaryAction role="secondary-action">
								<Switch edge="end" role="toggle-switch"/>
							</ListItemSecondaryAction>
						</ListItem>
					</List>
				</CardContent>
			</Card>
		</div>
	);
};

export default ReminderCard;
