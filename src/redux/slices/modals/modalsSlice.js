const { createSlice } = require("@reduxjs/toolkit");

export const modalNames = {
  none: "no modal",
  login: "login modal",
  signup: "signup modal",
  deletionConfirmation: "deletion confirmation modal",
  // publishBlog: "publish blog",
};

const initialState = {
  modalName: modalNames.none,
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    showModal(state, action) {
      const { modalName } = action.payload;
      state.modalName = modalName;
    },
    hideModal(state, action) {
      state.modalName = modalNames.none;
    },
  },
});

export const { showModal, hideModal } = modalsSlice.actions;
export const modalsSliceReducer = modalsSlice.reducer;
