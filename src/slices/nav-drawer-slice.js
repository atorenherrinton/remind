/** @format */

import { createSlice } from "@reduxjs/toolkit";

export const navDrawerSlice = createSlice({
	name: "navDrawer",
	initialState: {
		isDrawerOpen: true,
	},
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		setIsDrawerOpen: (state) => {
			state.isDrawerOpen = !state.isDrawerOpen;
		},
	},
});

export const { setIsDrawerOpen } = navDrawerSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectIsDrawerOpen = (state) => state.navDrawer.isDrawerOpen;

export default navDrawerSlice.reducer;
