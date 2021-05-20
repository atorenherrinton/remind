/** @format */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Today from '@material-ui/icons/Today';
import Schedule from '@material-ui/icons/Schedule';
import CheckCircle from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles((theme) => ({
	root: {},
}));

const NavDrawerListItem = ({ listItemText = '', icon = '' }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<ListItem button role="listItem">
				<ListItemIcon icon={icon} role="listItemIcon" title={icon}>
					{icon === 'Today' ? (
						<Today />
					) : icon === 'Schedule' ? (
						<Schedule />
					) : icon === 'CheckCircle' ? (
						<CheckCircle />
					) : null}
				</ListItemIcon>
				<ListItemText primary={listItemText} role="listItemText" />
			</ListItem>
		</div>
	);
};

export default NavDrawerListItem;
