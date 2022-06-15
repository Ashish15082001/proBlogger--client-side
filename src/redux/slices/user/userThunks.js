import { createAsyncThunk } from "@reduxjs/toolkit";
import { jwtKey, userIdKey } from "../../../constants";

export const logIn = createAsyncThunk(
  "user/logIn",
  async ({ email, password }) => {
    try {
      const body = JSON.stringify({
        user: { email, password },
      });

      const response = await fetch(`http://localhost:3001/logIn`, {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();

      if (!response.ok) throw new Error(responseData.message);

      const jwt = responseData.token;
      const userId = responseData.payload._id;

      localStorage.setItem(jwtKey, jwt);
      localStorage.setItem(userIdKey, userId);

      return responseData.payload;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const signUp = createAsyncThunk(
  "user/signUp",
  async ({ firstName, lastName, email, password, confirmedPassword }) => {
    try {
      const body = JSON.stringify({
        user: { firstName, lastName, email, password, confirmedPassword },
      });

      const response = await fetch(`http://localhost:3001/signUp`, {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();

      if (!response.ok) throw new Error(responseData.message);

      const jwt = responseData.token;
      const userId = responseData.payload._id;

      localStorage.setItem(jwtKey, jwt);
      localStorage.setItem(userIdKey, userId);

      return responseData.payload;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const restoreState = createAsyncThunk("user/restoreState", async () => {
  try {
    const jwt = localStorage.getItem(jwtKey);
    if (!jwt) throw new Error("jason web token does not exists.");

    const userId = localStorage.getItem(userIdKey);

    const response = await fetch(
      `http://localhost:3001/userData?id=${userId}`,
      {
        headers: {
          Authorization: "Bearer " + jwt,
        },
        method: "GET",
      }
    );

    const responseData = await response.json();

    if (!response.ok) throw new Error(responseData.message);

    return responseData.payload;
  } catch (error) {
    return Promise.reject(error);
  }
});
