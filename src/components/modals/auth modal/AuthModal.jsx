import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  hideModal,
  modalNames,
} from "../../../redux/slices/modals/modalsSlice";
import { LoginModal } from "./login modal/LoginModal";
import { SignupModal } from "./signup modal/SignupModal";
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

  if (modalName === modalNames.login) return <LoginModal />;
  if (modalName === modalNames.signup) return <SignupModal />;

  return null;
};
