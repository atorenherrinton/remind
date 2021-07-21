/** @format */

import React, { useState } from "react";
import { addReminder } from "../../utils/utils";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { selectUid } from "../../slices/authenticate.slice";
import { selectWhichReminders } from "../../slices/reminders.slice";
import TextField from "@material-ui/core/TextField";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: "capitalize",
  },
  textField: {
    padding: 0,
  },
}));

const AddReminder = () => {
  const classes = useStyles();
  const [textField, setTextField] = useState("");
  const [toggleInput, setToggleInput] = useState(false);
  const uid = useSelector(selectUid);
  const whichReminders = useSelector(selectWhichReminders);

  const handleAddReminder = (event) => {
    if (event.key === "Enter" && textField.length > 0) {
      // Add to firestore
      addReminder(textField, uid, whichReminders);
      setTextField("");
      setToggleInput(false);
    }
  };

  return (
    <div title="add-reminder">
      {toggleInput ? (
        <TextField
          autoComplete="off"
          autoFocus
          className={classes.textField}
          color="primary"
          fullWidth
          id="add-reminder-input"
          onChange={(event) => {
            setTextField(event.target.value);
          }}
          onKeyPress={handleAddReminder}
          size="small"
          value={textField}
          variant="outlined"
        />
      ) : (
        <Button
          className={classes.button}
          color="primary"
          id="add-reminder-button"
          fullWidth
          onClick={() => {
            setToggleInput(true);
          }}
          role="button"
          variant="outlined"
        >
          Add Reminder
        </Button>
      )}
    </div>
  );
};

export default AddReminder;
