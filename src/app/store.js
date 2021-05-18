/** @format */

import { configureStore } from '@reduxjs/toolkit';
import actionsReducer from '../slices/actions-slice';

export const store = configureStore({
	reducer: {
		actions: actionsReducer,
	},
});
