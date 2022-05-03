import { MY_BLOG_CARD } from "../card/MY_BLOG_CARD";
import styles from "./GRID_SYSTEM.module.css";

export const MY_BLOGS_CONTENT = function () {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className={styles.content_grid}>
      {arr.map(() => (
        <MY_BLOG_CARD />
      ))}
    </div>
  );
};
