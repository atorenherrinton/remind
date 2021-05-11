/** @format */
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const ReminderList = ({ reminders = [] }) => {
  const classes = useStyles();
  return (
    <div>
      <List className={classes.root}>
        {reminders.map((reminder, i) => (
          <ListItem key={i}>{reminder}</ListItem>
        ))}
      </List>
    </div>
  );
};

export default ReminderList;
