import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const userStatus = {
  loggedIn: "logged in",
  loggingIn: "logging in",
  loggingOut: "logging out",
  loggedOut: "logged out",
  signingUp: "signing up",
};

export const blogStatus = { fetching: "fetching", idle: "idle" };

const initialCredentials = {
  account: {},
  blogs: {
    myBlogs: { status: blogStatus.idle, entities: {} },
    trendingBlogs: { status: blogStatus.idle, entities: {} },
    favouriteBlogs: { status: blogStatus.idle, entities: {} },
  },
};

const initialState = {
  status: userStatus.loggedOut,
  credentials: initialCredentials,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut(state, action) {
      state.credentials.account = {};
      state.status = userStatus.loggedOut;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(logIn.pending, (state, action) => {
        state.status = userStatus.loggingIn;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.status = userStatus.loggedIn;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.status = userStatus.loggedOut;
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
      }),
});

export const logIn = createAsyncThunk(
  "user/logIn",
  async ({ email, password }) => {
    try {
      return {};
    } catch (error) {}
  }
);

export const signUp = createAsyncThunk(
  "user/signUp",
  async ({ firstName, lastName, email, password, confirmedPassword }) => {
    try {
      const user = JSON.stringify({
        user: { firstName, lastName, email, password, confirmedPassword },
      });

      const response = await fetch(`http://localhost:3001/signUp`, {
        method: "POST",
        body: user,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();

      if (responseData.isError)
        throw new Error("Failed to create new account.");

      const jwt = responseData.token;
      localStorage.setItem("proBloggerToken", jwt);

      return responseData.payload;
    } catch (error) {}
  }
);

export const userSliceReducer = userSlice.reducer;
export const { logOut } = userSlice.actions;
