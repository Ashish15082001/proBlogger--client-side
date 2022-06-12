import BackDropOverlayStyles from "./BackDropOverlay.module.css";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { modalNames } from "../../redux/slices/modals/modalsSlice";

export const BackDropOverlay = function () {
  const showBackdrop = useSelector(
    (state) => state.modals.showModal !== modalNames.none
  );

  if (showBackdrop === false) return null;

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={BackDropOverlayStyles.backdrop}
    ></motion.div>
  );
};
