/** @format */

import { configureStore } from '@reduxjs/toolkit';
import remindersReducer from '../slices/reminders-slice';

export const store = configureStore({
	reducer: {
		reminders: remindersReducer,
	},
});
