/** @format */

import { createSlice } from '@reduxjs/toolkit';

export const actionsSlice = createSlice({
	name: 'actions',
	initialState: {
		toggleMoreOptions: false,
	},
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		setToggleMoreOptions: (state) => {
			state.toggleMoreOptions = !state.toggleMoreOptions;
		},
	},
});

export const { setToggleMoreOptions } = actionsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectToggleMoreOptions = (state) => state.actions.toggleMoreOptions;

export default actionsSlice.reducer;
