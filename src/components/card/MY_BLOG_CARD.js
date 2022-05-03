import { Link } from "react-router-dom";
import { X_DELETE } from "../../icons/X_DELETE";
import styles from "./CARD.module.css";

export const MY_BLOG_CARD = function () {
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
            <p className="h4m">200 views</p>
            <p className="h4m">20 likes</p>
            <p className="h4m">20 comments</p>
          </div>
          <div className={styles.right_info}>
            <p className="h4m">1 weeks ago</p>
            <Link to={"#"} className="h4m">
              edit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
