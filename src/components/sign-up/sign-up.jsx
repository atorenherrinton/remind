/** @format */

import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { blue } from '@material-ui/core/colors';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
	avatar: {
		backgroundColor: blue[500],
	},
	content: {
		padding: '1.25rem',
	},
	header: {
		padding: '1.25rem',
	},
	password: {
		marginTop: '0.75rem',
	},
}));

const SignUp = () => {
	const classes = useStyles();
	return (
		<div title="sign-up">
			<Card role="card">
				<CardHeader
					avatar={<Avatar aria-label="remind" className={classes.avatar} />}
					className={classes.header}
					role="card-header"
					subheader="And get reminded"
					title="Sign up"
				/>
				<Divider role="divider" />
				<CardContent className={classes.content} role="card-content">
					<TextField fullWidth label="Email" required role="email-input" variant="outlined" />
					<TextField
						className={classes.password}
						fullWidth
						label="Password"
						required
						role="password-input"
						variant="outlined"
					/>
				</CardContent>
			</Card>
		</div>
	);
};

export default SignUp;
