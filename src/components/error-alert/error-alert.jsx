/** @format */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectErrorMessage, setErrorMessage } from "../../slices/authenticate-slice";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: "0.25rem",
		width: "100%",
	},
}));

const ErrorAlert = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const errorMessage = useSelector(selectErrorMessage) || props.message;
	setTimeout(() => {
		dispatch(setErrorMessage(""));
	}, 4000);
	return (
		<div className={classes.root} title="error-alert">
			<Alert severity="warning">{errorMessage}</Alert>
		</div>
	);
};

export default ErrorAlert;
