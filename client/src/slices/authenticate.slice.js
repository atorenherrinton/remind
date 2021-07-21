/** @format */

import { createSlice } from "@reduxjs/toolkit";

export const authenticateSlice = createSlice({
  name: "authenticate",
  initialState: {
    email: "",
    errorMessage: "",
    isNewUser: true,
    name: "",
    uid: "",
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    reset: (state) => {
      state.email = "";
      state.errorMessage = "";
      state.isNewUser = true;
      state.uid = "";
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setIsNewUser: (state) => {
      state.isNewUser = !state.isNewUser;
    },
    setUid: (state, action) => {
      state.uid = action.payload;
    },
  },
});

export const {
  reset,
  setEmail,
  setErrorMessage,
  setIsNewUser,
  setName,
  setUid,
} = authenticateSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectEmail = (state) => state.authenticate.email;
export const selectErrorMessage = (state) => state.authenticate.errorMessage;
export const selectIsNewUser = (state) => state.authenticate.isNewUser;
export const selectName = (state) => state.authenticate.name;
export const selectUid = (state) => state.authenticate.uid;

export default authenticateSlice.reducer;
