/** @format */

import { createSlice } from '@reduxjs/toolkit';

export const remindersSlice = createSlice({
	name: 'reminders',
	initialState: {
		reminders: [],
		reminderIndex: -1,
		toggleMoreOptions: false,
	},
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		changeReminder: (state, action) => {
			const newReminders = state.reminders.slice();
			newReminders[action.payload.reminderIndex] = action.payload.reminderText;
			state.reminders = newReminders;
		},
		reset: (state) => {
			state.reminders = [];
			state.reminderIndex = -1;
			state.toggleMoreOptions = false;
		},
		setReminders: (state, action) => {
			state.reminders = [...state.reminders, action.payload];
		},
		setToggleMoreOptions: (state, action) => {
			state.toggleMoreOptions = !state.toggleMoreOptions;
			state.reminderIndex = action.payload;
		},
	},
});

export const { changeReminder, reset, setReminders, setToggleMoreOptions } = remindersSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectReminders = (state) => state.reminders.reminders;
export const selectReminderIndex = (state) => state.reminders.reminderIndex;
export const selectToggleMoreOptions = (state) => state.reminders.toggleMoreOptions;

export default remindersSlice.reducer;
