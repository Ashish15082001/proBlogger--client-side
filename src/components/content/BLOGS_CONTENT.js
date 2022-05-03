import { BLOG_CARD } from "../card/BLOG_CARD";
import styles from "./GRID_SYSTEM.module.css";

export const BLOGS_CONTENT = function () {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className={styles.content_grid}>
      {arr.map(() => (
        <BLOG_CARD />
      ))}
    </div>
  );
};
