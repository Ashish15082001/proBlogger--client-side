import { useLocation, useNavigate } from "react-router-dom";
import { FavouriteIcon } from "../../icons/FavouriteIcon";
import { BlogsIcon } from "../../icons/BlogsIcon";
import { MyBlogsIcon } from "../../icons/MyBlogsIcon";
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
          <span>
            <TrendingIcon />
          </span>
          <p className={MainNavigationStyles.navigation_text}>trending</p>
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
          <span>
            <BlogsIcon />
          </span>
          <p className={MainNavigationStyles.navigation_text}>blogs</p>
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
            <span>
              <FavouriteIcon />
            </span>
            <p className={MainNavigationStyles.navigation_text}>favourites</p>
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
            <span>
              <MyBlogsIcon />
            </span>
            <p className={MainNavigationStyles.navigation_text}>my blogs</p>
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
            <span>
              <PublishIcon />
            </span>
            <p className={MainNavigationStyles.navigation_text}>Publish blog</p>
          </div>
        </li>
      )}
    </ul>
  );
};
