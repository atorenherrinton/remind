/** @format */

import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsNewUser } from '../../slices/authenticate-slice';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from '../../components/nav-bar/nav-bar';
import SignIn from '../../components/sign-in/sign-in';
import SignUp from '../../components/sign-up/sign-up';

const useStyles = makeStyles((theme) => ({
	grid: {
		marginTop: '6rem',
	},
}));

const Authenticate = () => {
	const classes = useStyles();
	const isNewUser = useSelector(selectIsNewUser);

	return (
		<div title="authenticate">
			<NavBar />
			<Grid alignItems="center" className={classes.grid} container justify="center" role="grid-container">
				<Grid item role="grid-item" xs={3}>
					{isNewUser ? <SignUp /> : <SignIn />}
				</Grid>
			</Grid>
		</div>
	);
};

export default Authenticate;
