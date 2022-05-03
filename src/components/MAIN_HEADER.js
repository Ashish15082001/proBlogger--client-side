import styles from "./MAIN_HEADER.module.css";
import { MENU } from "../icons/MENU";

export const MAIN_HEADER = function () {
  return (
    <header className={styles.main_header}>
      <span className={styles.menu}>
        <MENU />
      </span>
      <h2 className={styles.greeting + " h2b"}>
        Namaste,{" "}
        <span className={styles.user_name + " h2b"}>ashish singh</span>
      </h2>
    </header>
  );
};
