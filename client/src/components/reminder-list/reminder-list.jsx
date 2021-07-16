/** @format */
import React from "react";
import { useSelector } from "react-redux";
import {
  selectCompleted,
  selectScheduled,
  selectTodos,
  selectWhichReminders,
} from "../../slices/reminders.slice";
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
  const completed = useSelector(selectCompleted);
  let reminders;
  const scheduled = useSelector(selectScheduled);
  const todos = useSelector(selectTodos);
  const whichReminders = useSelector(selectWhichReminders);

  if (whichReminders === "Todos") {
    reminders = todos;
  } else if (whichReminders === "Scheduled") {
    reminders = scheduled;
  } else if (whichReminders === "Completed") {
    reminders = completed;
  }

  return (
    <div id="reminder-list">
      <List className={classes.list} role="list">
        <ListItem>
          <Typography className={classes.heading} role="heading" variant="h5">
            {whichReminders}
          </Typography>
        </ListItem>
        {reminders.length > 0 ? (
          <Divider
            className={classes.divider}
            role="divider"
            variant="middle"
          />
        ) : null}
        {reminders.map((reminder) => (
          <ReminderItem
            key={reminder.id}
            id={reminder.id}
            date={reminder.date}
            email={reminder.email}
            isAssigned={reminder.isAssigned}
            isCompleted={reminder.isCompleted}
            phoneNumber={reminder.phoneNumber}
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
