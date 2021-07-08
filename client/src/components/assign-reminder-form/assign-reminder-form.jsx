/** @format */

import React from "react";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import AddCircleOutline from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: { display: "flex", width: "100%" },
  button: {
    borderRadius: "100%",
    height: "40px",
    textTransform: "capitalize",
  },
}));

const AssignReminderField = () => {
  const classes = useStyles();

  return (
    <div className={classes.root} id="assign-reminder-field">
      <FormControl
        className={clsx(classes.textField)}
        fullWidth
      >
        <InputLabel htmlFor="standard-adornment-assign-reminder">
          Assign
        </InputLabel>
        <Input
          id="assign-textfield"
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="assign reminder" id="assign-button" edge="end">
                <AddCircleOutline />
              </IconButton>
            </InputAdornment>
          }
          placeholder="Email or phone number"
          type="text"
        />
      </FormControl>
    </div>
  );
};

export default AssignReminderField;
