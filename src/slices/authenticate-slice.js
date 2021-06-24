/** @format */

import { createSlice } from '@reduxjs/toolkit';

export const authenticateSlice = createSlice({
	name: 'authenticate',
	initialState: {
		user: '',
	},
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		user: (state, action) => {
			state.authenticate.user = action.payload;
		},
	},
});

export const { login } = authenticateSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state) => state.authenticate.user;

export default authenticateSlice.reducer;
