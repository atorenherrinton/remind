/** @format */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEmail,
  selectEmailValidationError,
  setEmail,
  setEmailValidationError,
} from "../../slices/authenticate.slice";
import TextField from "@material-ui/core/TextField";
import { validateEmail } from "../../utils/utils";

const EmailInput = () => {
  const dispatch = useDispatch();
  const email = useSelector(selectEmail);
  const emailValidationError = useSelector(selectEmailValidationError);

  const handleChange = (event) => {
    if (emailValidationError) dispatch(setEmailValidationError(false));
    dispatch(setEmail(event.target.value));
  };

  const handleValidateEmail = (event) => {
    if (event.key === "Tab") {
      if (!validateEmail(event.target.value)) {
        dispatch(setEmailValidationError(true));
      }
    }
  };

  return (
    <TextField
      error={emailValidationError}
      id="email-input"
      helperText={
        emailValidationError ? "Please enter a valid email address" : null
      }
      fullWidth
      label="Email"
      onChange={handleChange}
      onKeyDown={handleValidateEmail}
      value={email}
      variant="outlined"
    />
  );
};

export default EmailInput;
