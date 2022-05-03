import styles from "./SIDE_NAVIGATION_BAR.module.css";
import { LOGO_SMALL } from "../icons/LOGO_SMALL";
import { LOGO } from "../icons/LOGO";
import { BLOGS } from "../icons/BLOGS";
import { FAVOURITES } from "../icons/FAVOURITES";
import { NOTIFICATION } from "../icons/NOTIFICATION";
import { PROFILE } from "../icons/PROFILE";
import { MY_BLOGS } from "../icons/MY_BLOGS";
import { WRITE_BLOG } from "../icons/WRITE_BLOG";
import { Link, useLocation } from "react-router-dom";

export const SIDE_NAVIGATION_BAR = function () {
  const { pathname } = useLocation();
  return (
    <div className={styles.side_navigation_bar}>
      <header className={styles.logo_container}>
        <LOGO />
        <LOGO_SMALL />
        <h2 className={styles.logo_text + " h2b"}>ProBlogger</h2>
      </header>

      <ul className={styles.navigation_links}>
        <li className={styles.navigation_link}>
          <Link to="/blogs" active={(pathname === "/blogs").toString()}>
            <BLOGS />
            <span className={styles.destination_name + " h4m"}>Blogs</span>
          </Link>
        </li>
        <li className={styles.navigation_link}>
          <Link to="/my-blogs" active={(pathname === "/my-blogs").toString()}>
            <MY_BLOGS />
            <span className={styles.destination_name + " h4m"}>My Blogs</span>
          </Link>
        </li>
        <li className={styles.navigation_link}>
          <Link
            to="/favourites"
            active={(pathname === "/favourites").toString()}
          >
            <FAVOURITES />
            <span className={styles.destination_name + " h4m"}>Favourites</span>
          </Link>
        </li>
        <li className={styles.navigation_link}>
          <Link
            to="/notifications"
            active={(pathname === "/notifications").toString()}
          >
            <NOTIFICATION />
            <span className={styles.destination_name + " h4m"}>
              Notifications
            </span>
          </Link>
        </li>
        <li className={styles.navigation_link}>
          <Link to="/profile" active={(pathname === "/profile").toString()}>
            <PROFILE />
            <span className={styles.destination_name + " h4m"}>Profile</span>
          </Link>
        </li>
        <li className={styles.navigation_link}>
          <Link
            to="/write-blog"
            active={(pathname === "/write-blog").toString()}
          >
            <WRITE_BLOG />
            <span className={styles.destination_name + " h4m"}>Write Blog</span>
          </Link>
        </li>
      </ul>
      <div className={styles.space_filler}></div>
      <footer className={styles.user_card_container}></footer>
    </div>
  );
};
