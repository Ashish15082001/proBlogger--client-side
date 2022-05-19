import { Navigate, Route, Routes } from "react-router-dom";
import { BlogsContent } from "../components/contents/BlogsContent";
import { FavouritesContent } from "../components/contents/FavouritesContent";
import { MyBlogsContent } from "../components/contents/MyBlogsContent";
import { TrendingContent } from "../components/contents/TrendingContent";
import { MainHeader } from "../components/MainHeader";
import { MainNavigation } from "../components/MainNavigation";
import { urls } from "../constants";
import PageLayoutStyles from "./PageLayout.module.css";

export const PageLayout = function () {
  return (
    <div className={PageLayoutStyles.main_container}>
      <MainHeader />
      <MainNavigation />
      <Routes>
        <Route path="/" element={<Navigate to={urls[0]} />}></Route>
        <Route path={urls[0]} element={<TrendingContent />}></Route>
        <Route path={urls[1]} element={<BlogsContent />}></Route>
        <Route path={urls[2]} element={<FavouritesContent />}></Route>
        <Route path={urls[3]} element={<MyBlogsContent />}></Route>
      </Routes>
    </div>
  );
};
