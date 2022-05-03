import { X_DELETE } from "../../icons/X_DELETE";
import styles from "./CARD.module.css";

export const FAVOURITE_BLOG = function () {
  return (
    <div className={styles.blog_card}>
      <div className={styles.upper_part}>
        <X_DELETE />
        <div className={styles.shadow_overlay}></div>
      </div>
      <div className={styles.lower_part}>
        <h3 className={styles.blog_title + " h4b"}>
          Nulla Lorem mollit cupidatat irure
        </h3>
        <div className={styles.blog_info}>
          <div className={styles.left_info}>
            <p className="h4m">by ashish singh</p>
            <p className="h4m">23 views</p>
          </div>
          <div className={styles.right_info} single="true">
            <p className="h4m">1 weeks ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};
