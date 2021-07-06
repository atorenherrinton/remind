/** @format */

import React from "react";
import { useSelector } from "react-redux";
import { selectIsDrawerOpen } from "../../slices/nav-drawer-slice";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import NavDrawerListItem from "../nav-drawer-list-item/nav-drawer-list-item";

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

const NavDrawer = (props) => {
	const classes = useStyles();
	const isDrawerOpen = useSelector(selectIsDrawerOpen);
	const listItems = props.listItems || [
		{ itemText: "Todos", icon: "Inbox" },
		{ itemText: "Scheduled", icon: "Schedule" },
		{ itemText: "Completed", icon: "DoneAll" },
	];

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
				<div className={classes.drawerContainer} role="drawer-container">
					<List role="list">
						{listItems.map((listItem, i) => (
							<NavDrawerListItem icon={listItem.icon} key={i} listItemText={listItem.itemText} />
						))}
					</List>
				</div>
			</Drawer>
		</div>
	);
};

// icon={listItem.icon}

export default NavDrawer;
