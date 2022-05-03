import { Navigate, Route, Routes } from "react-router-dom";
import { LOGIN_PAGE } from "./pages/LOGIN_PAGE";
import { SIGNUP_PAGE } from "./pages/SIGNUP_PAGE";

import { BLOGS_PAGE } from "./pages/BLOGS_PAGE";
import { MY_BLOGS_PAGE } from "./pages/MY_BLOGS_PAGE";
import { FAVOURITE_BLOGS_PAGE } from "./pages/FAVOURITE_BLOGS_PAGE";
import { NOTIFICATION_PAGE } from "./pages/NOTIFICATION_PAGE";
import { PROFILE_PAGE } from "./pages/PROFILE_PAGE";
import { WRITE_BLOG_PAGE } from "./pages/WRITE_BLOG_PAGE";

// does all routing stuff.
// checks route or URL pathname and renders PAGE CONTENT COMPONENT accordingly
export const ROUTER = function () {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/blogs" />}></Route>
      <Route path="/login" element={<LOGIN_PAGE />}></Route>
      <Route path="/signup" element={<SIGNUP_PAGE />}></Route>
      <Route path="/blogs" element={<BLOGS_PAGE />}></Route>
      <Route path="/my-blogs" element={<MY_BLOGS_PAGE />}></Route>
      <Route path="/favourites" element={<FAVOURITE_BLOGS_PAGE />}></Route>\
      <Route path="/notifications" element={<NOTIFICATION_PAGE />}></Route>
      <Route path="/profile" element={<PROFILE_PAGE />}></Route>
      <Route path="/write-blog" element={<WRITE_BLOG_PAGE />}></Route>
    </Routes>
  );
};
