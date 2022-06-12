// import ContentStyles from "./Content.module.css";
// import { BlogCard } from "../cards/BlogCard";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   contentsStatus,
//   fetchBlogsContent,
// } from "../../features/content/contentsSlice";
// import { LoadingSpinner } from "../loading spinner/LoadingSpinner";
// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";

export const BlogsContent = function () {
  // const blogsContentStatus = useSelector(
  //   (state) => state.contents.blogsContent.status
  // );
  // const selectedBlogsContentIds = useSelector((state) => {
  //   if (blogsContentStatus === contentsStatus.fetching) return [];
  //   return Object.keys(state.contents.blogsContent.entities);
  // });
  // const dispatch = useDispatch();
  // const location = useLocation();
  // const pageNumber = new URLSearchParams(location.search).get("pageNumber");

  // useEffect(() => {
  //   dispatch(fetchBlogsContent(pageNumber));
  //   return;
  // }, [dispatch, pageNumber]);

  // if (selectedBlogsContentIds.length === 0)
  //   return (
  //     <div className={ContentStyles.placeholder}>
  //       {blogsContentStatus === contentsStatus.fetching && <LoadingSpinner />}
  //       {blogsContentStatus === contentsStatus.idle && <p>no items</p>}
  //     </div>
  //   );

  // return (
  //   <ul className={ContentStyles.content_grid}>
  //     {selectedBlogsContentIds.map((id) => (
  //       <li key={id}>
  //         <BlogCard id={id} contentType={"blogsContent"} />
  //       </li>
  //     ))}
  //   </ul>
  // );
  return <p></p>;
};
