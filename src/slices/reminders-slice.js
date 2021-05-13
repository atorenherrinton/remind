/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	reminders: [],
};

export const remindersSlice = createSlice({
	name: 'reminders',
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {},
});

export const {} = remindersSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectReminders = (state) => state.reminders.reminders;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default remindersSlice.reducer;
