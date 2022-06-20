import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "../../redux/slices/toast/toastSlice";
import ToastStyles from "./Toast.module.css";
import { motion } from "framer-motion";

export const Toast = function () {
  const toast = useSelector((state) => state.toast);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      // console.log("inside timer");
      dispatch(hideToast());
    }, 3000);
    return () => {
      // console.log("clearing timeout");
      clearTimeout(timer);
    };
  }, [dispatch]);

  return (
    <motion.div
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: -30, opacity: 0 }}
      transition={{ duration: 0.2 }}
      exit={{ y: -30, opacity: 0 }}
      className={ToastStyles.toastContainer}
    >
      <div className={ToastStyles.toast} toasttype={toast.toastType}>
        <h5>{toast.toastType}</h5>
        <p>{toast.message}</p>
      </div>
    </motion.div>
  );
};
