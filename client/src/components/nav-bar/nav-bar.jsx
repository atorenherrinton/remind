/** @format */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUid, selectUid } from "../../slices/authenticate.slice";
import { setIsDrawerOpen } from "../../slices/nav-drawer.slice";
import { reset } from "../../slices/reminders.slice";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import firebase from "../../firebase/firebase";
import IconButton from "@material-ui/core/IconButton";
import Logo from "../../assets/logo.svg";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  button: {
    textTransform: "capitalize",
  },
  logo: { marginTop: "0.6rem" },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const uid = useSelector(selectUid);

  const handleSignOut = () => {
    localStorage.clear();
    dispatch(setUid(undefined));
    dispatch(reset());
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={classes.root} title="nav-bar">
      <AppBar className={classes.appBar} position="static">
        <Toolbar role="toolbar">
          {uid ? (
            <IconButton
              aria-label="menu"
              className={classes.menuButton}
              color="inherit"
              edge="start"
              onClick={() => {
                dispatch(setIsDrawerOpen());
              }}
              role="icon-button"
            >
              <MenuIcon data-testid="menu-icon" />
            </IconButton>
          ) : null}
          <Typography className={classes.title} role="title" variant="h6">
            <img className={classes.logo} src={Logo} width="80rem" alt="logo" />
          </Typography>
          {uid ? (
            <Button
              className={classes.button}
              color="inherit"
              id="sign-out"
              onClick={handleSignOut}
              variant="outlined"
            >
              Sign Out
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
