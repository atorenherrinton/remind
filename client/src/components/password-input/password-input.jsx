import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validatePassword } from "../../utils/utils";
import {
  selectPassword,
  selectPasswordValidationError,
  setPassword,
  setPasswordValidationError,
} from "../../slices/authenticate.slice";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import { makeStyles } from "@material-ui/core/styles";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "0.75rem",
    marginBottom: "0.25rem",
  },
}));

const PasswordInput = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const password = useSelector(selectPassword);
  const passwordValidationError = useSelector(selectPasswordValidationError);
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (event) => {
    if (passwordValidationError) dispatch(setPasswordValidationError(false));
    dispatch(setPassword(event.target.value));
  };

  const handleValidatePassword = (event) => {
    if (event.key === "Tab") {
      if (!validatePassword(event.target.value)) {
        dispatch(setPasswordValidationError(true));
      }
    }
  };

  return (
    <FormControl
      className={(clsx(classes.margin, classes.textField), classes.root)}
      error={passwordValidationError}
      fullWidth
      role="form-control"
      variant="outlined"
    >
      <InputLabel htmlFor="outlined-adornment-password" role="input-label">
        Password
      </InputLabel>
      <OutlinedInput
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
              onMouseDown={(event) => {
                event.preventDefault();
              }}
              edge="end"
              role="icon-button"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        id="password-input"
        labelWidth={70}
        onChange={handlePasswordChange}
        onKeyDown={handleValidatePassword}
        type={showPassword ? "text" : "password"}
        value={password}
      />
      {passwordValidationError ? (
        <FormHelperText>Please enter a valid password</FormHelperText>
      ) : null}
    </FormControl>
  );
};

export default PasswordInput;
