import { CancelIcon } from "../../../../icons/CancelIcon";
import SignupModalStyles from "../AuthModal.module.css";
import { motion } from "framer-motion";
import { useState } from "react";
import { Input } from "../../../form components/input components/input/Input";
import {
  hideModal,
  showModal,
  modalNames,
} from "../../../../redux/slices/modals/modalsSlice";
import { useDispatch, useSelector } from "react-redux";
import { sanitiseInputText } from "../../../../utilities/sanitise";
import {
  validateEmail,
  validateImage,
  validateName,
  validatePassword,
} from "../../../../utilities/validate";
import { userStatus } from "../../../../redux/slices/user/userSlice";
import { signUp } from "../../../../redux/slices/user/userThunks";
import { showToast } from "../../../../redux/slices/toast/toastSlice";
import { useRef } from "react";

export const SignupModal = function (props) {
  const dispatch = useDispatch();
  const formRef = useRef();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [firstNameStatus, setFirstNameStatus] = useState({ isError: false });
  const [lastNameStatus, setLastNameStatus] = useState({ isError: false });
  const [emailStatus, setEmailStatus] = useState({ isError: false });
  const [passwordStatus, setPasswordStatus] = useState({ isError: false });
  const [confirmedPasswordStatus, setConfirmedPasswordStatus] = useState({
    isError: false,
  });
  const [profileImageStatus, setProfileImageStatus] = useState({
    isError: false,
  });
  const [triedFormSubmition, setTriedFormSubmition] = useState(false);

  const isSigningUp = useSelector(
    (state) => state.user.status === userStatus.signingUp
  );

  const onFirstNameChanged = function (event) {
    const enteredFirstName = sanitiseInputText(event.target.value);

    if (triedFormSubmition) {
      if (validateName(enteredFirstName) === false)
        setFirstNameStatus({
          isError: true,
          message: "invalid first name",
        });
      else setFirstNameStatus({ isError: false });
    }

    setFirstName(enteredFirstName);
  };

  const onLastNameChanged = function (event) {
    const enteredLastName = sanitiseInputText(event.target.value);

    if (triedFormSubmition) {
      if (validateName(enteredLastName) === false)
        setLastNameStatus({
          isError: true,
          message: "invalid first name",
        });
      else setLastNameStatus({ isError: false });
    }
    setLastName(enteredLastName);
  };

  const onEmailChanged = function (event) {
    const enteredEmail = sanitiseInputText(event.target.value);

    if (triedFormSubmition) {
      if (validateEmail(enteredEmail) === false)
        setEmailStatus({
          isError: true,
          message: "invalid email",
        });
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
  const onConfirmedPasswordChanged = function (event) {
    const enteredConfirmedPasswotd = sanitiseInputText(event.target.value);

    if (triedFormSubmition) {
      if (
        enteredConfirmedPasswotd === "" ||
        password !== enteredConfirmedPasswotd
      )
        setConfirmedPasswordStatus({
          isError: true,
          message: "confirmed password ≠ password",
        });
      else setConfirmedPasswordStatus({ isError: false });
    }
    setConfirmedPassword(enteredConfirmedPasswotd);
  };

  const onProfileImageChanged = function (event) {
    const selectedProfileImage = event.target.files[0];

    if (triedFormSubmition) {
      if (validateImage(selectedProfileImage) === false) {
        setProfileImageStatus({
          isError: true,
          message: "please select valid image format",
        });
      } else setProfileImageStatus({ isError: false });
    }
    setProfileImage(selectedProfileImage);
  };

  const signup = async function (event) {
    try {
      event.preventDefault();
      let isError = false;

      if (validateEmail(email) === false) {
        isError = true;
        setEmailStatus({ isError: true, message: "invalid email" });
      }
      if (validateName(firstName) === false) {
        isError = true;
        setFirstNameStatus({
          isError: true,
          message: "invalid first name",
        });
      }
      if (validateName(lastName) === false) {
        isError = true;
        setLastNameStatus({ isError: true, message: "invalid last name" });
      }
      if (validatePassword(password) === false) {
        isError = true;
        setPasswordStatus({
          isError: true,
          message: "minimum length is 8",
        });
      }
      if (confirmedPassword === "" || password !== confirmedPassword) {
        isError = true;
        setConfirmedPasswordStatus({
          isError: true,
          message: "confirmed password ≠ password",
        });
      }

      if (validateImage(profileImage) === false) {
        isError = true;
        setProfileImageStatus({
          isError: true,
          message: "please select valid image format",
        });
      }

      if (isError && !triedFormSubmition) return setTriedFormSubmition(true);
      if (isError) return;

      const formData = new FormData();
      formData.set("firstName", firstName);
      formData.set("lastName", lastName);
      formData.set("email", email);
      formData.set("password", password);
      formData.set("confirmedPassword", confirmedPassword);
      formData.set("profileImage", profileImage, profileImage.name);
      const setteledPromise = await dispatch(signUp(formData));

      if (setteledPromise.error) throw new Error(setteledPromise.error.message);

      dispatch(
        showToast({
          toastType: "success",
          message: "Account is created successfully",
        })
      );
    } catch (error) {
      dispatch(showToast({ toastType: "error", message: error.message }));
    }
  };

  return (
    <div className={SignupModalStyles.modalContainer}>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className={SignupModalStyles.modal}
      >
        <CancelIcon onClick={() => dispatch(hideModal())} />
        <h1 className={SignupModalStyles.title}>Signup</h1>
        <p className={SignupModalStyles.description}>
          Please enter all credentials to create new account
        </p>
        <form ref={formRef} onSubmit={signup} encType="multipart/form-data">
          <Input
            label="first name"
            inputValue={firstName}
            onInputChange={onFirstNameChanged}
            inputType="text"
            autoFocus={true}
            status={firstNameStatus}
          />
          <Input
            label="last name"
            inputValue={lastName}
            onInputChange={onLastNameChanged}
            inputType="text"
            autoFocus={false}
            status={lastNameStatus}
          />
          <Input
            label="email"
            inputValue={email}
            onInputChange={onEmailChanged}
            inputType="text"
            autoFocus={false}
            status={emailStatus}
          />
          <Input
            label="password"
            inputValue={password}
            onInputChange={onPasswordChanged}
            inputType="password"
            autoFocus={false}
            status={passwordStatus}
          />
          <Input
            label="confirm password"
            inputValue={confirmedPassword}
            onInputChange={onConfirmedPasswordChanged}
            inputType="password"
            autoFocus={false}
            status={confirmedPasswordStatus}
          />
          <Input
            label="profile image"
            onInputChange={onProfileImageChanged}
            inputType="file"
            autoFocus={false}
            status={profileImageStatus}
          />
          <button disabled={isSigningUp} type="submit">
            {`${isSigningUp ? "creating account" : "create account"}`}
          </button>
        </form>
        <p className={SignupModalStyles.description}>
          Already Have account ?{" "}
          <span
            className={SignupModalStyles.clickableText}
            onClick={() => dispatch(showModal({ modalName: modalNames.login }))}
          >
            login
          </span>
        </p>
      </motion.div>
    </div>
  );
};
