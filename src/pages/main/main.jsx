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
		<div role="main">
			<Header />
			<Grid alignItems="flex-start" container direction="row" justify="flex-start" role="container">
				<div role="items">
					<Grid item role="item">
						<NavDrawer title="navigation-drawer" />
					</Grid>
					<Grid item role="item">
						{toggleMoreOptions ? <ReminderCard /> : <ReminderList />}
					</Grid>
				</div>
			</Grid>
		</div>
	);
};    
export default Main;
