/** @format */

import { createSlice } from "@reduxjs/toolkit";

export const reminderCardSlice = createSlice({
  name: "reminderCard",
  initialState: {
    isButtonDisabled: false,
    isAssignReminderDialogOpen: false,
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setIsAssignReminderDialogOpen: (state) => {
      state.isAssignReminderDialogOpen = !state.isAssignReminderDialogOpen;
    },
    setIsButtonDisabled: (state, action) => {
      state.isButtonDisabled = action.payload;
    },
  },
});

export const { setIsAssignReminderDialogOpen, setIsButtonDisabled } =
  reminderCardSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectIsButtonDisabled = (state) =>
  state.reminderCard.isButtonDisabled;

export const selectIsAssignReminderDialogOpen = (state) =>
  state.reminderCard.isAssignReminderDialogOpen;

export default reminderCardSlice.reducer;
