import { CancelIcon } from "../../../../icons/CancelIcon";
import LoginModalStyles from "../AuthModal.module.css";
import { motion } from "framer-motion";
import { useState } from "react";
import { Input } from "../../../form components/input components/input/Input";
import { useDispatch, useSelector } from "react-redux";
import {
  validateEmail,
  validatePassword,
} from "../../../../utilities/validate";
import { sanitiseInputText } from "../../../../utilities/sanitise";
import {
  hideModal,
  modalNames,
  showModal,
} from "../../../../redux/slices/modals/modalsSlice";
import { logIn } from "../../../../redux/slices/user/userThunks";
import { userStatus } from "../../../../redux/slices/user/userSlice";
import { showToast } from "../../../../redux/slices/toast/toastSlice";

export const LoginModal = function () {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailStatus, setEmailStatus] = useState({ isError: false });
  const [passwordStatus, setPasswordStatus] = useState({ isError: false });
  const [triedFormSubmition, setTriedFormSubmition] = useState(false);

  const isLoggingIn = useSelector(
    (state) => state.user.status === userStatus.loggingIn
  );

  const onEmailChanged = function (event) {
    const enteredEmail = sanitiseInputText(event.target.value);

    if (triedFormSubmition) {
      if (validateEmail(enteredEmail) === false)
        setEmailStatus({ isError: true, message: "invalid email" });
      else setEmailStatus({ isError: false });
    }

    setEmail(enteredEmail);
  };
  const onPasswordChanged = function (event) {
    const enteredPassword = sanitiseInputText(event.target.value);

    if (triedFormSubmition) {
      if (validatePassword(enteredPassword) === false)
        setPasswordStatus({
          isError: true,
          message: "minimum length is 8",
        });
      else setPasswordStatus({ isError: false });
    }

    setPassword(enteredPassword);
  };

  const login = async function (event) {
    try {
      event.preventDefault();
      let isError = false;

      if (validateEmail(email) === false) {
        isError = true;
        setEmailStatus({ isError: true, message: "invalid email" });
      }
      if (validatePassword(password) === false) {
        isError = true;
        setPasswordStatus({
          isError: true,
          message: "minimum length is 8",
        });
      }

      if (isError && !triedFormSubmition) return setTriedFormSubmition(true);
      if (isError) return;

      const formData = new FormData();

      formData.set("email", email);
      formData.set("password", password);

      const setteledPromise = await dispatch(logIn(formData));
      if (setteledPromise.error) throw new Error(setteledPromise.error.message);

      dispatch(
        showToast({ toastType: "success", message: "logged in successfully" })
      );
    } catch (error) {
      dispatch(showToast({ toastType: "error", message: error.message }));
    }
  };

  return (
    <div className={LoginModalStyles.modalContainer}>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className={LoginModalStyles.modal}
      >
        <CancelIcon onClick={() => dispatch(hideModal())} />
        <h1 className={LoginModalStyles.title}>login</h1>
        <p className={LoginModalStyles.description}>
          Please enter all credentials to login into your account
        </p>
        <form onSubmit={login}>
          <Input
            label="email"
            inputValue={email}
            onInputChange={onEmailChanged}
            inputType="text"
            required={true}
            autoFocus={true}
            status={emailStatus}
          />
          <Input
            label="password"
            inputValue={password}
            onInputChange={onPasswordChanged}
            inputType="password"
            required={true}
            autoFocus={false}
            status={passwordStatus}
          />
          <button disabled={isLoggingIn} type="submit">
            {" "}
            {`${isLoggingIn ? "logging in" : "log in"}`}
          </button>
        </form>
        <p className={LoginModalStyles.description}>
          Do not have any account ?{" "}
          <span
            className={LoginModalStyles.clickableText}
            onClick={() =>
              dispatch(showModal({ modalName: modalNames.signup }))
            }
          >
            create account
          </span>
        </p>
      </motion.div>
    </div>
  );
};
