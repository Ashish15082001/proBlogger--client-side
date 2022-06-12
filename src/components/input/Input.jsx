import InputStyles from "./Input.module.css";

export const Input = function (props) {
  const {
    label,
    inputValue,
    onInputChange,
    inputType,
    autoFocus,
    status,
    onFocus,
  } = props;
  return (
    <div className={InputStyles.inputContainer}>
      <div className={InputStyles.inputUpperTextContainer}>
        <label htmlFor={label}>{label}</label>
        {status.isError && (
          <p className={InputStyles.description}>{status.description}</p>
        )}
      </div>
      <input
        iserror={`${status.isError}`}
        id={label}
        type={inputType}
        value={inputValue}
        onChange={onInputChange}
        autoFocus={autoFocus}
        onFocus={onFocus}
      ></input>
    </div>
  );
};
