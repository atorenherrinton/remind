/** @format */

import { createSlice } from "@reduxjs/toolkit";

export const remindersSlice = createSlice({
	name: "reminders",
	initialState: {
		reminder: {},
		reminders: [],
		toggleMoreOptions: false,
		whichReminders: "todos",
	},
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		addDate: (state, action) => {
			state.reminder.date = action.payload;
		},
		addTime: (state) => {
			state.reminder.time = true;
		},
		changeTitle: (state, action) => {
			state.reminder.title = action.payload;
		},
		removeDate: (state) => {
			state.reminder.date = null;
		},
		removeTime: (state) => {
			state.reminder.time = false;
		},
		reset: (state) => {
			state.reminder = {};
			state.reminders = [];
			state.toggleMoreOptions = false;
		},
		setReminder: (state, action) => {
			state.reminder = action.payload;
		},
		setReminders: (state, action) => {
			state.reminders = action.payload;
		},
		setToggleMoreOptions: (state) => {
			state.toggleMoreOptions = !state.toggleMoreOptions;
		},
		setWhichReminders: (state, action) => {
			state.toggleMoreOptions = action.payload;
		},
	},
});

export const {
	addDate,
	addTime,
	changeTitle,
	deleteReminder,
	removeDate,
	removeTime,
	reset,
	saveChanges,
	setDate,
	setReminder,
	setReminders,
	setToggleMoreOptions,
	setWhichReminders,
} = remindersSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectDate = (state) => state.reminders.reminder.date;
export const selectTime = (state) => state.reminders.reminder.time;
export const selectReminder = (state) => state.reminders.reminder;
export const selectReminders = (state) => state.reminders.reminders;
export const selectReminderId = (state) => state.reminders.reminderId;
export const selectToggleMoreOptions = (state) => state.reminders.toggleMoreOptions;
export const selectWhichReminders = (state) => state.reminders.whichReminders;

export default remindersSlice.reducer;
