import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTheme } from "../..";
import { resetContent } from "../../redux/slices/content/contentsSlice";
import { modalNames, showModal } from "../../redux/slices/modals/modalsSlice";
import { logOut, userStatus } from "../../redux/slices/user/userSlice";
import MainHeaderStyles from "./MainHeader.module.css";
import { MenuIcon } from "../../icons/MenuIcon";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AccountIcon } from "../../icons/AccountIcon";
import { LogoutIcon } from "../../icons/LogoutIcon";
import { ThemeIcon } from "../../icons/ThemeIcon";
import { CreateAccountIcon } from "../../icons/CreateAccountIcon";
import { LoginIcon } from "../../icons/LoginIcon";

export const MainHeader = function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  const userCredentials = userData.credentials;
  const currentUserStatus = userData.status;
  const userName = userCredentials.firstName + " " + userCredentials.lastName;
  const userId = userCredentials._id;

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
                <div
                  className={MainHeaderStyles.menuOption}
                  onClick={() =>
                    dispatch(showModal({ modalName: modalNames.login }))
                  }
                >
                  <span>
                    <LoginIcon />
                  </span>
                  <p>Login</p>
                </div>
              )}
              {currentUserStatus === userStatus.loggedOut && (
                <div
                  className={MainHeaderStyles.menuOption}
                  onClick={() =>
                    dispatch(showModal({ modalName: modalNames.signup }))
                  }
                >
                  <span>
                    <CreateAccountIcon />
                  </span>
                  <p>Create account</p>
                </div>
              )}
              {currentUserStatus === userStatus.loggedIn && (
                <div
                  className={MainHeaderStyles.menuOption}
                  onClick={() => navigate(`/user/${userId}/account`)}
                >
                  <span>
                    <AccountIcon />
                  </span>
                  <p>Account</p>
                </div>
              )}
              {currentUserStatus === userStatus.loggedIn && (
                <div
                  className={MainHeaderStyles.menuOption}
                  onClick={() => {
                    dispatch(logOut());
                    dispatch(resetContent());

                    navigate("/");
                  }}
                >
                  <span>
                    <LogoutIcon />
                  </span>
                  <p>Logout</p>
                </div>
              )}
              {/* <div className={MainHeaderStyles.seperator}></div> */}
              {/* <div className={MainHeaderStyles.menuOption}>
                <span>
                  <ThemeIcon />
                </span>
                <p>Theme</p>
              </div> */}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </React.Fragment>
  );
};
