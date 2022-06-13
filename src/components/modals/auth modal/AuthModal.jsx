import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  hideModal,
  modalNames,
} from "../../../redux/slices/modals/modalsSlice";
import { LoginModal } from "./login modal/LoginModal";
import { SignupModal } from "./signup modal/SignupModal";
import { BackDropOverlay } from "../../backdrop overlay/BackDropOverlay";
import { userStatus } from "../../../redux/slices/user/userSlice";

export const AuthModal = function () {
  const dispatch = useDispatch();
  const currentModalName = useSelector((state) => state.modals.modalName);
  const isLoggedIn = useSelector(
    (state) => state.user.status === userStatus.loggedIn
  );

  useEffect(() => {
    if (isLoggedIn) dispatch(hideModal());
  }, [dispatch, isLoggedIn]);

  if (currentModalName === modalNames.login)
    return (
      <React.Fragment>
        <BackDropOverlay />
        <LoginModal />
      </React.Fragment>
    );
  if (currentModalName === modalNames.signup)
    return (
      <React.Fragment>
        <BackDropOverlay />
        <SignupModal />
      </React.Fragment>
    );

  return null;
};
