import ContentStyles from "./Content.module.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import {
  contentsStatus,
  initiateFetching,
} from "../../redux/slices/content/contentsSlice";
import { LoadingSpinner } from "../loading spinner/LoadingSpinner";
import { useLocation } from "react-router-dom";
import { PageNumberNavigation } from "../page number navigation/PageNumberNavigation";
import { motion } from "framer-motion";
import { fetchContent } from "../../redux/slices/content/contentsThunk";
import { contentTypes } from "../../redux/slices/content/contentsSlice";
// import { RefreshIcon } from "../../icons/RefreshIcon";
import { showToast } from "../../redux/slices/toast/toastSlice";
import { BlogCard } from "../cards/blog cards/BlogCard";
import { MyBlogCard } from "../cards/blog cards/MyBlogCard";
import { FavouriteBlogCard } from "../cards/blog cards/FavouriteBlogCard";

const listItemAnimations = {
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.1 },
  }),
  hidden: { opacity: 0, y: 40 },
};

export const ContentUiGenerater = function (props) {
  const { contentType } = props;
  const dispatch = useDispatch();
  const location = useLocation();
  const pageNumber = new URLSearchParams(location.search).get("pageNumber")
    ? new URLSearchParams(location.search).get("pageNumber")
    : 1;
  const isStatusForCurrentPageUndefined = useSelector((state) =>
    state.contents[contentType].pages[pageNumber] ? false : true
  );
  const selectedContentIds = useSelector((state) => {
    const startingIndex = (pageNumber - 1) * 10;
    const endingIndex = startingIndex + 10;

    return Object.keys(state.contents[contentType].entities).slice(
      startingIndex,
      endingIndex
    );
  });
  const currentPageContentStatus = useSelector((state) =>
    isStatusForCurrentPageUndefined
      ? null
      : state.contents[contentType].pages[pageNumber].status
  );

  useEffect(() => {
    const fun = async function () {
      try {
        if (isStatusForCurrentPageUndefined) {
          dispatch(initiateFetching({ contentType, pageNumber }));
          await dispatch(fetchContent({ contentType, pageNumber }));
        }
      } catch (error) {
        dispatch(showToast({ toastType: "error", message: error.message }));
      }
    };
    fun();
    return;
  }, [dispatch, pageNumber, isStatusForCurrentPageUndefined, contentType]);

  // const refreshContent = async function () {
  //   try {
  //     if (isStatusForCurrentPageUndefined) return;
  //     if (
  //       currentPageContentStatus !== contentsStatus.fetching &&
  //       currentPageContentStatus !== contentsStatus.initiated
  //     )
  //       dispatch(initiateFetching({ contentType, pageNumber }));
  //     const setteledPromise = await dispatch(
  //       fetchContent({ contentType, pageNumber })
  //     );

  //     if (setteledPromise.error) throw new Error(setteledPromise.error.message);
  //   } catch (error) {
  //     console.log(error);
  //     dispatch(showToast({ toastType: "error", message: error.message }));
  //   }
  //   return;
  // };

  if (selectedContentIds.length === 0)
    return (
      <React.Fragment>
        {/* <span className={ContentStyles.refreshIcon} onClick={refreshContent}>
          <RefreshIcon />
        </span> */}
        <div className={ContentStyles.placeholder}>
          {currentPageContentStatus === contentsStatus.initiated ||
            (currentPageContentStatus === contentsStatus.fetching && (
              <LoadingSpinner />
            ))}
          {currentPageContentStatus === contentsStatus.idle && (
            <p>no items 😑</p>
          )}
        </div>
        {selectedContentIds.length !== 0 && (
          <PageNumberNavigation
            contentType={contentType}
            pageNumber={pageNumber}
            currentPageContentStatus={currentPageContentStatus}
          />
        )}
      </React.Fragment>
    );

  return (
    <React.Fragment>
      {/* <span className={ContentStyles.refreshIcon} onClick={refreshContent}>
        <RefreshIcon />
      </span> */}
      <ul className={ContentStyles.content_grid}>
        {selectedContentIds.map((blogId, index) => (
          <motion.li
            initial="hidden"
            animate="visible"
            // exit="hidden"
            custom={index}
            variants={listItemAnimations}
            key={blogId}
          >
            {(contentType === contentTypes.blogs ||
              contentType === contentTypes.trending) && (
              <BlogCard blogId={blogId} contentType={contentType} />
            )}
            {contentType === contentTypes.favourites && (
              <FavouriteBlogCard blogId={blogId} />
            )}
            {contentType === contentTypes.myBlogs && (
              <MyBlogCard blogId={blogId} />
            )}
          </motion.li>
        ))}
      </ul>
      {selectedContentIds.length !== 0 && (
        <PageNumberNavigation
          contentType={contentType}
          pageNumber={pageNumber}
          currentPageContentStatus={currentPageContentStatus}
        />
      )}
    </React.Fragment>
  );
};
