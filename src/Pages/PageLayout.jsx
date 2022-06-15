import { Navigate, Route, Routes } from "react-router-dom";
import { MainHeader } from "../components/main header/MainHeader";
import { MainNavigation } from "../components/main navigation/MainNavigation";
import { urls } from "../constants";
import { BlogsContent } from "../components/contents/BlogsContent";
import { FavouritesContent } from "../components/contents/FavouritesContent";
import { TrendingContent } from "../components/contents/TrendingContent";
import { MyBlogsContent } from "../components/contents/MyBlogsContent";
import PageLayoutStyles from "./PageLayout.module.css";
import { useEffect } from "react";
import { restoreState } from "../redux/slices/user/userThunks";
import { userStatus } from "../redux/slices/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

export const PageLayout = function () {
  const dispatch = useDispatch();
  const isRestoringState = useSelector(
    (state) => state.user.status === userStatus.restoringState
  );

  useEffect(() => {
    dispatch(restoreState());
  }, []);

  if (isRestoringState === true) return <h1>restoring state...</h1>;

  return (
    <div className={PageLayoutStyles.main_container}>
      <MainHeader />
      <MainNavigation />
      <Routes>
        <Route
          path="/"
          element={<Navigate to={urls.trending.url + "?pageNumber=1"} />}
        ></Route>
        <Route path={urls.trending.url} element={<TrendingContent />}></Route>
        <Route path={urls.blogs.url} element={<BlogsContent />}></Route>
        <Route
          path={urls.favourites.url}
          element={<FavouritesContent />}
        ></Route>
        <Route path={urls.userBlogs.url} element={<MyBlogsContent />}></Route>
      </Routes>
    </div>
  );
};
