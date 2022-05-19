import { NavLink } from "react-router-dom";
import { Favourite } from "../icons/Favourite";
import { Blogs } from "../icons/Blogs";
import { Me } from "../icons/Me";
import { Trending } from "../icons/Trending";
import MainNavigationStyles from "./MainNavigation.module.css";

export const MainNavigation = function () {
  return (
    <ul className={MainNavigationStyles.main_navigation}>
      <li>
        <NavLink to="/trending" end>
          <Trending />
          <span className={MainNavigationStyles.navigation_text}>trending</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/blogs" end>
          <Blogs />
          <span className={MainNavigationStyles.navigation_text}>blogs</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/favourites" end>
          <Favourite />
          <span className={MainNavigationStyles.navigation_text}>
            favourites
          </span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/blogs/user1234" end>
          <Me />
          <span className={MainNavigationStyles.navigation_text}>my blogs</span>
        </NavLink>
      </li>
    </ul>
  );
};
