import { useState } from "react";
import { AUTH_FORM } from "../components/AUTH_FORM";
import { LOGIN_IN } from "../constants";

export const LOGIN_PAGE = function () {
  const [EMAIL, SET_EMAIL] = useState("");
  const [PASSWORD, SET_PASSWORD] = useState("");

  const ON_EMAIL_CHANGE = function (event) {
    SET_EMAIL(event.target.value);
  };

  const ON_PASSWORD_CHANGE = function (event) {
    SET_PASSWORD(event.target.value);
  };

  const FORM_STRUCTURE_DATA = {
    type: LOGIN_IN,
    form_heading: "Account Login",
    form_description: "Namaste, please enter your login credentials",
    input_label_containers: [
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
