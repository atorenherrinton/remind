/** @format */

import React, { useState } from "react";
import { setReminderCompleted } from "../../firebase/firebase-actions";
import { useDispatch, useSelector } from "react-redux";
import { selectUid } from "../../slices/authenticate.slice";
import {
  setReminder,
  setToggleMoreOptions,
} from "../../slices/reminders.slice";
import Checkbox from "@material-ui/core/Checkbox";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";

const ReminderItem = ({
  id,
  date,
  email,
  isCompleted,
  phoneNumber,
  time,
  timestamp,
  title,
}) => {
  const createDisplayDate = (date) => {
    const today = new Date();
    const yesterday = new Date(today);
    const tomorrow = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (
      date &&
      !time &&
      new Date(date).toLocaleDateString() === today.toLocaleDateString()
    ) {
      // Today without time
      date = "Today";
    } else if (
      date &&
      time &&
      new Date(date).toLocaleDateString() === today.toLocaleDateString()
    ) {
      // Today with time
      date =
        "Today, " +
        new Date(date).toLocaleTimeString(undefined, {
          hour: "numeric",
          minute: "numeric",
        });
    } else if (
      date &&
      !time &&
      new Date(date).toLocaleDateString() === yesterday.toLocaleDateString()
    ) {
      // Yesterday without time
      date = "Yesterday";
    } else if (
      date &&
      time &&
      new Date(date).toLocaleDateString() === yesterday.toLocaleDateString()
    ) {
      // Yesterday with time
      date =
        "Yesterday, " +
        new Date(date).toLocaleTimeString(undefined, {
          hour: "numeric",
          minute: "numeric",
        });
    } else if (
      date &&
      !time &&
      new Date(date).toLocaleDateString() === tomorrow.toLocaleDateString()
    ) {
      // Tomorrow without time
      date = "Tomorrow";
    } else if (
      date &&
      time &&
      new Date(date).toLocaleDateString() === tomorrow.toLocaleDateString()
    ) {
      // Tomorrow with time
      date =
        "Tomorrow, " +
        new Date(date).toLocaleTimeString(undefined, {
          hour: "numeric",
          minute: "numeric",
        });
    } else if (date && !time) {
      // Any other day without time
      date = new Date(date).toLocaleString(undefined, {
        weekday: "short",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } else if (date && time) {
      // Any other day with time
      date = new Date(date).toLocaleString(undefined, {
        weekday: "short",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
    }
    return date;
  };

  const dispatch = useDispatch();
  const displayDate = createDisplayDate(date);
  const [isChecked, setIsChecked] = useState(isCompleted);
  const uid = useSelector(selectUid);

  const handleSetCompleted = () => {
    setIsChecked(!isChecked);
    setReminderCompleted(id, !isCompleted, uid);
  };

  return (
    <div id="reminder-item">
      <ListItem
        button
        id="open-reminder-card"
        onClick={() => {
          dispatch(
            setReminder({
              id,
              date,
              email,
              phoneNumber,
              time,
              timestamp,
              title,
            })
          );
          dispatch(setToggleMoreOptions());
        }}
        role="open-reminder-card"
      >
        <ListItemText
          primary={title}
          secondary={displayDate}
          role="item-text"
        />
        <ListItemSecondaryAction role="secondary-action">
          <Checkbox
            checked={isChecked}
            data-testid="checkbox"
            disableRipple
            id="checkbox"
            edge="end"
            onClick={handleSetCompleted}
            tabIndex={-1}
          />
        </ListItemSecondaryAction>
      </ListItem>
    </div>
  );
};

export default ReminderItem;
