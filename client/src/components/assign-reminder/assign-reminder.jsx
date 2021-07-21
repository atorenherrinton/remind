/** @format */

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { validateEmail } from "../../utils/utils";
import { setIsButtonDisabled } from "../../slices/reminder-card.slice";
import {
  addEmail,
  addPhoneNumber,
  removeAssignment,
} from "../../slices/reminders.slice";
import Add from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";
import Email from "@material-ui/icons/EmailOutlined";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import MaskedInput from "react-text-mask";
import MenuItem from "@material-ui/core/MenuItem";
import Person from "@material-ui/icons/PersonOutline";
import Phone from "@material-ui/icons/PhoneOutlined";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Zoom from "@material-ui/core/Zoom";

const TextMaskCustom = (props) => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        "(",
        /[1-9]/,
        /\d/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      placeholderChar={"\u2000"}
    />
  );
};

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

const options = [
  {
    id: "select-email-address",
    label: <Email fontSize="small" />,
    value: "Email Address",
  },
  {
    id: "select-phone-number",
    label: <Phone fontSize="small" />,
    value: "Phone Number",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {},
  addButton: {
    float: "right",
  },
  input: {
    marginLeft: "0.75rem",
    width: "60%",
  },
  form: { display: "flex", width: "100%" },
}));

const AssignReminderForm = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isReminderAssigned, setIsReminderAssigned] = useState(true);
  const [email, setEmail] = useState(props.email);
  const [validationError, setValidationError] = useState(false);
  const [option, setOption] = useState("Email Address");
  const [phoneNumber, setPhoneNumber] = useState(props.phoneNumber);

  const resetButton = () => {
    dispatch(setIsButtonDisabled(false));
  };
  const resetValidationError = () => {
    if (validationError) setValidationError(false);
  };

  const validatePhoneNumber = () => {
    return phoneNumber.replace(/\(|\)|-|\s/g, "").length < 10;
  };

  const validate = () => {
    if (option === "Email Address") {
      if (validateEmail(email)) {
        dispatch(addEmail(email));
        setIsReminderAssigned(true);
        resetButton();
      } else {
        setValidationError(true);
      }
    } else {
      if (validatePhoneNumber()) {
        setValidationError(true);
      } else {
        setEmail("");
        dispatch(addPhoneNumber(phoneNumber));
        setIsReminderAssigned(true);
        resetButton();
      }
    }
  };

  const handleSetEmail = (event) => {
    const value = event.target.value;
    resetValidationError();
    setEmail(value);
  };

  const handleSetPhoneNumber = (event) => {
    const value = event.target.value;
    resetValidationError();
    setPhoneNumber(value);
  };

  const handleReturn = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      validate();
    }
  };

  const handleAdd = () => {
    validate();
  };

  return (
    <div id="assign-reminder">
      {isReminderAssigned ? (
        <div id="assign-reminder-list-item">
          <ListItem
            button={!email && !phoneNumber}
            onClick={() => {
              if (!email && !phoneNumber) {
                setIsReminderAssigned(false);
                dispatch(setIsButtonDisabled(true));
              }
            }}
          >
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary={email || phoneNumber || "Assign Reminder"} />
            {email || phoneNumber ? (
              <ListItemSecondaryAction>
                <IconButton
                  aria-label="assign reminder"
                  edge="end"
                  id="cancel-assignment"
                  onClick={() => {
                    setPhoneNumber("");
                    setEmail("");
                    dispatch(removeAssignment());
                    setIsReminderAssigned(true);
                    resetButton();
                  }}
                >
                  <Close id="remove-icon" />
                </IconButton>
              </ListItemSecondaryAction>
            ) : null}
          </ListItem>
        </div>
      ) : (
        <div id="assign-reminder-form">
          <ListItem className={classes.form}>
            <TextField
              className={classes.selector}
              id="select-option"
              onChange={(event) => {
                setOption(event.target.value);
              }}
              select
              size="small"
              value={option}
              variant="outlined"
            >
              {options.map((option) => (
                <MenuItem
                  id={option.id}
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            {option === "Email Address" ? (
              <TextField
                className={classes.input}
                error={validationError}
                helperText={
                  validationError ? "Please enter a valid email address" : null
                }
                id="assign-textfield"
                onChange={handleSetEmail}
                onKeyPress={handleReturn}
                placeholder={option}
                type="text"
                value={email}
              />
            ) : (
              <FormControl className={classes.input}>
                <Input
                  error={validationError}
                  helper
                  id="assign-textfield"
                  inputComponent={TextMaskCustom}
                  onChange={handleSetPhoneNumber}
                  onKeyPress={handleReturn}
                  placeholder={option}
                  type="text"
                  value={phoneNumber}
                />
                {validationError ? (
                  <FormHelperText error id="phone-error">
                    Please enter a valid phone number
                  </FormHelperText>
                ) : null}
              </FormControl>
            )}
            <ListItemSecondaryAction className={classes.addButton}>
              {!email && !phoneNumber ? (
                <IconButton
                  aria-label="assign reminder"
                  className={classes.addButton}
                  edge="end"
                  id="assign-button"
                  onClick={() => {
                    setPhoneNumber("");
                    setEmail("");
                    dispatch(removeAssignment());
                    setIsReminderAssigned(true);
                    resetButton();
                  }}
                >
                  <Close id="remove-icon" />
                </IconButton>
              ) : (
                <Zoom in={email || phoneNumber}>
                  <IconButton
                    aria-label="assign reminder"
                    className={classes.addButton}
                    edge="end"
                    id="assign-button"
                    onClick={handleAdd}
                  >
                    <Add id="add-icon" />
                  </IconButton>
                </Zoom>
              )}
            </ListItemSecondaryAction>
          </ListItem>
        </div>
      )}
    </div>
  );
};

export default AssignReminderForm;
