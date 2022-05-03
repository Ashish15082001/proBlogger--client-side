import { CONTENT_CONTAINER } from "./CONTENT_CONTAINER";
import styles from "./MAIN_CONTAINER.module.css";
import { MAIN_HEADER } from "./MAIN_HEADER";

export const MAIN_CONTAINER = function () {
  return (
    <main className={styles.main_container}>
      <MAIN_HEADER />
      <CONTENT_CONTAINER />
    </main>
  );
};
