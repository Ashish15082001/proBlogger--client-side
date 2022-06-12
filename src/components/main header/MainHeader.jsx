import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  showLoginModal,
  showSignupModal,
} from "../../redux/slices/modals/modalsSlice";
import { logOut, userStatus } from "../../redux/slices/user/userSlice";
import MainHeaderStyles from "./MainHeader.module.css";

export const MainHeader = function () {
  const currentUserStatus = useSelector((state) => state.user.status);
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <div className={MainHeaderStyles.mainHeaderContainer}>
        <div className={MainHeaderStyles.mainHeader}>
          <h1 className={MainHeaderStyles.mainLogo}>ProBlogger</h1>
          <div className={MainHeaderStyles.flexContainer}>
            {currentUserStatus === userStatus.loggedOut && (
              <p onClick={() => dispatch(showLoginModal())}>login</p>
            )}
            {currentUserStatus === userStatus.loggedOut && (
              <p onClick={() => dispatch(showSignupModal())}>create account</p>
            )}
            {currentUserStatus === userStatus.loggedIn && (
              <p onClick={() => dispatch(logOut())}>logout</p>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
