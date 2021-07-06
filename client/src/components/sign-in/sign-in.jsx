/** @format */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	selectEmail,
	selectErrorMessage,
	setEmail,
	setErrorMessage,
	setIsNewUser,
	setUid,
} from "../../slices/authenticate-slice";
import Avatar from "@material-ui/core/Avatar";
import { blue } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import clsx from "clsx";
import Divider from "@material-ui/core/Divider";
import ErrorAlert from "../error-alert/error-alert";
import firebase from "../../firebase/firebase";
import GoogleSignInButton from "../google-signin-button/google-signin-button";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const useStyles = makeStyles((theme) => ({
	avatar: {
		backgroundColor: blue[500],
	},
	button: {
		marginTop: "0.75rem",
		textTransform: "capitalize",
	},
	content: {
		padding: "1.25rem",
	},
	header: {
		padding: "1.25rem",
	},
	password: {
		marginTop: "0.75rem",
		marginBottom: "0.25rem",
	},
}));

const SignIn = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const email = useSelector(selectEmail);
	const errorMessage = useSelector(selectErrorMessage);
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const handleSignIn = () => {
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				dispatch(setUid(user.uid));
			})
			.catch((error) => {
				dispatch(setErrorMessage(error.message));
			});
	};

	return (
		<div title="sign-in">
			<Card role="card">
				<CardHeader
					avatar={<Avatar aria-label="remind" className={classes.avatar} />}
					className={classes.header}
					role="card-header"
					title="Sign in"
				/>
				<Divider role="divider" />
				<CardContent className={classes.content} role="card-content">
					<TextField
						onChange={(event) => {
							dispatch(setEmail(event.target.value));
						}}
						fullWidth
						label="Email"
						role="email-input"
						value={email}
						variant="outlined"
					/>
					<FormControl
						className={(clsx(classes.margin, classes.textField), classes.password)}
						fullWidth
						role="form-control"
						variant="outlined"
					>
						<InputLabel htmlFor="outlined-adornment-password" role="input-label">
							Password
						</InputLabel>
						<OutlinedInput
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={() => {
											setShowPassword(!showPassword);
										}}
										onMouseDown={(event) => {
											event.preventDefault();
										}}
										edge="end"
										role="icon-button"
									>
										{showPassword ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							}
							id="outlined-adornment-password"
							labelWidth={70}
							onChange={(event) => {
								setPassword(event.target.value);
							}}
							type={showPassword ? "text" : "password"}
							value={password}
						/>
					</FormControl>
					{errorMessage ? <ErrorAlert message={errorMessage} /> : null}
					<Button
						className={classes.button}
						color="primary"
						fullWidth
						onClick={handleSignIn}
						role="sign-in"
						variant="contained"
					>
						Sign in
					</Button>
					<GoogleSignInButton />
					<Button
						className={classes.button}
						color="primary"
						fullWidth
						onClick={() => {
							dispatch(setIsNewUser());
						}}
						role="sign-up-instead"
						variant="text"
					>
						Don't have an account? Sign up instead
					</Button>
				</CardContent>
			</Card>
		</div>
	);
};

export default SignIn;
