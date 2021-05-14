/** @format */

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
	root: {},
}));

const ReminderItem = (props) => {
	const classes = useStyles();
	const [isChecked, setIsChecked] = useState(false);
	const [isHidden, setIsHidden] = useState(false);
	const [reminderText, setReminderText] = useState(props.reminderText || '');
	const [toggleInput, setToggleInput] = useState(false);

	return (
		<div>
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
						/>
					)}
					<ListItemIcon>
						<Checkbox
							onClick={() => {
								setIsChecked(!isChecked);
							}}
							checked={isChecked}
							edge="end"
							tabIndex={-1}
							disableRipple
						/>
					</ListItemIcon>

					<ListItemIcon>

							<IconButton aria-label="more options">
								<MoreHoriz />
							</IconButton>

					</ListItemIcon>
				</ListItem>
			)}
		</div>
	);
};

export default ReminderItem;
