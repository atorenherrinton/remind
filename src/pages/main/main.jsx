/** @format */
import React from 'react';
import { useSelector } from 'react-redux';
import { selectReminders, selectReminderIndex, selectToggleMoreOptions } from '../../slices/reminders-slice';
import Grid from '@material-ui/core/Grid';
import Header from '../../components/header/header';
import NavDrawer from '../../components/nav-drawer/nav-drawer';
import ReminderCard from '../../components/reminder-card/reminder-card';
import ReminderList from '../../components/reminder-list/reminder-list';

const Main = () => {
	const reminders = useSelector(selectReminders);
	const reminderIndex = useSelector(selectReminderIndex);
	const toggleMoreOptions = useSelector(selectToggleMoreOptions);
	return (
		<div role="main">
			<Header />
			<Grid alignItems="flex-start" container direction="row" justify="flex-start" role="container">
				<Grid item role="item" xs={3}>
					<NavDrawer title="navigation-drawer" />
				</Grid>
				<Grid item role="item" xs={3}>
					{toggleMoreOptions ? (
						<ReminderCard reminderText={reminders[reminderIndex]} reminderIndex={reminderIndex} />
					) : (
						<ReminderList />
					)}
				</Grid>
			</Grid>
		</div>
	);
};
export default Main;
