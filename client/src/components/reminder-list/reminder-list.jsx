/** @format */
import React from "react";
import { useSelector } from "react-redux";
import { selectReminders, setReminders } from "../../slices/reminders-slice";
import { makeStyles } from "@material-ui/core/styles";
import AddReminder from "../add-reminder/add-reminder";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ReminderItem from "../reminder-item/reminder-item";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
	divider: {
		margin: "0.5rem 0 0.5rem 0",
	},
	heading: {
		textAlign: "left",
	},
	list: {
		backgroundColor: theme.palette.background.paper,
		width: "100%",
	},
	textField: {
		padding: 0,
	},
}));

const ReminderList = () => {
	const classes = useStyles();
	const reminders = useSelector(selectReminders);

	return (
		<div title="reminder-list">
			<List className={classes.list} role="list">
				<ListItem>
					<Typography className={classes.heading} role="heading" variant="h5">
						Todos
					</Typography>
				</ListItem>

				{reminders.length > 0 ? <Divider className={classes.divider} role="divider" variant="middle" /> : null}
				{reminders.map((reminder) => (
					<ReminderItem
						key={reminder.id}
						id={reminder.id}
						date={reminder.date}
						isCompleted={reminder.isCompleted}
						time={reminder.time}
						timestamp={reminder.timestamp}
						title={reminder.title}
					/>
				))}
			</List>
			<AddReminder />
		</div>
	);
};

export default ReminderList;
