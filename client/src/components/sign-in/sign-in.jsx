/** @format */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadName, validateEmail, validatePassword } from "../../utils/utils";
import {
  selectEmail,
  selectErrorMessage,
  selectPassword,
  setEmailValidationError,
  setErrorMessage,
  setName,
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
import EmailInput from "../email-input/email-input";
import ErrorAlert from "../error-alert/error-alert";
import firebase from "../../firebase/firebase";
import GoogleSignInButton from "../google-signin-button/google-signin-button";
import { makeStyles } from "@material-ui/core/styles";
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
  password: {
    marginTop: "0.75rem",
    marginBottom: "0.25rem",
  },
}));

const SignIn = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const email = useSelector(selectEmail);
  const errorMessage = useSelector(selectErrorMessage);
  const password = useSelector(selectPassword);

  const handleSignIn = () => {
    const validatedEmail = validateEmail(email);
    const validatedPassword = validatePassword(password);

    if (validatedEmail && validatedPassword) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          dispatch(setUid(user.uid));
          loadName(user.uid).then((result) => {
            dispatch(setName(result.name));
            localStorage.setItem("name", JSON.stringify(result.name));
          });
          localStorage.setItem("user", JSON.stringify(user.uid));
        })
        .catch((error) => {
          dispatch(setErrorMessage(error.message));
        });
    } else {
      if (!validatedEmail) {
        dispatch(setEmailValidationError(true));
      }
      if (!validatedPassword) {
        dispatch(setPasswordValidationError(true));
      }
    }
  };

  return (
    <div title="sign-in">
      <Card role="card">
        <CardHeader
          avatar={<Avatar aria-label="remind" className={classes.avatar} />}
          className={classes.header}
          role="card-header"
          title="Sign in"
        />
        <Divider role="divider" />
        <CardContent className={classes.content} role="card-content">
          <EmailInput />
          <PasswordInput />
          {errorMessage ? <ErrorAlert message={errorMessage} /> : null}
          <Button
            className={classes.button}
            color="primary"
            id="sign-in"
            fullWidth
            onClick={handleSignIn}
            role="sign-in"
            variant="contained"
          >
            Sign in
          </Button>
          <GoogleSignInButton />
          <ChangeAuthButton />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
