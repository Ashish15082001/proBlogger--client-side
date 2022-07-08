import { Label } from "../../label/Label";
import InputComponentsStyles from "../InputComponents.module.css";
import { motion } from "framer-motion";

export const Input = function ({
  label,
  inputValue,
  onInputChange,
  inputType,
  autoFocus,
  status,
}) {
  return (
    <motion.div className={InputComponentsStyles.inputContainer}>
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
