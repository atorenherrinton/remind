import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsNewUser,
  setEmailValidationError,
  setIsNewUser,
  setNameValidationError,
  setPasswordValidationError,
} from "../../slices/authenticate.slice";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "0.75rem",
    textTransform: "capitalize",
  },
}));

const ChangeAuthButton = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isNewUser = useSelector(selectIsNewUser);

  const handleClick = () => {
    dispatch(setIsNewUser());
    dispatch(setEmailValidationError(false));
    dispatch(setNameValidationError(false));
    dispatch(setPasswordValidationError(false));
  };

  return (
    <Button
      className={classes.root}
      color="primary"
      id="change-auth-button"
      fullWidth
      onClick={handleClick}
      variant="text"
    >
      {isNewUser
        ? "Already have an account? Sign in instead"
        : "Don't have an account? Sign up instead"}
    </Button>
  );
};
export default ChangeAuthButton;
