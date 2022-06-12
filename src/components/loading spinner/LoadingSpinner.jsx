import LoadingSpinnerStyles from "./LoadingSpinner.module.css";

export const LoadingSpinner = function () {
  return (
    <div className={LoadingSpinnerStyles["lds-spinner"]}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
