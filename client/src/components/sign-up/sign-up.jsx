/** @format */

import React from "react";
import {
  addUserToDatabase,
  validateEmail,
  validateName,
  validatePassword,
} from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEmail,
  selectErrorMessage,
  selectName,
  selectNameValidationError,
  selectPassword,
  setEmailValidationError,
  setErrorMessage,
  setName,
  setNameValidationError,
  setPasswordValidationError,
  setUid,
} from "../../slices/authenticate.slice";
import Avatar from "@material-ui/core/Avatar";
import { blue } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import ChangeAuthButton from "../change-auth-button/change-auth-button";
import Divider from "@material-ui/core/Divider";
import ErrorAlert from "../error-alert/error-alert";
import GoogleSignInButton from "../google-signin-button/google-signin-button";
import firebase from "../../firebase/firebase";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import EmailInput from "../email-input/email-input";
import PasswordInput from "../password-input/password-input";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: blue[500],
  },
  button: {
    marginTop: "0.75rem",
    textTransform: "capitalize",
  },
  content: {
    padding: "1.25rem",
  },
  header: {
    padding: "1.25rem",
  },
  nameInput: {
    marginBottom: "0.75rem",
  },
  password: {
    marginTop: "0.75rem",
    marginBottom: "0.25rem",
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const email = useSelector(selectEmail);
  const errorMessage = useSelector(selectErrorMessage);
  const name = useSelector(selectName);
  const nameValidationError = useSelector(selectNameValidationError);
  const password = useSelector(selectPassword);


  const handleSignUp = () => {
    const validatedEmail = validateEmail(email);
    const validatedName = validateName(name);
    const validatedPassword = validatePassword(password);

    if (validatedEmail && validatedName && validatedPassword) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          addUserToDatabase(name, user.uid);
          dispatch(setUid(user.uid));
          localStorage.setItem("user", JSON.stringify(user.uid));
          localStorage.setItem("name", JSON.stringify(name));
        })
        .catch((error) => {
          dispatch(setErrorMessage(error.message));
        });
    } else {
      if (!validatedEmail) {
        dispatch(setEmailValidationError(true));
      }
      if (!validatedName) {
        dispatch(setNameValidationError(true));
      }
      if (!validatedPassword) {
        dispatch(setPasswordValidationError(true));
      }
    }
  };

  const handleSetName = (event) => {
    if (nameValidationError) {
      dispatch(setNameValidationError(false));
    }
    dispatch(setName(event.target.value));
  };

  const handleValidateName = () => {
    if (!validateName(name)) {
      dispatch(setNameValidationError(true));
    }
  };

  return (
    <div title="sign-up">
      <Card role="card">
        <CardHeader
          avatar={<Avatar aria-label="remind" className={classes.avatar} />}
          className={classes.header}
          role="card-header"
          title="Sign up"
        />
        <Divider role="divider" />
        <CardContent className={classes.content} role="card-content">
          <TextField
            autoFocus
            className={classes.nameInput}
            error={nameValidationError}
            helperText={
              nameValidationError ? "Please enter a valid name" : null
            }
            id="name-input"
            onChange={handleSetName}
            onKeyDown={handleValidateName}
            fullWidth
            label="Name"
            value={name}
            variant="outlined"
          />

          <EmailInput />
          <PasswordInput />
          {errorMessage ? <ErrorAlert message={errorMessage} /> : null}
          <Button
            className={classes.button}
            color="primary"
            fullWidth
            onClick={handleSignUp}
            role="sign-up"
            variant="contained"
          >
            Sign up
          </Button>
          <GoogleSignInButton />
          <ChangeAuthButton />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
