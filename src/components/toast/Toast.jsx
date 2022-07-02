import { useSelector } from "react-redux";
import ToastStyles from "./Toast.module.css";
import { motion } from "framer-motion";
import React from "react";

export const Toast = function () {
  const toasts = useSelector((state) => state.toast);

  return (
    <React.Fragment>
      {toasts.map((toast, index) => (
        <motion.div
          key={index}
          animate={{ y: 0, opacity: 1 }}
          initial={{ y: -30, opacity: 0 }}
          transition={{
            duration: 2,
            repeat: 1,
            repeatType: "reverse",
            type: "spring",
            stiffness: 100,
          }}
          exit={{ y: -30, opacity: 0 }}
          className={ToastStyles.toastContainer}
        >
          <div className={ToastStyles.toast} toasttype={toast.toastType}>
            <h5>{toast.toastType}</h5>
            <p>{toast.message}</p>
          </div>
        </motion.div>
      ))}
    </React.Fragment>
  );
};
