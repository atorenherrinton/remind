/** @format */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsDrawerOpen } from "../../slices/nav-drawer.slice";
import { setWhichReminders } from "../../slices/reminders.slice";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Inbox from "@material-ui/icons/Inbox";
import Schedule from "@material-ui/icons/Schedule";
import DoneAll from "@material-ui/icons/DoneAll";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},

	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerContainer: {
		overflow: "auto",
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
}));

const NavDrawer = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const isDrawerOpen = useSelector(selectIsDrawerOpen);

	return (
		<div className={classes.root} title="navigation-drawer">
			<Drawer
				anchor="left"
				className={classes.drawer}
				classes={{
					paper: classes.drawerPaper,
				}}
				open={isDrawerOpen}
				role="drawer"
				variant="persistent"
			>
				<Toolbar role="toolbar" />
				<div className={classes.drawerContainer} title="drawer-container">
					<List role="list">
						<ListItem
							button
							id="todos-link"
							onClick={() => {
								dispatch(setWhichReminders("Todos"));
							}}
						>
							<ListItemIcon>
								<Inbox />
							</ListItemIcon>
							<ListItemText primary="Todos" />
						</ListItem>
						<ListItem
							button
							id="scheduled-link"
							onClick={() => {
								dispatch(setWhichReminders("Scheduled"));
							}}
						>
							<ListItemIcon>
								<Schedule />
							</ListItemIcon>
							<ListItemText primary="Scheduled" />
						</ListItem>
						<ListItem
							button
							id="completed-link"
							onClick={() => {
								dispatch(setWhichReminders("Completed"));
							}}
						>
							<ListItemIcon>
								<DoneAll />
							</ListItemIcon>
							<ListItemText primary="Completed" />
						</ListItem>
					</List>
				</div>
			</Drawer>
		</div>
	);
};

// icon={listItem.icon}

export default NavDrawer;
