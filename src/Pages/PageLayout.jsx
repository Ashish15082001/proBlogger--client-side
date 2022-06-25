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
import { AccountCard } from "../components/cards/account card/AccountCard";
import { showToast, toastStatus } from "../redux/slices/toast/toastSlice";
import { Toast } from "../components/toast/Toast";
import { AnimatePresence } from "framer-motion";
import { PublishBlogModal } from "../components/modals/publish blog modal/PublishBlogModal";

export const PageLayout = function () {
  const dispatch = useDispatch();
  const toast = useSelector((state) => state.toast);
  const isRestoringState = useSelector(
    (state) => state.user.status === userStatus.restoringState
  );

  const isLoggedIn = useSelector(
    (state) => state.user.status === userStatus.loggedIn
  );

  useEffect(() => {
    const f = async function () {
      try {
        const setteledPromise = await dispatch(restoreState());
        if (setteledPromise.error)
          throw new Error(setteledPromise.error.message);

        dispatch(
          showToast({
            toastType: "success",
            message: "Session is restored successfully",
          })
        );
      } catch (error) {
        dispatch(showToast({ toastType: "error", message: error.message }));
      }
    };

    f();
  }, [dispatch]);

  if (isRestoringState === true) return <h1>restoring state...</h1>;

  return (
    <div className={PageLayoutStyles.main_container}>
      <AnimatePresence>
        {toast.status === toastStatus.visible && <Toast />}
      </AnimatePresence>
      <MainHeader />
      <MainNavigation />
      <Routes>
        <Route
          path="/"
          element={<Navigate to={urls.trending.url + "?pageNumber=1"} />}
        ></Route>
        <Route path={urls.trending.url} element={<TrendingContent />}></Route>
        <Route path={urls.blogs.url} element={<BlogsContent />}></Route>
        {isLoggedIn && (
          <Route path={urls.userBlogs.url} element={<MyBlogsContent />}></Route>
        )}
        {isLoggedIn && (
          <Route
            path={urls.favourites.url}
            element={<FavouritesContent />}
          ></Route>
        )}
        {isLoggedIn && (
          <Route path={urls.account.url} element={<AccountCard />}></Route>
        )}
        {isLoggedIn && (
          <Route
            path={urls.publishBlog.url}
            element={<PublishBlogModal />}
          ></Route>
        )}
        <Route
          path="*"
          element={<Navigate to={urls.trending.url + "?pageNumber=1"} />}
        ></Route>
      </Routes>
    </div>
  );
};
