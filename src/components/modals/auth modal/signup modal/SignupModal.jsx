import { Cancel } from "../../../../icons/Cancel";
import SignupModalStyles from "../AuthModal.module.css";
import { motion } from "framer-motion";
import { useState } from "react";
import { Input } from "../../../input/Input";
import {
  hideModal,
  modalNames,
  showLoginModal,
} from "../../../../redux/slices/modals/modalsSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  sanitiseEmail,
  sanitiseName,
  sanitisePassword,
} from "../../../../utilities/sanitise";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../../../../utilities/validate";
import { signUp, userStatus } from "../../../../redux/slices/user/userSlice";

export const SignupModal = function (props) {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [firstNameStatus, setFirstNameStatus] = useState({ isError: false });
  const [lastNameStatus, setLastNameStatus] = useState({ isError: false });
  const [emailStatus, setEmailStatus] = useState({ isError: false });
  const [passwordStatus, setPasswordStatus] = useState({ isError: false });
  const [confirmedPasswordStatus, setConfirmedPasswordStatus] = useState({
    isError: false,
  });
  const [triedFormSubmition, setTriedFormSubmition] = useState(false);

  const showSignUpModal = useSelector(
    (state) => state.modals.showModal === modalNames.signup
  );

  const isSigningUp = useSelector(
    (state) => state.user.status === userStatus.signingUp
  );

  const isLoggedIn = useSelector(
    (state) => state.user.status === userStatus.loggedIn
  );

  if (!showSignUpModal) return null;

  if (isLoggedIn) {
    dispatch(hideModal());
    return null;
  }

  const onFirstNameChanged = function (event) {
    const enteredFirstName = event.target.value;

    if (triedFormSubmition) {
      if (validateName(enteredFirstName) === false)
        setFirstNameStatus({
          isError: true,
          description: "invalid first name",
        });
      else setFirstNameStatus({ isError: false });
    }

    setFirstName(sanitiseName(enteredFirstName));
  };
  const onLastNameChanged = function (event) {
    const enteredLastName = event.target.value;

    if (triedFormSubmition) {
      if (validateName(enteredLastName) === false)
        setLastNameStatus({
          isError: true,
          description: "invalid first name",
        });
      else setLastNameStatus({ isError: false });
    }
    setLastName(sanitiseName(enteredLastName));
  };
  const onEmailChanged = function (event) {
    const enteredEmail = event.target.value;

    if (triedFormSubmition) {
      if (validateEmail(enteredEmail) === false)
        setEmailStatus({
          isError: true,
          description: "invalid email",
        });
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
  const onConfirmedPasswordChanged = function (event) {
    const enteredConfirmedPasswotd = event.target.value;

    if (triedFormSubmition) {
      if (
        enteredConfirmedPasswotd === "" ||
        password !== enteredConfirmedPasswotd
      )
        setConfirmedPasswordStatus({
          isError: true,
          description: "confirmed password ≠ password",
        });
      else setConfirmedPasswordStatus({ isError: false });
    }
    setConfirmedPassword(sanitisePassword(enteredConfirmedPasswotd));
  };

  const signup = function (event) {
    event.preventDefault();
    let isError = false;

    if (validateEmail(email) === false) {
      isError = true;
      setEmailStatus({ isError: true, description: "invalid email" });
    }
    if (validateName(firstName) === false) {
      isError = true;
      setFirstNameStatus({ isError: true, description: "invalid first name" });
    }
    if (validateName(lastName) === false) {
      isError = true;
      setLastNameStatus({ isError: true, description: "invalid last name" });
    }
    if (validatePassword(password) === false) {
      isError = true;
      setPasswordStatus({
        isError: true,
        description: "minimum length is 8",
      });
    }
    if (confirmedPassword === "" || password !== confirmedPassword) {
      isError = true;
      setConfirmedPasswordStatus({
        isError: true,
        description: "confirmed password ≠ password",
      });
    }

    if (isError) return setTriedFormSubmition(true);

    console.log("signed up successfully...😊");
    dispatch(
      signUp({ firstName, lastName, email, password, confirmedPassword })
    );
  };

  return (
    <div className={SignupModalStyles.modalContainer}>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className={SignupModalStyles.modal}
      >
        <Cancel onClick={() => dispatch(hideModal())} />
        <h1 className={SignupModalStyles.title}>Signup</h1>
        <p className={SignupModalStyles.description}>
          Please enter all credentials to create new account
        </p>
        <form onSubmit={signup}>
          <Input
            label="first name"
            inputValue={firstName}
            onInputChange={onFirstNameChanged}
            inputType="text"
            required={true}
            autoFocus={true}
            status={firstNameStatus}
          />
          <Input
            label="last name"
            inputValue={lastName}
            onInputChange={onLastNameChanged}
            inputType="text"
            required={true}
            autoFocus={false}
            status={lastNameStatus}
          />
          <Input
            label="email"
            inputValue={email}
            onInputChange={onEmailChanged}
            inputType="email"
            required={true}
            autoFocus={false}
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
          <Input
            label="confirm password"
            inputValue={confirmedPassword}
            onInputChange={onConfirmedPasswordChanged}
            inputType="password"
            required={true}
            autoFocus={false}
            status={confirmedPasswordStatus}
          />
          <button disabled={isSigningUp} type="submit">
            {`${
              isSigningUp ? "please wait... creating account" : "create account"
            }`}
          </button>
        </form>
        <p className={SignupModalStyles.description}>
          Already Have account ?{" "}
          <span
            className={SignupModalStyles.clickableText}
            onClick={() => dispatch(showLoginModal())}
          >
            login
          </span>
        </p>
      </motion.div>
    </div>
  );
};
