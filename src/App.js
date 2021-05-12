/** @format */

import React from 'react';
import Grid from '@material-ui/core/Grid';
import Header from './components/header/header';
import NavDrawer from './components/nav-drawer/nav-drawer';
import ReminderList from './components/reminder-list/reminder-list';

const App = () => {
	return (
		<div>
			<Header />
			<Grid id="container" container direction="row" justify="flex-start" alignItems="flex-start">
				<Grid id="item" item>
					<NavDrawer />
				</Grid>
				<Grid id="item" item>
					<ReminderList />
				</Grid>
			</Grid>
		</div>
	);
};
export default App;
