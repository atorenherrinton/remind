/** @format */

import { createSlice } from '@reduxjs/toolkit';

export const remindersSlice = createSlice({
	name: 'reminders',
	initialState: {
		reminders: [],
		toggleMoreOptions: false,
	},
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		setReminders: (state, action) => {
			state.reminders = [...state.reminders, action.payload];
		},
		setToggleMoreOptions: (state) => {
			state.toggleMoreOptions = !state.toggleMoreOptions;
		},
	},
});

export const { setReminders, setToggleMoreOptions } = remindersSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectReminders = (state) => state.reminders.reminders;
export const selectToggleMoreOptions = (state) => state.reminders.toggleMoreOptions;

export default remindersSlice.reducer;
