import { createSlice } from "@reduxjs/toolkit";

export const toastStatus = {
  hidden: "hidden",
  visible: "visible",
};

export const toastType = {
  error: "error",
  success: "success",
  alert: "alert",
};

const initialState = [];

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast(state, action) {
      state[state.length] = {
        status: toastStatus.visible,
        toastType: action.payload.toastType,
        message: action.payload.message,
      };
    },
    hideToast(state, action) {
      // state.status = toastStatus.hidden;
    },
  },
});

export const toastSliceReducer = toastSlice.reducer;
export const { showToast, hideToast } = toastSlice.actions;
