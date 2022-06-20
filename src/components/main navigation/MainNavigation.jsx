import { NavLink, useLocation } from "react-router-dom";
import { Favourite } from "../../icons/Favourite";
import { Blogs } from "../../icons/Blogs";
import { Me } from "../../icons/Me";
import { Trending } from "../../icons/Trending";
import MainNavigationStyles from "./MainNavigation.module.css";
import { urls, userIdKey } from "../../constants";
import { useSelector } from "react-redux";
import { userStatus } from "../../redux/slices/user/userSlice";

export const MainNavigation = function () {
  const location = useLocation();
  const { pathname } = location;
  const isUserLoggedIn = useSelector(
    (state) => state.user.status === userStatus.loggedIn
  );

  return (
    <ul className={MainNavigationStyles.main_navigation}>
      <li active={pathname === urls.trending.url ? "true" : "false"}>
        <NavLink to="/trending?pageNumber=1" end>
          <Trending />
          <span className={MainNavigationStyles.navigation_text}>trending</span>
        </NavLink>
      </li>
      <li active={pathname === urls.blogs.url ? "true" : "false"}>
        <NavLink to="/blogs?pageNumber=1" end>
          <Blogs />
          <span className={MainNavigationStyles.navigation_text}>blogs</span>
        </NavLink>
      </li>

      {isUserLoggedIn && (
        <li
          active={
            pathname === `/user/${localStorage.getItem(userIdKey)}/favourites`
              ? "true"
              : "false"
          }
        >
          <NavLink
            to={`user/${localStorage.getItem(
              userIdKey
            )}/favourites?pageNumber=1`}
            end
          >
            <Favourite />
            <span className={MainNavigationStyles.navigation_text}>
              favourites
            </span>
          </NavLink>
        </li>
      )}
      {isUserLoggedIn && (
        <li active={pathname === "/blogs/user123" ? "true" : "false"}>
          <NavLink
            to={`user/${localStorage.getItem(userIdKey)}/blogs?pageNumber=1`}
            end
          >
            <Me />
            <span className={MainNavigationStyles.navigation_text}>
              my blogs
            </span>
          </NavLink>
        </li>
      )}
    </ul>
  );
};
