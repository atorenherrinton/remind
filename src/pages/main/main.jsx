/** @format */

import React from 'react';
import { useSelector } from 'react-redux';
import { selectToggleMoreOptions } from '../../slices/actions-slice';
import Grid from '@material-ui/core/Grid';
import Header from '../../components/header/header';
import NavDrawer from '../../components/nav-drawer/nav-drawer';
import ReminderCard from '../../components/reminder-card/reminder-card';
import ReminderList from '../../components/reminder-list/reminder-list';


const Main = () => {
	const toggleMoreOptions = useSelector(selectToggleMoreOptions);
	return (
		<div>
			<Header />
			<Grid id="container" container direction="row" justify="flex-start" alignItems="flex-start">
				<Grid id="item" item>
					<NavDrawer />
				</Grid>
				<Grid id="item" item>
					<ReminderCard /> <ReminderList />
				</Grid>
			</Grid>
		</div>
	);
};

export default Main;
