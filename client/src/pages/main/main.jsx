/** @format */
import React, { useEffect } from "react";
import firebase from "../../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { selectUid } from "../../slices/authenticate-slice";
import { selectToggleMoreOptions, selectWhichReminders, setReminders } from "../../slices/reminders-slice";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "../../components/nav-bar/nav-bar";
import NavDrawer from "../../components/nav-drawer/nav-drawer";
import ReminderCard from "../../components/reminder-card/reminder-card";
import ReminderList from "../../components/reminder-list/reminder-list";

const useStyles = makeStyles((theme) => ({
	root: {},
	body: {
		marginTop: "1.5rem",
	},
}));

const Main = () => {
	const classes = useStyles();
	const db = firebase.firestore();
	const dispatch = useDispatch();
	const toggleMoreOptions = useSelector(selectToggleMoreOptions);
	const uid = useSelector(selectUid);
	const whichReminders = useSelector(selectWhichReminders);

	useEffect(() => {
		const loadReminders = () => {
			if (whichReminders === "todos") {
				db.collection("users")
					.doc(uid)
					.collection("reminders")
					.where("isCompleted", "==", false)
					.orderBy("timestamp")
					.onSnapshot((querySnapshot) => {
						const reminders = [];
						querySnapshot.forEach((doc) => {
							const reminder = doc.data();
							reminder["id"] = doc.id;
							reminder["timestamp"] = doc.data().timestamp.toString();
							reminders.push(reminder);
						});
						dispatch(setReminders(reminders));
					});
			} else if (whichReminders === "scheduled") {
				db.collection("users")
					.doc(uid)
					.collection("reminders")
					.where("date", "!=", false)
					.orderBy("date")
					.onSnapshot((querySnapshot) => {
						const reminders = [];
						querySnapshot.forEach((doc) => {
							const reminder = doc.data();
							reminder["id"] = doc.id;
							reminder["timestamp"] = doc.data().timestamp.toString();
							reminders.push(reminder);
						});
						dispatch(setReminders(reminders));
					});
			} else if (whichReminders === "completed") {
				db.collection("users")
					.doc(uid)
					.collection("reminders")
					.where("isCompleted", "==", true)
					.orderBy("timestamp")
					.onSnapshot((querySnapshot) => {
						const reminders = [];
						querySnapshot.forEach((doc) => {
							const reminder = doc.data();
							reminder["id"] = doc.id;
							reminder["timestamp"] = doc.data().timestamp.toString();
							reminders.push(reminder);
						});
						dispatch(setReminders(reminders));
					});
			}
		};
		loadReminders();
	});
	return (
		<div title="main">
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
