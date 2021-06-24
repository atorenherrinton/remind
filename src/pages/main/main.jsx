/** @format */
import React from 'react';
import { useSelector } from 'react-redux';
import { selectToggleMoreOptions } from '../../slices/reminders-slice';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from '../../components/nav-bar/nav-bar';
import NavDrawer from '../../components/nav-drawer/nav-drawer';
import ReminderCard from '../../components/reminder-card/reminder-card';
import ReminderList from '../../components/reminder-list/reminder-list';

const useStyles = makeStyles((theme) => ({
	root: {},
	body: {
		marginTop: '1.5rem',
	},
}));

const Main = () => {
	const classes = useStyles();
	const toggleMoreOptions = useSelector(selectToggleMoreOptions);

	return (
		<div role="main">
			<NavBar />
			<Grid alignItems="flex-start" container direction="row" justify="flex-start" role="container">
				<Grid item role="item" xs={3}>
					<NavDrawer title="navigation-drawer" />
				</Grid>
				<Grid className={classes.body} item role="item" xs={3}>
					{toggleMoreOptions ? <ReminderCard /> : <ReminderList />}
				</Grid>
			</Grid>
		</div>
	);
};
export default Main;
