/** @format */

import { createSlice } from "@reduxjs/toolkit";

export const remindersSlice = createSlice({
  name: "reminders",
  initialState: {
    reminder: {},
    todos: [],
    scheduled: [],
    completed: [],
    toggleMoreOptions: false,
    whichReminders: "Todos",
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addEmail: (state, action) => {
      state.reminder.email = action.payload;
    },
    addPhoneNumber: (state, action) => {
      state.reminder.phoneNumber = action.payload;
    },
    addDate: (state, action) => {
      state.reminder.date = action.payload;
    },

    addTime: (state) => {
      state.reminder.time = true;
    },

    changeTitle: (state, action) => {
      state.reminder.title = action.payload;
    },
    removeAssignment: (state) => {
      state.reminder.email = null;
      state.reminder.phoneNumber = null;
      state.reminder.isAssigned = false;
    },
    removeDate: (state) => {
      state.reminder.date = null;
    },
    removeTime: (state) => {
      state.reminder.time = false;
    },
    reset: (state) => {
      state.reminder = {};
      state.todos = [];
      state.scheduled = [];
      state.completed = [];
      state.toggleMoreOptions = false;
      state.whichReminders = "Todos";
    },
    setReminder: (state, action) => {
      state.reminder = action.payload;
    },

    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    setScheduled: (state, action) => {
      state.scheduled = action.payload;
    },
    setCompleted: (state, action) => {
      state.completed = action.payload;
    },
    setToggleMoreOptions: (state) => {
      state.toggleMoreOptions = !state.toggleMoreOptions;
    },
    setWhichReminders: (state, action) => {
      state.whichReminders = action.payload;
    },
  },
});

export const {
  addDate,
  addEmail,
  addPhoneNumber,
  addTime,
  changeTitle,
  deleteReminder,
  removeAssignment,
  removeDate,
  removeTime,
  reset,
  saveChanges,
  setDate,
  setReminder,
  setTodos,
  setScheduled,
  setCompleted,
  setToggleMoreOptions,
  setWhichReminders,
} = remindersSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectDate = (state) => state.reminders.reminder.date;
export const selectTime = (state) => state.reminders.reminder.time;
export const selectReminder = (state) => state.reminders.reminder;
export const selectTodos = (state) => state.reminders.todos;
export const selectScheduled = (state) => state.reminders.scheduled;
export const selectCompleted = (state) => state.reminders.completed;
export const selectReminderId = (state) => state.reminders.reminderId;
export const selectToggleMoreOptions = (state) =>
  state.reminders.toggleMoreOptions;
export const selectWhichReminders = (state) => state.reminders.whichReminders;

export default remindersSlice.reducer;
