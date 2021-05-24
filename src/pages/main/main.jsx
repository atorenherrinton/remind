/** @format */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Header from '../../components/header/header';
import NavDrawer from '../../components/nav-drawer/nav-drawer';
import ReminderCard from '../../components/reminder-card/reminder-card';
import ReminderList from '../../components/reminder-list/reminder-list';

const Main = () => {
	return (
		<div role="main">
			<Header />
			<Grid alignItems="flex-start" container direction="row" justify="flex-start" role="container">
				<Grid item role="item">
					<NavDrawer title="navigation-drawer" />
				</Grid>
				<Grid item role="item">
					<ReminderList />
				</Grid>
			</Grid>
		</div>
	);
};
export default Main;
