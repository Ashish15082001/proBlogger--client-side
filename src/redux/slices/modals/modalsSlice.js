const { createSlice } = require("@reduxjs/toolkit");

export const modalNames = {
  none: "no modal",
  login: "login modal",
  signup: "signup modal",
};

const initialState = {
  showModal: modalNames.none,
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    showLoginModal(state, action) {
      state.showModal = modalNames.login;
    },
    showSignupModal(state, action) {
      state.showModal = modalNames.signup;
    },
    hideModal(state, action) {
      state.showModal = modalNames.none;
    },
  },
});

export const { showLoginModal, showSignupModal, hideModal } =
  modalsSlice.actions;
export const modalsSliceReducer = modalsSlice.reducer;
