import React from "react";
import { LoginModal } from "./auth modal/login modal/LoginModal";
import { SignupModal } from "./auth modal/signup modal/SignupModal";

export const Modals = function () {
  return (
    <React.Fragment>
      <LoginModal />
      <SignupModal />
    </React.Fragment>
  );
};
