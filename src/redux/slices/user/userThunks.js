import { createAsyncThunk } from "@reduxjs/toolkit";
import { createNewUserApi } from "../../../api/createNewUserApi";
import { loginUserApi } from "../../../api/loginUserApi";
import { restoreUserStateApi } from "../../../api/restoreUserStateApi";

export const logIn = createAsyncThunk("user/logIn", async (userData) => {
  try {
    const response = await loginUserApi(userData);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
});

export const signUp = createAsyncThunk("user/signUp", async (userData) => {
  try {
    const response = await createNewUserApi(userData);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
});

export const restoreState = createAsyncThunk("user/restoreState", async () => {
  try {
    const response = await restoreUserStateApi();
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
});
