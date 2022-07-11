import React from "react";
import { useSelector } from "react-redux";
import { modalNames } from "../../redux/slices/modals/modalsSlice";
import { BackDropOverlay } from "../backdrop overlay/BackDropOverlay";

import { AuthModal } from "./auth modal/AuthModal";
import { ConfirmationModel } from "./confirmation modal/ConfirmationModel";

export const Modal = function () {
  const showModal = useSelector(
    (state) => state.modal.modalName !== modalNames.none
  );

  if (showModal)
    return (
      <React.Fragment>
        <BackDropOverlay />
        <AuthModal />
      </React.Fragment>
    );
  return null;
};
