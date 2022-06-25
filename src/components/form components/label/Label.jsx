import LabelStyles from "./Label.module.css";

export const Label = function (props) {
  const { label, status } = props;

  return (
    <div className={LabelStyles.labelContainer}>
      <label htmlFor={label}>{label}</label>
      {status.isError && (
        <p className={LabelStyles.errorMessage}>{status.message}</p>
      )}
    </div>
  );
};
