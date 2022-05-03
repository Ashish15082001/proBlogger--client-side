import { FAVOURITE_BLOG } from "../card/FAVOURITE_BLOG";
import styles from "./GRID_SYSTEM.module.css";

export const FAVOURITES_CONTENT = function () {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className={styles.content_grid}>
      {arr.map(() => (
        <FAVOURITE_BLOG />
      ))}
    </div>
  );
};
