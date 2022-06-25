import { createAsyncThunk } from "@reduxjs/toolkit";
import { createNewUser } from "../../../api/createNewUser";
import { loginUser } from "../../../api/loginUser";
import { restoreUserState } from "../../../api/restoreUserState";

export const logIn = createAsyncThunk("user/logIn", async (userData) => {
  try {
    const response = await loginUser(userData);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
});

export const signUp = createAsyncThunk("user/signUp", async (userData) => {
  try {
    const response = await createNewUser(userData);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
});

export const restoreState = createAsyncThunk("user/restoreState", async () => {
  try {
    const response = await restoreUserState();
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
});
