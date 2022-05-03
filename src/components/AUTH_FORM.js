// import { useState } from "react";
import { Link } from "react-router-dom";
import { LOGIN_IN } from "../constants";
import { APPLE } from "../icons/APPLE";
import { FACEBOOK } from "../icons/FACEBOOK";
import { GOOGLE } from "../icons/GOOGLE";
import styles from "./AUTH_FORM.module.css";

export const AUTH_FORM = function (props) {
  const { FORM_STRUCTURE_DATA } = props;
  // const [state, setSate] = useState();

  return (
    <form className={styles.form_container}>
      <div className={styles.top_container}>
        <h3 className={styles.form_heading + " h3sb"}>
          {FORM_STRUCTURE_DATA.form_heading}
        </h3>
        <p className={styles.form_description + " h5m"}>
          {FORM_STRUCTURE_DATA.form_description}
        </p>
      </div>
      <ul className={styles.middle_container}>
        {/* input_label_containers is a array of pair(input and label elements)*/}
        {FORM_STRUCTURE_DATA.input_label_containers.map(
          (input_label_container, index) => (
            <li key={index} className={styles.input_label_container}>
              <label
                className="form_label h4sb"
                htmlFor={input_label_container.label}
              >
                {input_label_container.label}
                {input_label_container.isMandatory ? "*" : ""}
              </label>
              <input
                id={input_label_container.label}
                type={input_label_container.type}
                className="form_input h4sb fill_container"
                value={input_label_container.value}
                onChange={input_label_container.onChange}
              />
            </li>
          )
        )}
      </ul>
      <div className={styles.extra_inputs}>
        {FORM_STRUCTURE_DATA.extra_inputs}
      </div>
      <input className="btn fill_container h4sb" type={"submit"}>
        {FORM_STRUCTURE_DATA.form_type}
      </input>
      <div className={styles.bottom_container}>
        <p className={styles.form_description + " h5m"}>
          {FORM_STRUCTURE_DATA.type === LOGIN_IN
            ? "or login in with"
            : "or signup with"}
        </p>
        <div className={styles.authentication_options}>
          <GOOGLE />
          <FACEBOOK />
          <APPLE />
        </div>
        <p className={styles.form_description + " h5m"}>
          {FORM_STRUCTURE_DATA.type === LOGIN_IN
            ? "Don't have an account? "
            : "Already have an account? "}
          {FORM_STRUCTURE_DATA.type === LOGIN_IN ? (
            <Link className="link h5m" to="/signup">Signup</Link>
          ) : (
            <Link className="link h5m" to="/login">
              Login
            </Link>
          )}
        </p>
      </div>
    </form>
  );
};
