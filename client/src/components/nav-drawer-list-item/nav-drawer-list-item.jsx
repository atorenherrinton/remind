/** @format */

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Inbox from "@material-ui/icons/Inbox";
import Schedule from "@material-ui/icons/Schedule";
import DoneAll from "@material-ui/icons/DoneAll";

const useStyles = makeStyles((theme) => ({
	root: {},
}));

const NavDrawerListItem = ({ listItemText = "", icon = "" }) => {
	const classes = useStyles();

	return (
		<div className={classes.root} title="nav-drawer-list-item">
			<ListItem button role="listItem">
				<ListItemIcon icon={icon} role="listItemIcon" title={icon}>
					{icon === "Inbox" ? (
						<Inbox />
					) : icon === "Schedule" ? (
						<Schedule />
					) : icon === "DoneAll" ? (
						<DoneAll />
					) : null}
				</ListItemIcon>
				<ListItemText primary={listItemText} role="listItemText" />
			</ListItem>
		</div>
	);
};

export default NavDrawerListItem;
