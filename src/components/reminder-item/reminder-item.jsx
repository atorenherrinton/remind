/** @format */

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToggleMoreOptions } from '../../slices/reminders-slice';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Info from '@material-ui/icons/InfoOutlined';
import TextField from '@material-ui/core/TextField';
import { colors } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {},
	actions: {
		alignItems: 'center',
		display: 'flex',
		marginLeft: '4rem',
	},
	checkbox: {
		marginRight: '1rem',
	},
}));

const ReminderItem = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [isChecked, setIsChecked] = useState(false);
	const [isHidden, setIsHidden] = useState(false);
	const [reminderText, setReminderText] = useState(props.reminderText || '');
	const [toggleInput, setToggleInput] = useState(false);

	return (
		<div title="reminder-item">
			{isHidden ? null : (
				<ListItem>
					{toggleInput ? (
						<TextField
							onChange={(event) => {
								setReminderText(event.target.value);
							}}
							onKeyPress={(event) => {
								if (event.key === 'Enter') {
									if (reminderText.length < 1) {
										setIsHidden(true);
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
					<div className={classes.actions} title="actions-container">
						<div className={classes.checkbox} title="checkbox-container">
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
						</div>

						<IconButton
							aria-label="more options"
							onClick={() => {
								dispatch(setToggleMoreOptions());
							}}
							role="get-more-options"
							size="small"
						>
							<Info title="info" />
						</IconButton>
					</div>
				</ListItem>
			)}
		</div>
	);
};

export default ReminderItem;
