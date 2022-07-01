import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTheme } from "../..";
import {
  resetFavouritesContent,
  resetMyBlogsContent,
} from "../../redux/slices/content/contentsSlice";
import { modalNames, showModal } from "../../redux/slices/modals/modalsSlice";
import { logOut, userStatus } from "../../redux/slices/user/userSlice";
import MainHeaderStyles from "./MainHeader.module.css";
import { MenuIcon } from "../../icons/MenuIcon";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const MainHeader = function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUserStatus = useSelector((state) => state.user.status);
  const userName = useSelector(
    (state) =>
      state.user.credentials.account.firstName +
      " " +
      state.user.credentials.account.lastName
  );
  const userId = useSelector((state) => state.user.credentials.account._id);
  const [showMenu, setShowMenu] = useState(false);

  const toggleShowMenu = function () {
    setShowMenu((oldState) => !oldState);
  };

  return (
    <React.Fragment>
      <div className={MainHeaderStyles.mainHeaderContainer}>
        <div className={MainHeaderStyles.mainHeader}>
          <h1
            className={MainHeaderStyles.mainLogo}
            onClick={() => {
              setTheme("teal");
            }}
          >
            ProBlogger
          </h1>
          <div className={MainHeaderStyles.flexContainer}>
            {currentUserStatus === userStatus.loggedIn && (
              <p className={MainHeaderStyles.greeting}>
                welcome, <span>{userName}</span>
              </p>
            )}
            <div
              className={MainHeaderStyles.menuContainer}
              onClick={toggleShowMenu}
            >
              <MenuIcon />
            </div>
          </div>
        </div>
        <AnimatePresence>
          {showMenu && (
            <motion.div
              key="drop down menu"
              animate={{ y: 0, opacity: 1 }}
              initial={{ y: -30, opacity: 0 }}
              exit={{ y: -30, opacity: 0 }}
              className={MainHeaderStyles.menuItems}
            >
              {currentUserStatus === userStatus.loggedOut && (
                <p
                  onClick={() =>
                    dispatch(showModal({ modalName: modalNames.login }))
                  }
                >
                  Login
                </p>
              )}
              {currentUserStatus === userStatus.loggedOut && (
                <p
                  onClick={() =>
                    dispatch(showModal({ modalName: modalNames.signup }))
                  }
                >
                  Create account
                </p>
              )}
              {currentUserStatus === userStatus.loggedIn && (
                <p onClick={() => navigate(`/user/${userId}/account`)}>
                  Account
                </p>
              )}
              {currentUserStatus === userStatus.loggedIn && (
                <p
                  onClick={() => {
                    dispatch(logOut());
                    dispatch(resetFavouritesContent());
                    dispatch(resetMyBlogsContent());
                    navigate("/");
                  }}
                >
                  Logout
                </p>
              )}
              <div className={MainHeaderStyles.seperator}></div>
              <p>Theme</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </React.Fragment>
  );
};
