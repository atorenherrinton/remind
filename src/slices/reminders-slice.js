/** @format */

import { createSlice } from '@reduxjs/toolkit';

export const remindersSlice = createSlice({
	name: 'reminders',
	initialState: {
		reminder: {},
		reminders: [],
		toggleMoreOptions: false,
	},
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		addDate: (state, action) => {
			state.reminder.date = action.payload;
		},
		changeTitle: (state, action) => {
			state.reminder.title = action.payload;
		},
		reset: (state) => {
			state.reminder = {};
			state.reminders = [];
			state.toggleMoreOptions = false;
		},
		saveChanges: (state) => {
			const newReminders = state.reminders.slice();
			var index = newReminders.findIndex((reminder) => reminder.id === state.reminder.id);
			newReminders[index] = state.reminder;
			state.reminders = newReminders;
		},
		setReminder: (state, action) => {
			state.reminder = action.payload;
		},
		setReminders: (state, action) => {
			state.reminders = [...state.reminders, action.payload];
		},
		setToggleMoreOptions: (state) => {
			state.toggleMoreOptions = !state.toggleMoreOptions;
		},
	},
});

export const { addDate, changeTitle, reset, saveChanges, setDate, setReminder, setReminders, setToggleMoreOptions } =
	remindersSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectDate = (state) => state.reminders.reminder.date;
export const selectReminder = (state) => state.reminders.reminder;
export const selectReminders = (state) => state.reminders.reminders;
export const selectReminderId = (state) => state.reminders.reminderId;
export const selectToggleMoreOptions = (state) => state.reminders.toggleMoreOptions;

export default remindersSlice.reducer;
