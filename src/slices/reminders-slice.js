/** @format */

import { createSlice } from '@reduxjs/toolkit';

export const remindersSlice = createSlice({
	name: 'reminders',
	initialState: {
		reminder: {},
		reminders: [],
		reminderId: '',
		toggleMoreOptions: false,
	},
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		changeTitle: (state, action) => {
			const newReminders = state.reminders.slice();
			var index = newReminders.findIndex((reminder) => reminder.id === state.reminder.id);
			newReminders[index].title = action.payload;
			state.reminders = newReminders;
		},
		reset: (state) => {
			state.reminders = [];
			state.reminderId = '';
			state.toggleMoreOptions = false;
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

export const { changeTitle, reset, setReminder, setReminders, setToggleMoreOptions } = remindersSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectReminder = (state) => state.reminders.reminder;
export const selectReminders = (state) => state.reminders.reminders;
export const selectReminderId = (state) => state.reminders.reminderId;
export const selectToggleMoreOptions = (state) => state.reminders.toggleMoreOptions;

export default remindersSlice.reducer;
