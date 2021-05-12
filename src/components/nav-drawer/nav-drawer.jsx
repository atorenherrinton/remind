/** @format */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import NavDrawerListItem from '../nav-drawer-list-item/nav-drawer-list-item';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},

	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerContainer: {
		overflow: 'auto',
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
}));

const NavDrawer = ({ listItems = [] }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Drawer
				className={classes.drawer}
				variant="permanent"
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<Toolbar />
				<div id="navLinkContainer" className={classes.drawerContainer}>
					<List>
						{listItems.map((listItem, i) => (
							<NavDrawerListItem key={i} listItemText={listItem.itemText} icon={listItem.icon} />
						))}
					</List>
				</div>
			</Drawer>
		</div>
	);
};

// icon={listItem.icon}

export default NavDrawer;