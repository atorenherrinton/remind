/** @format */

import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectName, selectUid } from "../../slices/authenticate.slice";
import {
  selectIsAssignReminderDialogOpen,
  setIsAssignReminderDialogOpen,
} from "../../slices/reminder-card.slice";
import {
  selectReminder,
  setToggleMoreOptions,
} from "../../slices/reminders.slice";
import { changeReminder, sendReminderEmail } from "../../utils/utils";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";

const AssignReminderDialog = ({ date, email, phoneNumber }) => {
  const dispatch = useDispatch();
  let displayDate;
  const today = new Date();
  const comparedDate = new Date(date);

  if (comparedDate >= today && comparedDate.getDay() === today.getDay()) {
    displayDate =
      "Today at " +
      new Date(date).toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "numeric",
      });
  } else if (comparedDate >= today) {
    displayDate = new Date(date).toLocaleString(undefined, {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  }
  const isAssignReminderDialogOpen = useSelector(
    selectIsAssignReminderDialogOpen
  );
  const name = useSelector(selectName);
  const reminder = useSelector(selectReminder);
  const uid = useSelector(selectUid);

  const handleCancelSaveReminder = () => {
    dispatch(setIsAssignReminderDialogOpen());
  };

  const handleSaveReminder = () => {
    changeReminder(reminder, uid);
    sendReminderEmail(
      reminder.date,
      displayDate,
      reminder.id,
      reminder.email,
      name,
      reminder.title,
      uid
    );
    dispatch(setIsAssignReminderDialogOpen());
    dispatch(setToggleMoreOptions());
  };

  return (
    <div>
      <Dialog
        aria-labelledby="send-assignment"
        aria-describedby="confirm-that-this-reminder-will-be-assigned"
        id="assign-reminder-dialog"
        open={isAssignReminderDialogOpen}
      >
        <DialogTitle id="alert-dialog-title">Assign reminder</DialogTitle>
        <DialogContent>
          <DialogContentText id="assign-reminder-description">
            Do you want to assign the reminder to{" "}
            <Fragment>
              <Typography component="span" variant="body1" color="textPrimary">
                {email || phoneNumber}
              </Typography>
              ? It will be sent{" "}
              <Typography component="span" variant="body1" color="textPrimary">
                {displayDate || "immediately"}
              </Typography>
              .
            </Fragment>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            id="cancel-send-assignment"
            onClick={handleCancelSaveReminder}
          >
            Cancel
          </Button>
          <Button
            autoFocus
            color="primary"
            id="send-assignment"
            onClick={handleSaveReminder}
            variant="contained"
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AssignReminderDialog;
