import ContentStyles from "./Content.module.css";
import { BlogCard } from "../cards/BlogCard";
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
import { FavouriteBlogCard } from "../cards/FavouriteBlogCard";
import { RefreshIcon } from "../../icons/RefreshIcon";
import { showToast } from "../../redux/slices/toast/toastSlice";
import { MyBlogCard } from "../cards/MyBlogCard";

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
  // extracting current page number from url(search parameter)
  const location = useLocation();
  const pageNumber = new URLSearchParams(location.search).get("pageNumber")
    ? new URLSearchParams(location.search).get("pageNumber")
    : 1;

  // extract total number of documents in database
  // here documents denotes entity for particular content type
  const totalDocuments = useSelector(
    (state) => state.contents[contentType].totalDocuments
  );
  //checking if trending content has data object(entitities) for current page
  const isContentUndefined = useSelector((state) =>
    state.contents[contentType].pages[pageNumber] ? false : true
  );
  // extracted id from trending content data object(entitities) for current page
  const selectedContentIds = useSelector((state) => {
    if (
      isContentUndefined ||
      state.contents[contentType].pages[pageNumber].status !==
        contentsStatus.idle
    )
      return [];
    return state.contents[contentType].pages[pageNumber].entities;
  });

  // console.log(selectedContentIds);

  const currentPageContentStatus = useSelector((state) =>
    isContentUndefined
      ? isContentUndefined
      : state.contents[contentType].pages[pageNumber].status
  );

  // only when trending content data object is not present, we dispatch action for
  // initiate and start fetching
  useEffect(() => {
    const fun = async function () {
      try {
        if (isContentUndefined) {
          dispatch(initiateFetching({ contentType, pageNumber }));
          await dispatch(fetchContent({ contentType, pageNumber }));
        }
      } catch (error) {
        dispatch(showToast({ toastType: "error", message: error.message }));
      }
    };
    fun();
    return;
  }, [dispatch, pageNumber, isContentUndefined, contentType]);

  const refreshContent = async function () {
    try {
      if (
        currentPageContentStatus !== contentsStatus.fetching &&
        currentPageContentStatus !== contentsStatus.initiated
      )
        dispatch(initiateFetching({ contentType, pageNumber }));
      await dispatch(fetchContent({ contentType, pageNumber }));
    } catch (error) {
      dispatch(showToast({ toastType: "error", message: error.message }));
    }
    return;
  };

  const arr = [];
  for (let i = 0; i < totalDocuments; i++) arr[i] = i + 1;

  if (selectedContentIds.length === 0)
    return (
      <React.Fragment>
        <span className={ContentStyles.refreshIcon} onClick={refreshContent}>
          <RefreshIcon />
        </span>
        <div className={ContentStyles.placeholder}>
          {currentPageContentStatus === contentsStatus.initiated ||
            (currentPageContentStatus === contentsStatus.fetching && (
              <LoadingSpinner />
            ))}
          {currentPageContentStatus === contentsStatus.notFound && (
            <p>no items</p>
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
      <span className={ContentStyles.refreshIcon} onClick={refreshContent}>
        <RefreshIcon />
      </span>
      <ul className={ContentStyles.content_grid}>
        {selectedContentIds.map((id, index) => (
          <motion.li
            initial="hidden"
            animate="visible"
            // exit="hidden"
            custom={index}
            variants={listItemAnimations}
            key={id}
          >
            {(contentType === contentTypes.blogs ||
              contentType === contentTypes.trending) && (
              <BlogCard
                id={id}
                contentType={contentType}
                pageNumber={pageNumber}
              />
            )}
            {contentType === contentTypes.favourites && (
              <FavouriteBlogCard id={id} />
            )}
            {contentType === contentTypes.myBlogs && <MyBlogCard id={id} />}
          </motion.li>
        ))}
      </ul>
      <PageNumberNavigation
        contentType={contentType}
        pageNumber={pageNumber}
        currentPageContentStatus={currentPageContentStatus}
      />
    </React.Fragment>
  );
};
