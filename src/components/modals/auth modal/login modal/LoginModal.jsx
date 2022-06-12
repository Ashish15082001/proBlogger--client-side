import { Cancel } from "../../../../icons/Cancel";
import LoginModalStyles from "../AuthModal.module.css";
import { motion } from "framer-motion";
import { useState } from "react";
import { Input } from "../../../input/Input";
import { useDispatch, useSelector } from "react-redux";
import {
  validateEmail,
  validatePassword,
} from "../../../../utilities/validate";
import {
  sanitiseEmail,
  sanitisePassword,
} from "../../../../utilities/sanitise";
import {
  hideModal,
  modalNames,
  showSignupModal,
} from "../../../../redux/slices/modals/modalsSlice";

export const LoginModal = function () {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailStatus, setEmailStatus] = useState({ isError: false });
  const [passwordStatus, setPasswordStatus] = useState({ isError: false });
  const [triedFormSubmition, setTriedFormSubmition] = useState(false);

  const showModal = useSelector(
    (state) => state.modals.showModal === modalNames.login
  );

  if (!showModal) return null;

  const onEmailChanged = function (event) {
    const enteredEmail = event.target.value;

    if (triedFormSubmition) {
      if (validateEmail(enteredEmail) === false)
        setEmailStatus({ isError: true, description: "invalid email" });
      else setEmailStatus({ isError: false });
    }

    setEmail(sanitiseEmail(enteredEmail));
  };
  const onPasswordChanged = function (event) {
    const enteredPassword = event.target.value;

    if (triedFormSubmition) {
      if (validatePassword(enteredPassword) === false)
        setPasswordStatus({
          isError: true,
          description: "minimum length is 8",
        });
      else setPasswordStatus({ isError: false });
    }

    setPassword(sanitisePassword(enteredPassword));
  };

  const login = function (event) {
    event.preventDefault();
    let isError = false;

    if (validateEmail(email) === false) {
      isError = true;
      setEmailStatus({ isError: true, description: "invalid email" });
    }
    if (validatePassword(password) === false) {
      isError = true;
      setPasswordStatus({
        isError: true,
        description: "minimum length is 8",
      });
    }

    if (isError) return setTriedFormSubmition(true);

    console.log("logged in successfully...😊");
    // dispatch(logIn({ email, password }));
  };

  return (
    <div className={LoginModalStyles.modalContainer}>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className={LoginModalStyles.modal}
      >
        <Cancel onClick={() => dispatch(hideModal())} />
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
          <button type="submit">login</button>
        </form>
        <p className={LoginModalStyles.description}>
          Do not have any account ?{" "}
          <span
            className={LoginModalStyles.clickableText}
            onClick={() => dispatch(showSignupModal())}
          >
            create account
          </span>
        </p>
      </motion.div>
    </div>
  );
};
