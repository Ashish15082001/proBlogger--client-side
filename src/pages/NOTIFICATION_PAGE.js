import { MAIN_CONTAINER } from "../components/MAIN_CONTAINER";
import { SIDE_NAVIGATION_BAR } from "../components/SIDE_NAVIGATION_BAR";
import styles from "./PAGE_LAYOUT.module.css";

export const NOTIFICATION_PAGE = function () {
  return (
    <div className={styles.parent_container}>
      <SIDE_NAVIGATION_BAR />
      <MAIN_CONTAINER />
    </div>
  );
};
