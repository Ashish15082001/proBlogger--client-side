import { configureStore } from "@reduxjs/toolkit";
import { contentSliceReducer } from "./slices/content/contentsSlice";
import { modalsSliceReducer } from "./slices/modals/modalsSlice";
import { toastSliceReducer } from "./slices/toast/toastSlice";
import { userSliceReducer } from "./slices/user/userSlice";

export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    contents: contentSliceReducer,
    modal: modalsSliceReducer,
    toast: toastSliceReducer,
  },
});
