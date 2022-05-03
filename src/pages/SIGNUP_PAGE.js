import { useState } from "react";
import { AUTH_FORM } from "../components/AUTH_FORM";
import { SIGN_UP } from "../constants";

export const SIGNUP_PAGE = function () {
  const [FIRST_NAME, SET_FIRST_NAME] = useState("");
  const [LAST_NAME, SET_LAST_NAME] = useState("");
  const [EMAIL, SET_EMAIL] = useState("");
  const [PASSWORD, SET_PASSWORD] = useState("");

  const ON_FIRST_NAME_CHANGE = function (event) {
    SET_FIRST_NAME(event.target.value);
  };

  const ON_LAST_NAME_CHANGE = function (event) {
    SET_LAST_NAME(event.target.value);
  };

  const ON_EMAIL_CHANGE = function (event) {
    SET_EMAIL(event.target.value);
  };

  const ON_PASSWORD_CHANGE = function (event) {
    SET_PASSWORD(event.target.value);
  };

  const FORM_STRUCTURE_DATA = {
    type: SIGN_UP,
    form_heading: "Account Login",
    form_description: "Namaste, please enter your login credentials",
    input_label_containers: [
      {
        label: "first name",
        isMandatory: true,
        type: "text",
        value: FIRST_NAME,
        onChange: ON_FIRST_NAME_CHANGE,
      },
      {
        label: "last name",
        isMandatory: true,
        type: "text",
        value: LAST_NAME,
        onChange: ON_LAST_NAME_CHANGE,
      },
      {
        label: "email",
        isMandatory: true,
        type: "email",
        value: EMAIL,
        onChange: ON_EMAIL_CHANGE,
      },
      {
        label: "password",
        isMandatory: true,
        type: "password",
        value: PASSWORD,
        onChange: ON_PASSWORD_CHANGE,
      },
    ],
  };

  return <AUTH_FORM FORM_STRUCTURE_DATA={FORM_STRUCTURE_DATA} />;
};
