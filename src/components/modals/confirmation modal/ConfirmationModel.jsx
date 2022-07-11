import React from "react";
import { BackDropOverlay } from "../../backdrop overlay/BackDropOverlay";
import ConfirmationModelStyles from "./ConfirmationModel.module.css";
import { motion } from "framer-motion";

export const ConfirmationModel = function ({
  onContinue,
  onCancel,
  title,
  description,
}) {
  return (
    <React.Fragment>
      <BackDropOverlay />
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className={ConfirmationModelStyles.parentContainer}
      >
        <div className={ConfirmationModelStyles.confirmationModel}>
          <h5 className={ConfirmationModelStyles.modalTitle}>{title}</h5>
          <p className={ConfirmationModelStyles.modalDescription}>
            {description}
          </p>
          <div className={ConfirmationModelStyles.btnContainer}>
            <button onClick={onContinue}>Continue</button>
            <button onClick={onCancel}>Cancel</button>
          </div>
        </div>
      </motion.div>
    </React.Fragment>
  );
};
