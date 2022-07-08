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
  const modal = useSelector((state) => state.modal);
  const userData = useSelector((state) => state.user);
  const isLoggedIn = userData.status === userStatus.loggedIn;
  const modalName = modal.modalName;

  useEffect(() => {
    if (isLoggedIn) dispatch(hideModal());
  }, [dispatch, isLoggedIn]);

  if (modalName === modalNames.login)
    return (
      <React.Fragment>
        <BackDropOverlay />
        <LoginModal />
      </React.Fragment>
    );
  if (modalName === modalNames.signup)
    return (
      <React.Fragment>
        <BackDropOverlay />
        <SignupModal />
      </React.Fragment>
    );

  return null;
};
