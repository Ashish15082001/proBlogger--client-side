import { createSlice } from "@reduxjs/toolkit";
import { jwtKey, userIdKey } from "../../../constants";
import { logIn, restoreState, signUp } from "./userThunks";

export const userStatus = {
  loggedIn: "logged in",
  loggingIn: "logging in",
  loggingOut: "logging out",
  loggedOut: "logged out",
  signingUp: "signing up",
  restoringState: "restoring state",
};

export const blogStatus = { fetching: "fetching", idle: "idle" };

const initialCredentials = {
  account: {},
  aboutUser: { followers: {}, followings: {} },
  aboutBlogs: {
    totalViews: {},
    totalComments: {},
    totalLikes: {},
    trendings: {},
    publishes: {},
  },
};

const initialState = {
  status: userStatus.restoringState,
  credentials: initialCredentials,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut(state, action) {
      state.status = userStatus.loggedOut;
      state.credentials = initialCredentials;
      localStorage.removeItem(jwtKey);
      localStorage.removeItem(userIdKey);
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(logIn.pending, (state, action) => {
        state.status = userStatus.loggingIn;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.status = userStatus.loggedIn;
        state.credentials.account = action.payload;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.status = userStatus.loggedOut;
        // alert(action.error.message);
      })
      .addCase(signUp.pending, (state, action) => {
        state.status = userStatus.signingUp;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.credentials.account = action.payload;
        state.status = userStatus.loggedIn;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = userStatus.loggedOut;
        // alert(action.error.message);
      })
      .addCase(restoreState.pending, (state, acttion) => {
        state.status = userStatus.restoringState;
      })
      .addCase(restoreState.fulfilled, (state, action) => {
        state.status = userStatus.loggedIn;
        state.credentials.account = action.payload;
      })
      .addCase(restoreState.rejected, (state, action) => {
        state.status = userStatus.loggedOut;
      }),
});

export const userSliceReducer = userSlice.reducer;
export const { logOut } = userSlice.actions;
