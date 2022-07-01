import { Label } from "../../label/Label";
import InputComponentsStyles from "../InputComponents.module.css";

export const TextArea = function (props) {
  const { style, textValue, onTextValueChange, status, label } = props;

  return (
    <div className={InputComponentsStyles.inputContainer}>
      <Label label={label} status={status} />
      <textarea
        style={{ ...style, resize: "none" }}
        id={label}
        iserror={`${status.isError}`}
        onChange={onTextValueChange}
        value={textValue}
      ></textarea>
    </div>
  );
};
