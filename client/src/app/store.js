/** @format */

import { configureStore } from "@reduxjs/toolkit";
import authenticateReducer from "../slices/authenticate.slice";
import navDrawerReducer from "../slices/nav-drawer.slice";
import reminderCardReducer from "../slices/reminder-card.slice";
import remindersReducer from "../slices/reminders.slice";

export const store = configureStore({
  reducer: {
    authenticate: authenticateReducer,
    navDrawer: navDrawerReducer,
    reminderCard: reminderCardReducer,
    reminders: remindersReducer,
  },
});
