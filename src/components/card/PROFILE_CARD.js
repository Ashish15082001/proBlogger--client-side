import styles from "./PROFILE_CARD.module.css";

export const PROFILE_CARD = function () {
  return (
    <div className={styles.profile_card}>
      <div className={styles.cover_photo}>
        <div className={styles.shadow_overlay}></div>
      </div>
      <div className={styles.profile_photo}></div>
      <div className={styles.lower_container}>
        <div className={styles.main_part}>
          <h3 className={styles.user_name + " h2b"}>Ashish Singh</h3>
          <p className={styles.user_description + " h4sb"}>
            head of design @creativerooms / founder @getfound / product designer
            @designer
          </p>
          <div className={styles.stats}>
            <p className="h4m" id="followers">
              <span className="h4sb pr-clr">34.4k</span> followers
            </p>
            <p className="h4m" id="following">
              <span className="h4sb  pr-clr">46</span> following
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
