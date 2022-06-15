import ContentStyles from "./Content.module.css";
import { BlogCard } from "../../components/cards/BlogCard";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import {
  contentsStatus,
  initiateFetching,
} from "../../redux/slices/content/contentsSlice";
import { LoadingSpinner } from "../../components/loading spinner/LoadingSpinner";
import { useLocation } from "react-router-dom";
import { PageNumberNavigation } from "../page number navigation/PageNumberNavigation";
import { motion } from "framer-motion";
import { fetchTrendingContent } from "../../redux/slices/content/contentsThunk";

export const TrendingContent = function () {
  const dispatch = useDispatch();
  // extracting current page number from url(search parameter)
  const location = useLocation();
  const pageNumber = new URLSearchParams(location.search).get("pageNumber");

  // extract total number of documents in database
  // here documents denotes entity for particular content type
  const totalDocuments = useSelector(
    (state) => state.contents.trendingContent.totalDocuments
  );
  //checking if trending content has data object(entitities) for current page
  const isTrendingContentUndefined = useSelector((state) =>
    state.contents.trendingContent.pages[pageNumber] ? false : true
  );
  // extracted id from trending content data object(entitities) for current page
  const selectedTrendingContentIds = useSelector((state) => {
    if (
      isTrendingContentUndefined ||
      state.contents.trendingContent.pages[pageNumber].status !==
        contentsStatus.idle
    )
      return [];
    return Object.keys(
      state.contents.trendingContent.pages[pageNumber].entities
    );
  });

  const currentPageContentStatus = useSelector((state) =>
    isTrendingContentUndefined
      ? isTrendingContentUndefined
      : state.contents.trendingContent.pages[pageNumber].status
  );

  // only when trending content data object is not present, we dispatch action for
  // initiate and start fetching
  useEffect(() => {
    if (isTrendingContentUndefined) {
      dispatch(
        initiateFetching({ contentType: "trendingContent", pageNumber })
      );
      dispatch(fetchTrendingContent(pageNumber));
    }

    return;
  }, [dispatch, pageNumber, isTrendingContentUndefined]);

  const arr = [];
  for (let i = 0; i < totalDocuments; i++) arr[i] = i + 1;

  if (selectedTrendingContentIds.length === 0 && currentPageContentStatus)
    return (
      <React.Fragment>
        <div className={ContentStyles.placeholder}>
          {currentPageContentStatus === contentsStatus.initiated ||
            (currentPageContentStatus === contentsStatus.fetching && (
              <LoadingSpinner />
            ))}
          {currentPageContentStatus === contentsStatus.notFound && (
            <p>no items</p>
          )}
        </div>{" "}
        <PageNumberNavigation
          contentType="trendingContent"
          pageNumber={pageNumber}
          currentPageContentStatus={currentPageContentStatus}
        />
      </React.Fragment>
    );

  const listItemAnimations = {
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.1 },
    }),
    hidden: { opacity: 0, y: 40 },
  };

  return (
    <React.Fragment>
      <ul className={ContentStyles.content_grid}>
        {selectedTrendingContentIds.map((id, index) => (
          <motion.li
            initial="hidden"
            animate="visible"
            custom={index}
            variants={listItemAnimations}
            key={id}
          >
            <BlogCard
              id={id}
              contentType={"trendingContent"}
              pageNumber={pageNumber}
            />
          </motion.li>
        ))}
      </ul>
      <PageNumberNavigation
        contentType="trendingContent"
        pageNumber={pageNumber}
        currentPageContentStatus={currentPageContentStatus}
      />
    </React.Fragment>
  );
};
