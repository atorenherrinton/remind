/** @format */

import React, { useEffect, useState } from "react";
import {
  changeReminder,
  deleteReminder,
} from "../../firebase/firebase-actions";
import { useDispatch, useSelector } from "react-redux";
import { selectUid } from "../../slices/authenticate.slice";
import {
  selectIsButtonDisabled,
  setIsAssignReminderDialogOpen,
  setIsButtonDisabled,
} from "../../slices/reminder-card.slice";
import {
  addDate,
  addTime,
  changeTitle,
  removeDate,
  removeTime,
  selectDate,
  selectReminder,
  selectTime,
  setToggleMoreOptions,
} from "../../slices/reminders.slice";
import AssignReminder from "../assign-reminder/assign-reminder";
import AssignReminderDialog from "../assign-reminder-dialog/assign-reminder-dialog";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import DatePicker from "../date-picker/date-picker";
import DateRange from "@material-ui/icons/DateRange";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVert from "@material-ui/icons/MoreVert";
import Schedule from "@material-ui/icons/Schedule";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import TimePicker from "../time-picker/time-picker";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
  actions: {
    padding: "0 1.5rem 1.5rem 1.5rem",
  },
  content: {
    padding: "0.25rem 0.5rem 0rem 0.5rem",
  },
  datePicker: {
    marginBottom: "0.5rem",
  },
  divider: {},
  done: {
    textTransform: "capitalize",
    marginTop: "0.5rem",
  },
  header: {
    padding: "1.5rem 1.5rem 0.75rem 1.5rem",
  },
  title: {
    cursor: "pointer",
  },
}));

const ReminderCard = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const date = useSelector(selectDate) || props.date;
  const time = useSelector(selectTime) || props.time;
  const isButtonDisabled = useSelector(selectIsButtonDisabled);
  const [isLoaded, setIsLoaded] = useState(false);
  const reminder = useSelector(selectReminder) || props.reminder;
  const title = reminder.title;
  const [toggleInput, setToggleInput] = useState(false);
  const [toggleDatePicker, setToggleDatePicker] = useState(false);
  const [toggleTimePicker, setToggleTimePicker] = useState(false);
  const uid = useSelector(selectUid);

  const handleDeleteReminder = () => {
    setAnchorEl(null);
    deleteReminder(reminder.id, uid);
    dispatch(setToggleMoreOptions());
  };

  const handleSaveReminder = () => {
    if (
      (reminder.email && !reminder.isAssigned) ||
      (reminder.phoneNumber && !reminder.isAssigned)
    ) {
      dispatch(setIsAssignReminderDialogOpen());
    } else {
      changeReminder(reminder, uid);
      dispatch(setToggleMoreOptions());
    }
  };

  useEffect(() => {
    const loadDueDateAndTime = () => {
      if (!isLoaded) {
        if (date) {
          setToggleDatePicker(true);
        }
        if (time) {
          setToggleTimePicker(true);
        }
        setIsLoaded(true);
      }
    };
    loadDueDateAndTime();
  }, [date, time, isLoaded]);

  return (
    <div className={classes.root} id="reminder-card">
      <Card role="card">
        <CardHeader
          action={
            <div>
              <IconButton
                aria-label="toggle-more-options"
                id="toggle-more-options"
                onClick={(event) => {
                  setAnchorEl(event.currentTarget);
                }}
                role="toggle-more-options"
              >
                <MoreVert />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => {
                  setAnchorEl(null);
                }}
                role="more-options-menu"
              >
                <MenuItem
                  id="delete-reminder"
                  onClick={handleDeleteReminder}
                  role="delete-reminder"
                >
                  Delete Reminder
                </MenuItem>
              </Menu>
            </div>
          }
          className={classes.header}
          role="reminder-header"
          title={
            toggleInput ? (
              <ClickAwayListener
                onClickAway={() => {
                  setToggleInput(false);
                }}
              >
                <TextField
                  color="secondary"
                  fullWidth
                  onChange={(event) => {
                    dispatch(changeTitle(event.target.value));
                    if (event.target.value.length < 1) {
                      dispatch(setIsButtonDisabled(true));
                    } else if (
                      event.target.value.length > 0 &&
                      isButtonDisabled
                    ) {
                      dispatch(setIsButtonDisabled(false));
                    }
                  }}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      if (title.length > 0) {
                        setToggleInput(false);
                      }
                    }
                  }}
                  multiline
                  role="text-field"
                  value={title}
                />
              </ClickAwayListener>
            ) : (
              <Typography
                className={classes.title}
                onClick={() => {
                  setToggleInput(true);
                }}
                role="item-text"
              >
                {title}
              </Typography>
            )
          }
        />
        <Divider className={classes.divider} role="divider" variant="middle" />
        <CardContent className={classes.content} role="card-content">
          <List role="list">
            <ListItem role="date-selector">
              <ListItemIcon role="date-icon-container">
                <DateRange title="date-icon" />
              </ListItemIcon>
              <ListItemText primary="Date" role="date" />
              <ListItemSecondaryAction role="select-date">
                <Switch
                  checked={toggleDatePicker}
                  edge="end"
                  onClick={() => {
                    if (!date) {
                      dispatch(addDate(new Date().toJSON()));
                    } else {
                      dispatch(removeDate());
                      dispatch(removeTime());
                    }

                    setToggleDatePicker(!toggleDatePicker);

                    if (toggleTimePicker && toggleDatePicker) {
                      setToggleTimePicker(false);
                    }
                  }}
                  role="toggle-date-switch"
                />
              </ListItemSecondaryAction>
            </ListItem>
            {toggleDatePicker ? (
              <ListItem
                className={classes.datePicker}
                role="date-picker-container"
              >
                <DatePicker id={reminder.id} />
              </ListItem>
            ) : null}
            <ListItem role="time-selector">
              <ListItemIcon role="time-icon-container">
                <Schedule title="time-icon" />
              </ListItemIcon>
              <ListItemText primary="Time" role="time" />
              <ListItemSecondaryAction role="select-time">
                <Switch
                  checked={toggleTimePicker}
                  edge="end"
                  onClick={() => {
                    if (!date) {
                      dispatch(addDate(new Date().toJSON()));
                    }

                    if (!time) {
                      dispatch(addTime());
                    } else {
                      dispatch(removeTime());
                    }

                    setToggleTimePicker(!toggleTimePicker);

                    if (!toggleDatePicker) {
                      setToggleDatePicker(true);
                    }
                  }}
                  role="toggle-time-switch"
                />
              </ListItemSecondaryAction>
            </ListItem>
            {toggleTimePicker ? (
              <ListItem
                className={classes.datePicker}
                role="time-picker-container"
              >
                <TimePicker id={reminder.id} />
              </ListItem>
            ) : null}
            <AssignReminder
              email={reminder.email}
              phoneNumber={reminder.phoneNumber}
            />
          </List>
        </CardContent>
        <CardActions className={classes.actions}>
          <Button
            className={classes.done}
            color="primary"
            disabled={isButtonDisabled}
            id="done"
            fullWidth
            onClick={handleSaveReminder}
            variant="outlined"
          >
            Done
          </Button>
          <AssignReminderDialog
            date={reminder.date}
            email={reminder.email}
            phoneNumber={reminder.phoneNumber}
          />
        </CardActions>
      </Card>
    </div>
  );
};

export default ReminderCard;
