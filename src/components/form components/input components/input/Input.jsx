import { Label } from "../../label/Label";
import InputComponentsStyles from "../InputComponents.module.css";
import { motion } from "framer-motion";

export const Input = function (props) {
  const { label, inputValue, onInputChange, inputType, autoFocus, status } =
    props;
  return (
    <motion.div
      // animate={{ x: 0, opacity: 1 }}
      // initial={{ x: -30, opacity: 0 }}
      // transition={{ duration: 0.5 }}
      className={InputComponentsStyles.inputContainer}
    >
      <Label label={label} status={status} />
      {inputType !== "file" && (
        <input
          iserror={`${status.isError}`}
          id={label}
          type={inputType}
          value={inputValue}
          onChange={onInputChange}
          autoFocus={autoFocus}
        />
      )}
      {inputType === "file" && (
        <input
          iserror={`${status.isError}`}
          id={label}
          type={inputType}
          onChange={onInputChange}
        />
      )}
    </motion.div>
  );
};
