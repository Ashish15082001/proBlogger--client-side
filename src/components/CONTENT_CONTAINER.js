import { useLocation } from "react-router-dom";
import { BLOGS_CONTENT } from "./content/BLOGS_CONTENT";
import { FAVOURITES_CONTENT } from "./content/FAVOURITES_CONTENT";
import { MY_BLOGS_CONTENT } from "./content/MY_BLOGS_CONTENT";
import { PROFILE_CONTENT } from "./content/PROFILE_CONTENT";
import styles from "./CONTENT_CONTAINER.module.css";

export const CONTENT_CONTAINER = function () {
  const CURRENT_URL = useLocation();

  let content;

  switch (CURRENT_URL.pathname) {
    case "/blogs":
      content = <BLOGS_CONTENT />;
      break;
    case "/my-blogs":
      content = <MY_BLOGS_CONTENT />;
      break;
    case "/favourites":
      content = <FAVOURITES_CONTENT />;
      break;
    case "/notifications":
      content = <FAVOURITES_CONTENT />;
      break;
    case "/profile":
      content = <PROFILE_CONTENT />;
      break;
    case "/write-blog":
      content = <FAVOURITES_CONTENT />;
      break;
  }

  return <div className={styles.content_container}>{content}</div>;
};
