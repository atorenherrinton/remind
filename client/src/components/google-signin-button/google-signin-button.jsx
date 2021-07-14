/** @format */

import React from "react";
import { useDispatch } from "react-redux";
import { setUid } from "../../slices/authenticate.slice";
import Button from "@material-ui/core/Button";
import firebase from "../../firebase/firebase";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: "0.75rem",
		textTransform: "capitalize",
	},
}));

const GoogleSignInButton = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const provider = new firebase.auth.GoogleAuthProvider();

	const handleGoogleSignIn = () => {
		firebase
			.auth()
			.signInWithPopup(provider)
			.then((result) => {
				/** @type {firebase.auth.OAuthCredential} */
				const user = result.user;
				dispatch(setUid(user.uid));
			})
			.catch((error) => {
				// Handle Errors here.
				const errorMessage = error.message;
				console.log(errorMessage);
			});
	};

	return (
		<Button
			className={classes.root}
			color="secondary"
			id="continue-with-google"
			fullWidth
			onClick={handleGoogleSignIn}
			role="continue-with-google"
			variant="outlined"
		>
			Continue with Google
		</Button>
	);
};

export default GoogleSignInButton;
