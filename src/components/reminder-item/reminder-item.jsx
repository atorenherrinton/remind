/** @format */

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Info from '@material-ui/icons/InfoOutlined';
import TextField from '@material-ui/core/TextField';

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
	const [isChecked, setIsChecked] = useState(false);
	const [isHidden, setIsHidden] = useState(false);
	const [reminderText, setReminderText] = useState(props.reminderText || '');
	const [toggleInput, setToggleInput] = useState(false);

	return (
		<div role="reminderItem">
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
							value={reminderText}
						/>
					) : (
						<ListItemText
							onClick={() => {
								setToggleInput(true);
							}}
							primary={reminderText}
							role="itemText"
						/>
					)}
					<div className={classes.actions} id="actions">
						<div className={classes.checkbox} id="checkbox">
							<Checkbox
								onClick={() => {
									setIsChecked(!isChecked);
								}}
								checked={isChecked}
								edge="end"
								tabIndex={-1}
								disableRipple
							/>
						</div>

						<IconButton aria-label="more options" role="get-more-options" size="small">
							<Info />
						</IconButton>
					</div>
				</ListItem>
			)}
		</div>
	);
};

export default ReminderItem;
