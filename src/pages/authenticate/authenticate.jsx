/** @format */

import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from '../../components/nav-bar/nav-bar';
import SignUp from '../../components/sign-up/sign-up';

const useStyles = makeStyles((theme) => ({
	grid: {
		marginTop: '6rem',
	},
}));

const Authenticate = () => {
	const classes = useStyles();
	return (
		<div title="authenticate">
			<NavBar />
			<Grid alignItems="center" className={classes.grid} container justify="center" role="grid-container">
				<Grid item role="grid-item" xs={3}>
					<SignUp />
				</Grid>
			</Grid>
		</div>
	);
};

export default Authenticate;
