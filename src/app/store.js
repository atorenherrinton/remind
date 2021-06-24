/** @format */

import { configureStore } from '@reduxjs/toolkit';
import authenticateReducer from '../slices/authenticate-slice';
import remindersReducer from '../slices/reminders-slice';

export const store = configureStore({
	reducer: {
		authenticate: authenticateReducer,
		reminders: remindersReducer,
	},
});
