import { useLocation, useNavigate } from "react-router-dom";
import { FavouriteIcon } from "../../icons/FavouriteIcon";
import { BlogsIcon } from "../../icons/BlogsIcon";
import { MeIcon } from "../../icons/MeIcon";
import { TrendingIcon } from "../../icons/TrendingIcon";
import { PublishIcon } from "../../icons/PublishIcon";
import MainNavigationStyles from "./MainNavigation.module.css";
import { urls, userIdKey } from "../../constants";
import { useSelector } from "react-redux";
import { userStatus } from "../../redux/slices/user/userSlice";
import { contentsStatus } from "../../redux/slices/content/contentsSlice";

export const MainNavigation = function () {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const isUserLoggedIn = useSelector(
    (state) => state.user.status === userStatus.loggedIn
  );
  const isAnyContentLoading = useSelector((state) => {
    if (state.contents.fetchingContentType.length === 0) return false;
    const fetchingContentType = state.contents.fetchingContentType;
    const fetchingPageNumber =
      state.contents[fetchingContentType].fetchingPageNumber;

    if (
      state.contents[fetchingContentType].pages[fetchingPageNumber].status ===
        contentsStatus.fetching ||
      state.contents[fetchingContentType].pages[fetchingPageNumber].status ===
        contentsStatus.initiated
    )
      return true;

    return false;
  });

  return (
    <ul className={MainNavigationStyles.main_navigation}>
      <li active={pathname === urls.trending.url ? "true" : "false"}>
        <div
          className={MainNavigationStyles.navlink}
          onClick={() => {
            if (isAnyContentLoading) return;
            navigate("/trending?pageNumber=1");
          }}
        >
          <TrendingIcon />
          <span className={MainNavigationStyles.navigation_text}>trending</span>
        </div>
      </li>
      <li active={pathname === urls.blogs.url ? "true" : "false"}>
        <div
          className={MainNavigationStyles.navlink}
          onClick={() => {
            if (isAnyContentLoading) return;
            navigate("/blogs?pageNumber=1");
          }}
        >
          <BlogsIcon />
          <span className={MainNavigationStyles.navigation_text}>blogs</span>
        </div>
      </li>
      {isUserLoggedIn && (
        <li
          active={
            pathname === `/user/${localStorage.getItem(userIdKey)}/favourites`
              ? "true"
              : "false"
          }
        >
          <div
            className={MainNavigationStyles.navlink}
            onClick={() => {
              if (isAnyContentLoading) return;
              navigate(
                `user/${localStorage.getItem(
                  userIdKey
                )}/favourites?pageNumber=1`
              );
            }}
          >
            <FavouriteIcon />
            <span className={MainNavigationStyles.navigation_text}>
              favourites
            </span>
          </div>
        </li>
      )}
      {isUserLoggedIn && (
        <li
          active={
            pathname === `/user/${localStorage.getItem(userIdKey)}/blogs`
              ? "true"
              : "false"
          }
        >
          <div
            className={MainNavigationStyles.navlink}
            onClick={() => {
              if (isAnyContentLoading) return;
              navigate(
                `user/${localStorage.getItem(userIdKey)}/blogs?pageNumber=1`
              );
            }}
          >
            <MeIcon />
            <span className={MainNavigationStyles.navigation_text}>
              my blogs
            </span>
          </div>
        </li>
      )}{" "}
      {isUserLoggedIn && (
        <li
          active={
            pathname === `/user/${localStorage.getItem(userIdKey)}/publishBlog`
              ? "true"
              : "false"
          }
        >
          <div
            className={MainNavigationStyles.navlink}
            onClick={() => {
              if (isAnyContentLoading) return;
              navigate(`/user/${localStorage.getItem(userIdKey)}/publishBlog`);
            }}
          >
            <PublishIcon />
            <span className={MainNavigationStyles.navigation_text}>
              Publish blog
            </span>
          </div>
        </li>
      )}
    </ul>
  );
};
