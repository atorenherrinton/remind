/** @format */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectEmail, setEmail } from "../../slices/authenticate.slice";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import TextField from "@material-ui/core/TextField";
import { validateEmail } from "../../utils/utils";

const EmailInput = () => {
  const dispatch = useDispatch();
  const email = useSelector(selectEmail);
  const [validationError, setValidationError] = useState(false);

  const handleChange = (event) => {
    if (validationError) {
      setValidationError(false);
    }
    dispatch(setEmail(event.target.value));
  };

  const handleClickAway = () => {
    if (!validateEmail(email)) {
      setValidationError(true);
    }
  };

  const handleValidateEmail = (event) => {
    if (event.key === "Tab") {
      if (!validateEmail(event.target.value)) {
        setValidationError(true);
      }
    }
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <TextField
        error={validationError}
        id="email-input"
        helperText={
          validationError ? "Please enter a valid email address" : null
        }
        fullWidth
        label="Email"
        onChange={handleChange}
        onKeyDown={handleValidateEmail}
        value={email}
        variant="outlined"
      />
    </ClickAwayListener>
  );
};

export default EmailInput;
