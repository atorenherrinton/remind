/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isDeleting: false,
	reminderKey: 0,
};

export const remindersSlice = createSlice({
	name: 'reminders',
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		setIsDeleting: (state, action) => {
			state.isDeleting = !state.isDeleting;
			state.reminderKey = action.payload;
		},
	},
});

export const { setIsDeleting } = remindersSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectIsDeleting = (state) => state.reminders.isDeleting;
export const selectReminderKey = (state) => state.reminders.reminderKey;
// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default remindersSlice.reducer;
